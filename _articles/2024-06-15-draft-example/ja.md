---
title: "下書き記事の例"
date: 2024-06-15
description: "公開リストに表示されない非公開/下書き記事の例です。"
layout: post
tags: [example, draft]
category: General
hidden: true
lang: ja
ref: draft-example
---

これは非公開記事の例です。フロントマターに`hidden: true`を設定すると：

1. ブログホームページのリストに**表示されません**
2. カテゴリーやタグページに**表示されません**
3. カテゴリー/タグの統計に**カウントされません**
4. プレビュー目的で直接URLから**アクセス可能です**

## 使い方

記事を非公開にするには、フロントマターに`hidden: true`を追加します：

```yaml
---
title: "私の下書き記事"
date: 2024-06-15
layout: post
hidden: true
---
```

公開する準備ができたら、`hidden`フィールドを削除するか`false`に設定してください。
