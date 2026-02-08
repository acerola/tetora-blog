# Tetora's Blog

A personal blog built with [Jekyll](https://jekyllrb.com/). Notes on calm building.

## Getting Started

### Prerequisites

- Ruby (3.0+)
- Bundler (`gem install bundler`)
- Node.js 18+ (for Tailwind asset builds)

### Installation

```bash
bundle install
```

### Development

Run the local development server:

```bash
bundle exec jekyll serve
```

Open [http://localhost:4000](http://localhost:4000) to view the site.

## Project Structure

```
├── _articles/                      # Multilingual article collection
│   └── YYYY-MM-DD-slug/
│       ├── en.md
│       ├── ja.md
│       └── ko.md
├── _data/                          # Language labels and UI translations
├── _includes/                      # Reusable HTML partials
├── _layouts/                       # Page templates
├── en/ ja/ ko/                     # Language-scoped pages and taxonomy indexes
├── categories/ tags/               # English taxonomy routes
├── assets/
│   └── css/
│       ├── tailwind.src.css        # Tailwind source directives
│       ├── tailwind.css            # Built Tailwind output (committed)
│       └── main.css                # Custom site styles
├── index.html                      # Root redirect to /en/
├── _config.yml                     # Jekyll configuration
├── Gemfile / Gemfile.lock          # Ruby dependencies
└── package.json / package-lock.json# Tailwind build toolchain
```

## Writing Posts

Create a folder per article in `_articles/`:

```
_articles/2026-02-08-my-post/
  en.md
  ja.md
  ko.md
```

Use the same `ref` across translations:

```yaml
---
layout: post
title: "My Post"
date: 2026-02-08
description: "Short summary for cards/feed."
category: General
tags: [example]
lang: en
ref: my-post
# hidden: true   # optional draft/hidden mode
---
```

## Build for Production

```bash
bundle exec jekyll build
```

The static site will be generated in `_site/`.

## Build CSS Assets

```bash
npm install
npm run build:css
```

For active development:

```bash
npm run watch:css
```

## Run Tests

```bash
bundle exec ruby -Itest test/site_build_test.rb
```

## Plugins

- [jekyll-paginate-v2](https://github.com/sverrirs/jekyll-paginate-v2) - Pagination
- [jekyll-seo-tag](https://github.com/jekyll/jekyll-seo-tag) - SEO meta tags
- [jekyll-feed](https://github.com/jekyll/jekyll-feed) - RSS/Atom feed
- [jekyll-sitemap](https://github.com/jekyll/jekyll-sitemap) - Sitemap generation

## Learn More

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Kramdown Syntax](https://kramdown.gettalong.org/quickref.html)
