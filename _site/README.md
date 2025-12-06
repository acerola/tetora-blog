# Tetora's Blog

A personal blog built with [Jekyll](https://jekyllrb.com/). Notes on calm building.

## Getting Started

### Prerequisites

- Ruby (3.0+)
- Bundler (`gem install bundler`)

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
├── _config.yml      # Jekyll configuration
├── _includes/       # Reusable HTML partials
├── _layouts/        # Page templates
├── _posts/          # Blog posts (Markdown)
├── _site/           # Generated site (do not edit)
├── assets/          # CSS, images, and other static files
├── index.html       # Homepage
├── about.md         # About page
├── Gemfile          # Ruby dependencies
└── Gemfile.lock
```

## Writing Posts

Create new posts in `_posts/` with the filename format:

```
YYYY-MM-DD-post-title.md
```

Example front matter:

```yaml
---
layout: post
title: "Your Post Title"
date: 2024-01-01
---
```

## Build for Production

```bash
bundle exec jekyll build
```

The static site will be generated in `_site/`.

## Plugins

- [jekyll-paginate-v2](https://github.com/sverrirs/jekyll-paginate-v2) - Pagination
- [jekyll-seo-tag](https://github.com/jekyll/jekyll-seo-tag) - SEO meta tags
- [jekyll-feed](https://github.com/jekyll/jekyll-feed) - RSS/Atom feed
- [jekyll-sitemap](https://github.com/jekyll/jekyll-sitemap) - Sitemap generation

## Learn More

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Kramdown Syntax](https://kramdown.gettalong.org/quickref.html)
