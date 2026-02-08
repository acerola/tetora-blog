require_relative "test_helper"

runner = TestRunner.new
site, destination = SiteTestSupport.build_site

at_exit do
  FileUtils.remove_entry(destination) if destination && Dir.exist?(destination)
end

read_output = lambda do |relative_path|
  full_path = File.join(destination, relative_path)
  runner.assert_file_exists(full_path)
  File.read(full_path)
end

atom_entry_count = lambda do |xml_content|
  document = REXML::Document.new(xml_content)
  namespace = { "atom" => "http://www.w3.org/2005/Atom" }
  count = 0
  REXML::XPath.each(document, "//atom:entry", namespace) { count += 1 }
  count
end

runner.run("generates expected core routes") do
  %w[
    index.html
    en/index.html
    ja/index.html
    ko/index.html
    categories/index.html
    tags/index.html
    feed.xml
    posts-feed.xml
    sitemap.xml
  ].each do |route|
    runner.assert_file_exists(File.join(destination, route))
  end
end

runner.run("generates article pages for each language") do
  %w[
    posts/2024-06-01-hello-world/en/index.html
    posts/2024-06-01-hello-world/ja/index.html
    posts/2024-06-01-hello-world/ko/index.html
    posts/2024-06-15-draft-example/en/index.html
    posts/2024-06-15-draft-example/ja/index.html
    posts/2024-06-15-draft-example/ko/index.html
    posts/2026-01-01-programming-perls/en/index.html
    posts/2026-01-01-programming-perls/ja/index.html
    posts/2026-01-01-programming-perls/ko/index.html
  ].each do |route|
    runner.assert_file_exists(File.join(destination, route))
  end
end

runner.run("language home pages show only visible posts for that language") do
  en_home = read_output.call("en/index.html")
  ja_home = read_output.call("ja/index.html")
  ko_home = read_output.call("ko/index.html")

  runner.assert_includes(en_home, "Programming Pearls")
  runner.assert_includes(en_home, "Hello World")
  runner.refute_includes(en_home, "Example Draft Post")
  runner.refute_includes(en_home, "プログラミング・パール")
  runner.refute_includes(en_home, "프로그래밍 펄")

  runner.assert_includes(ja_home, "プログラミング・パール")
  runner.assert_includes(ja_home, "こんにちは世界")
  runner.refute_includes(ja_home, "下書き記事の例")
  runner.refute_includes(ja_home, "Programming Pearls")
  runner.refute_includes(ja_home, "프로그래밍 펄")

  runner.assert_includes(ko_home, "프로그래밍 펄")
  runner.assert_includes(ko_home, "안녕하세요")
  runner.refute_includes(ko_home, "초안 글 예시")
  runner.refute_includes(ko_home, "Programming Pearls")
  runner.refute_includes(ko_home, "プログラミング・パール")
end

runner.run("hidden post pages remain directly accessible") do
  en_draft = read_output.call("posts/2024-06-15-draft-example/en/index.html")
  ja_draft = read_output.call("posts/2024-06-15-draft-example/ja/index.html")
  ko_draft = read_output.call("posts/2024-06-15-draft-example/ko/index.html")

  runner.assert_includes(en_draft, "Example Draft Post")
  runner.assert_includes(ja_draft, "下書き記事の例")
  runner.assert_includes(ko_draft, "초안 글 예시")
end

runner.run("category and tag detail pages are language filtered") do
  category_book = read_output.call("en/categories/book/index.html")
  tag_programming = read_output.call("en/tags/programming/index.html")

  runner.assert_includes(category_book, "Programming Pearls")
  runner.refute_includes(category_book, "プログラミング・パール")
  runner.refute_includes(category_book, "프로그래밍 펄")

  runner.assert_includes(tag_programming, "Programming Pearls")
  runner.refute_includes(tag_programming, "プログラミング・パール")
  runner.refute_includes(tag_programming, "프로그래밍 펄")
end

runner.run("feed file is generated and valid xml") do
  feed = read_output.call("feed.xml")
  entry_count = atom_entry_count.call(feed)

  runner.assert(feed.start_with?("<?xml"), "Expected XML declaration in feed.xml")
  runner.assert(entry_count >= 0, "Unexpected negative feed entry count")
end

runner.run("feed includes article entries") do
  feed = read_output.call("feed.xml")
  entry_count = atom_entry_count.call(feed)

  runner.assert(entry_count > 0, "Expected at least one article entry in feed.xml")
  runner.assert_includes(feed, "/posts/2026-01-01-programming-perls/en/")
end

runner.run("taxonomy index and detail routes are localized") do
  %w[
    en/categories/index.html
    ja/categories/index.html
    ko/categories/index.html
    en/tags/index.html
    ja/tags/index.html
    ko/tags/index.html
    en/categories/book/index.html
    ja/categories/book/index.html
    ko/categories/book/index.html
    en/tags/programming/index.html
    ja/tags/programming/index.html
    ko/tags/programming/index.html
  ].each do |route|
    runner.assert_file_exists(File.join(destination, route))
  end
end

runner.run("taxonomy index aggregation is scoped to the active language") do
  en_categories = read_output.call("en/categories/index.html")
  ja_categories = read_output.call("ja/categories/index.html")
  ko_categories = read_output.call("ko/categories/index.html")
  en_tags = read_output.call("en/tags/index.html")

  runner.assert_includes(en_categories, "2 categories")
  runner.assert_includes(en_categories, ">1 posts<")
  runner.refute_includes(en_categories, ">3 posts<")

  runner.assert_includes(ja_categories, "2 カテゴリー")
  runner.assert_includes(ko_categories, "2 카테고리")

  runner.assert_includes(en_tags, "#programming")
  runner.assert_includes(en_tags, ">1</span>")
  runner.refute_includes(en_tags, ">3</span>")
end

runner.run("taxonomy links are language-aware") do
  en_home = read_output.call("en/index.html")
  ja_home = read_output.call("ja/index.html")
  ko_home = read_output.call("ko/index.html")

  runner.assert_includes(en_home, "href=\"/en/categories/book/\"")
  runner.assert_includes(en_home, "href=\"/en/tags/programming/\"")

  runner.assert_includes(ja_home, "href=\"/ja/categories/book/\"")
  runner.assert_includes(ja_home, "href=\"/ja/tags/programming/\"")

  runner.assert_includes(ko_home, "href=\"/ko/categories/book/\"")
  runner.assert_includes(ko_home, "href=\"/ko/tags/programming/\"")
end

runner.run("default layout uses local built assets and avoids runtime cdn scripts") do
  en_home = read_output.call("en/index.html")

  runner.assert_includes(en_home, "href=\"/assets/css/tailwind.css\"")
  runner.refute_includes(en_home, "https://cdn.tailwindcss.com")
  runner.refute_includes(en_home, "https://unpkg.com/alpinejs")
end

puts
puts "Summary: #{runner.passes} passed, #{runner.failures.size} failed, #{runner.skips.size} skipped"

if runner.failures.any?
  puts
  puts "Failures:"
  runner.failures.each_with_index do |(name, error), index|
    puts "#{index + 1}. #{name}"
    puts "   #{error.class}: #{error.message}"
  end
  exit 1
end
