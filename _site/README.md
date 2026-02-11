# Tetora's Blog

A multilingual personal blog built with [Jekyll](https://jekyllrb.com/). Notes on calm building — programming, technology, and software development.

**Live**: [tetora.blog](https://tetora.blog)

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Jekyll 4.4+ |
| Runtime | Ruby 3.2+ |
| CSS | Tailwind CSS 3.4 (local build) + `@tailwindcss/typography` |
| Fonts | Inter (Google Fonts) |
| Comments | Giscus (GitHub Discussions) |
| Deployment | GitHub Pages via GitHub Actions |
| Testing | Minitest |

**Jekyll Plugins**: jekyll-paginate-v2, jekyll-seo-tag, jekyll-feed, jekyll-sitemap

## Getting Started

### Prerequisites

- Ruby 3.2+
- Bundler (`gem install bundler`)
- Node.js 18+ (for Tailwind builds)

### Install & Run

```bash
bundle install
npm install
bundle exec jekyll serve
```

Open [http://localhost:4000](http://localhost:4000) to view the site.

### Build CSS

```bash
npm run build:css       # one-time build
npm run watch:css       # rebuild on changes
```

### Production Build

```bash
bundle exec jekyll build
```

### Run Tests

```bash
bundle exec ruby -Itest test/site_build_test.rb
```

The test suite covers route generation, multilingual filtering, taxonomy scoping, feed validation, and asset verification.

## Project Structure

```
tetora-blog/
├── _articles/                  # Blog posts (multilingual collection)
│   └── YYYY-MM-DD-slug/
│       ├── en.md              #   English version
│       ├── ja.md              #   Japanese version
│       └── ko.md              #   Korean version
├── _data/
│   ├── languages.yml          # Language metadata (labels, icons)
│   └── translations/          # UI strings per language (en, ja, ko)
├── _includes/                 # Reusable partials
│   ├── nav.html               #   Sticky header + language switcher
│   ├── sidebar.html           #   Categories/tags sidebar
│   ├── footer.html            #   Site footer
│   ├── home-content.html      #   Homepage post listing
│   ├── categories-content.html#   Category index grid
│   ├── tags-content.html      #   Tag cloud
│   └── comments.html          #   Giscus embed
├── _layouts/                  # Page templates
│   ├── default.html           #   Base layout (SEO, hreflang)
│   ├── post.html              #   Article page
│   ├── category.html          #   Category listing
│   └── tag.html               #   Tag listing
├── assets/css/
│   ├── tailwind.src.css       # Tailwind source directives
│   ├── tailwind.css           # Built output (committed)
│   └── main.css               # Custom styles
├── en/ ja/ ko/                # Language-scoped pages and taxonomy indexes
├── categories/ tags/          # Root taxonomy routes
├── test/                      # Test suite
├── _config.yml                # Jekyll configuration
├── Gemfile                    # Ruby dependencies
├── package.json               # Tailwind build toolchain
├── tailwind.config.js         # Tailwind configuration
└── index.html                 # Root redirect to /en/
```

## Features

### Multilingual (i18n)

Three languages: **English** (default), **Japanese**, **Korean**.

- Each article lives in a folder with `en.md`, `ja.md`, `ko.md`
- The `ref` front matter field links translations together
- Language-scoped URLs: `/posts/YYYY-MM-DD-slug/{lang}/`
- UI strings in `_data/translations/{lang}.yml`
- Language switcher in the nav and on post pages
- hreflang tags for SEO

### Dark Mode

Toggle between light and dark themes. Preference is saved to localStorage and syncs with the Giscus comment theme.

### Draft / Hidden Posts

Set `hidden: true` in front matter to hide a post from all listings while keeping it accessible via direct URL.

### Taxonomy

Categories and tags are language-aware — each language root has its own category/tag index pages that only show posts in that language.

**Categories**: Book, General, Hacking, Japanese, Programming

## Writing Posts

1. Create a folder: `_articles/YYYY-MM-DD-slug/`
2. Add language files (`en.md`, `ja.md`, `ko.md`)

### Front Matter

```yaml
---
layout: post
title: "Article Title"
date: 2026-02-08
description: "Short summary for cards and feeds"
category: General
tags: [tag1, tag2]
lang: en
ref: article-slug          # same value across all language versions
# hidden: true             # optional — hides from listings
---
```

### Adding a Category

Create `categories/{name}.md` and corresponding files in `en/categories/`, `ja/categories/`, `ko/categories/` with:

```yaml
---
layout: category
title: Category Name
category: Category Name
---
```

### Adding a Tag

Create `tags/{name}.md` and corresponding files in each language root with:

```yaml
---
layout: tag
title: Tag Name
tag: tag-name
---
```

## CI/CD

| Workflow | Trigger | What it does |
|----------|---------|--------------|
| **CI** (`.github/workflows/ci.yml`) | Push, PR | Jekyll doctor, build, run tests |
| **Deploy** (`.github/workflows/deploy.yml`) | Push to `main` | Build and deploy to GitHub Pages |

## Learn More

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Kramdown Syntax](https://kramdown.gettalong.org/quickref.html)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Giscus](https://giscus.app)
