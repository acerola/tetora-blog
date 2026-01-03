---
title: "초안 글 예시"
date: 2024-06-15
description: "공개 목록에 표시되지 않는 숨김/초안 글의 예시입니다."
layout: post
tags: [example, draft]
category: General
hidden: true
lang: ko
ref: draft-example
---

이것은 숨겨진 글의 예시입니다. 프론트매터에 `hidden: true`를 설정하면:

1. 블로그 홈페이지 목록에 **표시되지 않습니다**
2. 카테고리나 태그 페이지에 **표시되지 않습니다**
3. 카테고리/태그 통계에 **집계되지 않습니다**
4. 미리보기 목적으로 직접 URL을 통해 **여전히 접근 가능합니다**

## 사용 방법

글을 숨기려면 프론트매터에 `hidden: true`를 추가하면 됩니다:

```yaml
---
title: "내 초안 글"
date: 2024-06-15
layout: post
hidden: true
---
```

게시할 준비가 되면 `hidden` 필드를 제거하거나 `false`로 설정하세요.
