---
title: "Example Draft Post"
date: 2024-06-15
description: "This is an example of a hidden/draft post that won't appear in public listings."
layout: post
tags: [example, draft]
category: General
hidden: true
lang: en
ref: draft-example
---

This is an example of a hidden post. When you set `hidden: true` in the front matter, the post:

1. **Won't appear** in the blog homepage listing
2. **Won't appear** in category or tag pages
3. **Won't be counted** in category/tag statistics
4. **Is still accessible** via its direct URL for preview purposes

## How to Use

To hide a post, simply add `hidden: true` to your front matter:

```yaml
---
title: "My Draft Post"
date: 2024-06-15
layout: post
hidden: true
---
```

When you're ready to publish, either remove the `hidden` field or set it to `false`.
