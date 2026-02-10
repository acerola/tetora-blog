require "tmpdir"
require "fileutils"
require "yaml"
require "jekyll"
require "rexml/document"

module SiteTestSupport
  ROOT = File.expand_path("..", __dir__)

  def self.build_site
    destination = Dir.mktmpdir("tetora-blog-test-site-")

    base_config = YAML.safe_load_file(
      File.join(ROOT, "_config.yml"),
      permitted_classes: [Date, Time],
      aliases: true
    )

    config = Jekyll.configuration(
      base_config.merge(
        "source" => ROOT,
        "destination" => destination,
        "quiet" => true
      )
    )

    site = Jekyll::Site.new(config)
    site.process

    [site, destination]
  end
end

class TestRunner
  attr_reader :failures, :passes, :skips

  def initialize
    @passes = 0
    @failures = []
    @skips = []
  end

  def run(name)
    yield
    @passes += 1
    puts "PASS: #{name}"
  rescue StandardError => e
    @failures << [name, e]
    puts "FAIL: #{name}"
    puts "  #{e.class}: #{e.message}"
  end

  def skip(name, reason)
    @skips << [name, reason]
    puts "SKIP: #{name}"
    puts "  #{reason}"
  end

  def assert(condition, message)
    raise message unless condition
  end

  def assert_equal(expected, actual, message = nil)
    default = "Expected #{expected.inspect}, got #{actual.inspect}"
    assert(expected == actual, message || default)
  end

  def assert_file_exists(path)
    assert(File.exist?(path), "Missing file: #{path}")
  end

  def refute_file_exists(path)
    assert(!File.exist?(path), "File should not exist: #{path}")
  end

  def assert_includes(content, expected, message = nil)
    default = "Expected content to include: #{expected.inspect}"
    assert(content.include?(expected), message || default)
  end

  def refute_includes(content, unexpected, message = nil)
    default = "Expected content not to include: #{unexpected.inspect}"
    assert(!content.include?(unexpected), message || default)
  end

  def assert_match(pattern, content, message = nil)
    default = "Expected content to match: #{pattern.inspect}"
    assert(pattern.match?(content), message || default)
  end
end
