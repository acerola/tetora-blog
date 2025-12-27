# Project Analysis Summary

## 1. Project Structure and Architecture

This is a **Jekyll-based static blog site** with a clean, conventional directory structure:

```
tetora-blog/
├── _config.yml              # Jekyll configuration
├── _includes/               # Reusable HTML partials
│   ├── nav.html            # Navigation component
│   └── footer.html         # Footer component
├── _layouts/                # Page templates
│   ├── default.html        # Base layout for all pages
│   └── post.html           # Layout for individual blog posts
├── _posts/                  # Blog post markdown files
├── _site/                   # Generated static site (build output)
├── assets/                  # Static assets
│   └── css/
│       └── main.css        # Custom CSS file
├── .github/workflows/       # CI/CD pipelines
│   └── deploy.yml          # GitHub Actions deployment
├── Gemfile                 # Ruby dependencies
├── Gemfile.lock            # Locked dependency versions
├── index.html              # Homepage
├── about.md                # About page
└── README.md               # Project documentation
```

The architecture follows Jekyll's standard **template-based layout** pattern with a component approach using includes for reusable HTML partials.

---

## 2. Main Technologies and Frameworks

| Category | Technology | Version/Details |
|----------|------------|-----------------|
| **Static Site Generator** | Jekyll | 4.4.1 |
| **Runtime** | Ruby | 3.0+ |
| **Markdown Parser** | Kramdown | 2.5.1 (GitHub-flavored) |
| **Templating** | Liquid | 4.0.4 |
| **CSS Framework** | Tailwind CSS | Via CDN |
| **Dependency Management** | Bundler | 2.2.33 |
| **Deployment** | GitHub Actions + GitHub Pages | Automated CI/CD |

**Jekyll Plugins:**
- `jekyll-paginate-v2` - Pagination (5 posts per page)
- `jekyll-seo-tag` - SEO meta tag generation
- `jekyll-feed` - RSS/Atom feed generation
- `jekyll-sitemap` - Sitemap.xml generation

---

## 3. Key Components and Their Responsibilities

### Layout Templates

| Component | Responsibility |
|-----------|----------------|
| **`default.html`** | Root template with HTML5 boilerplate, SEO tags, Tailwind CSS import, nav/footer includes, and main content wrapper |
| **`post.html`** | Extends default layout for blog posts; displays title, date, reading time, description, and prose-styled content |

### Include Partials

| Component | Responsibility |
|-----------|----------------|
| **`nav.html`** | Sticky header navigation with logo, links (Writing, About, Contact), hover animations |
| **`footer.html`** | Simple footer with dynamic copyright year |

### Pages

| Page | Responsibility |
|------|----------------|
| **`index.html`** | Homepage with paginated post grid (2-column layout), post cards with metadata, pagination controls |
| **`about.md`** | About page content |

---

## 4. Build and Test Commands

| Command | Description |
|---------|-------------|
| `bundle install` | Install Ruby dependencies |
| `bundle exec jekyll serve` | Start development server (http://localhost:4000) with live reload |
| `bundle exec jekyll build` | Generate production static site to `_site/` directory |

**Automated Deployment:**
- GitHub Actions workflow triggers on push to `main` branch
- Pipeline: Checkout → Setup Ruby 3.0 → Build Jekyll → Deploy to GitHub Pages

---

## 5. Existing Conventions and Patterns

### Naming Conventions
- **Blog posts:** `YYYY-MM-DD-slug-title.md` format
- **CSS classes:** Tailwind utility classes with custom animations
- **Permalinks:** `/posts/:slug/` structure

### Architectural Patterns
| Pattern | Implementation |
|---------|---------------|
| **Template Inheritance** | `post.html` extends `default.html` |
| **Component Partials** | Reusable nav.html and footer.html includes |
| **Configuration-Driven** | Centralized settings in `_config.yml` |
| **Static Generation** | Pre-built HTML for performance |

### Styling Patterns
- **Utility-first CSS** - Heavy Tailwind class usage
- **Mobile-first responsive design** - Using `md:`, `lg:` breakpoints
- **Color scheme** - Slate gray palette with coral accent (`#fc4d50`, `#ff7b7d`)
- **Custom animations** - CSS keyframes for hover effects (navigation underlines)

### Post Front Matter Convention
```yaml
---
layout: post
title: "Post Title"
date: YYYY-MM-DD
description: "Post description"
---
```

### Code Quality & SEO
- Automatic reading time calculation (words/200 minutes)
- SEO-optimized with meta tags
- RSS feed and sitemap generation
- Semantic HTML structure

---

> **Note:** The project recently migrated from Next.js to Jekyll, indicating a shift toward simplicity and performance for this blog-focused site.