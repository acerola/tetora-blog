# CLAUDE.md - AI Assistant Guide for Tetora's Blog

This document provides comprehensive guidance for AI assistants working with this codebase.

## Project Overview

**Tetora's Blog** is a multilingual personal blog built with Jekyll, focusing on "calm building" - notes on programming, technology, and software development.

- **URL**: https://tetora.blog
- **Framework**: Jekyll 4.3+ (Ruby static site generator)
- **Languages**: English (default), Korean, Japanese
- **Deployment**: GitHub Pages via GitHub Actions

## Technology Stack

| Component | Technology |
|-----------|------------|
| Static Site Generator | Jekyll 4.3+ |
| Runtime | Ruby 3.0+ |
| CSS Framework | Tailwind CSS (CDN) |
| JavaScript | Alpine.js (CDN) |
| Markdown | Kramdown with GFM |
| Fonts | Inter (Google Fonts) |
| Comments | Giscus (optional) |
| Deployment | GitHub Pages + Actions |

**Jekyll Plugins:**
- `jekyll-paginate-v2` - Pagination support
- `jekyll-seo-tag` - SEO meta tags
- `jekyll-feed` - RSS/Atom feeds
- `jekyll-sitemap` - Sitemap generation

## Project Structure

```
tetora-blog/
├── _articles/              # Blog posts (multilingual)
│   └── YYYY-MM-DD-slug/   # Each article folder contains:
│       ├── en.md          #   English version
│       ├── ja.md          #   Japanese version
│       └── ko.md          #   Korean version
├── _data/
│   ├── languages.yml      # Language labels/icons
│   └── translations/      # UI strings per language
│       ├── en.yml
│       ├── ja.yml
│       └── ko.yml
├── _includes/             # Reusable template partials
│   ├── nav.html          # Navigation header
│   ├── sidebar.html      # Categories/tags sidebar
│   ├── footer.html       # Site footer
│   ├── home-content.html # Homepage post listing
│   └── comments.html     # Giscus comments embed
├── _layouts/              # Page templates
│   ├── default.html      # Base layout
│   ├── post.html         # Article template
│   ├── category.html     # Category page
│   └── tag.html          # Tag page
├── _site/                 # Generated output (DO NOT EDIT)
├── assets/css/main.css   # Custom styles
├── categories/           # Category metadata files
├── tags/                 # Tag metadata files
├── en/                   # English language root
├── ja/                   # Japanese language root
├── ko/                   # Korean language root
├── _config.yml           # Jekyll configuration
├── Gemfile               # Ruby dependencies
└── index.html            # Root redirect
```

## Quick Commands

```bash
# Install dependencies
bundle install

# Development server (http://localhost:4000)
bundle exec jekyll serve

# Production build
bundle exec jekyll build
```

## Creating Content

### New Article

1. Create folder: `_articles/YYYY-MM-DD-slug/`
2. Add language files: `en.md`, `ja.md`, `ko.md`

### Article Front Matter (Required)

```yaml
---
title: "Article Title"
date: 2024-06-01
description: "Short summary for SEO and previews"
layout: post
tags: [tag1, tag2]
category: General
lang: en              # en, ja, or ko
ref: unique-slug      # Links translations together (same across languages)
---
```

### Optional Front Matter

```yaml
hidden: true          # Makes post a draft (accessible via URL, hidden from listings)
```

### Adding a New Category

1. Create `categories/category-name.md`:
```yaml
---
layout: category
title: Category Name
category: Category Name
---
```
2. Use the category name in article front matter

### Adding a New Tag

1. Create `tags/tag-name.md`:
```yaml
---
layout: tag
title: Tag Name
tag: tag-name
---
```
2. Use the tag in article front matter

## Internationalization (i18n)

### How It Works

- Each article has `en.md`, `ja.md`, `ko.md` versions in its folder
- The `ref` field links translations together (must be identical across languages)
- UI strings are in `_data/translations/{lang}.yml`
- Language metadata is in `_data/languages.yml`

### Language-Aware URLs

Articles generate URLs like:
- `/posts/YYYY-MM-DD-slug/en/`
- `/posts/YYYY-MM-DD-slug/ja/`
- `/posts/YYYY-MM-DD-slug/ko/`

### Adding UI Translations

Edit files in `_data/translations/`:
```yaml
# en.yml example
site:
  title: "Tetora's Blog"
nav:
  home: "Home"
  about: "About"
post:
  read_in: "Read in"
  min_read: "min read"
  draft: "Draft"
  back_to_all: "Back to all posts"
```

## Key Conventions

### Liquid Templating Patterns

```liquid
{% assign current_lang = page.lang | default: site.default_lang %}
{% assign t = site.data.translations[current_lang] %}
{% assign lang_prefix = "/" | append: current_lang %}
```

### Linking Across Languages

```liquid
{% assign available_translations = site.articles | where: "ref", page.ref %}
```

### Color Scheme

- Primary accent: `#fc4d50` (coral red)
- Dark mode: Tailwind slate palette
- Light/dark toggle with localStorage persistence

### Styling Conventions

- Use Tailwind utility classes
- Dark mode: `dark:` prefix variants
- Responsive: mobile-first with `lg:` breakpoints
- Prose content: Tailwind `prose` classes

## File Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Articles | `_articles/YYYY-MM-DD-slug/{lang}.md` | `_articles/2024-06-01-hello-world/en.md` |
| Categories | `categories/{name}.md` | `categories/programming.md` |
| Tags | `tags/{name}.md` | `tags/getting-started.md` |

## Common Tasks

### Make a Draft Post

Set `hidden: true` in front matter. The post will be accessible via direct URL but hidden from listings.

### Enable Comments

1. Go to https://giscus.app
2. Configure for your repository
3. Copy values to `_config.yml`:
```yaml
giscus:
  repo: "username/repo"
  repo_id: "..."
  category: "Announcements"
  category_id: "..."
```

### Modify Navigation

Edit `_includes/nav.html`. Navigation links use:
```liquid
<a href="{{ lang_prefix | append: '/' | relative_url }}">{{ t.nav.home }}</a>
```

### Add a New Language

1. Add to `_config.yml` languages array
2. Create `_data/translations/{lang}.yml`
3. Add to `_data/languages.yml`
4. Create `{lang}/` directory with `index.html` and `about.md`
5. Add `{lang}.md` to each article folder

## Deployment

GitHub Actions automatically deploys on push to `main`:
1. Checks out code
2. Sets up Ruby 3.2
3. Installs dependencies
4. Builds with Jekyll
5. Deploys to GitHub Pages

Workflow file: `.github/workflows/deploy.yml`

## Important Notes

- **Never edit `_site/`** - it's auto-generated
- **Keep `ref` consistent** across language versions of the same article
- **Use ISO date format** (YYYY-MM-DD) in filenames and front matter
- **Categories are case-sensitive** - match exactly in front matter and filename
- **Reading time** is auto-calculated at 200 words/minute

## Testing Changes

Always run locally before committing:
```bash
bundle exec jekyll serve
```

Check:
- All three language versions render correctly
- Navigation and language switcher work
- Dark mode toggle functions
- Posts appear in correct categories/tags
