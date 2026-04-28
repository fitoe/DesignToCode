# Prompt Shape

Use this input contract.

## Required Fields

- page goal
- target project context: existing project or new page
- ordered sections
- for each section:
  - `name`
  - `image path`
  - `purpose`
  - `required text`
  - `interaction requirements`
  - `must-not-miss points`

## Optional Fields

- `pageWidth`
- style keywords
- acceptable approximations
- media notes
- asset availability notes

## Canonical Template

```text
目标：页面用途

全局要求：
- 目标项目：现有项目 / 新页面
- pageWidth：1440
- 风格关键词：...
- 允许近似项：...

区块 1：
- 名称：hero
- 图片：/path/hero.png
- 说明：首屏，左文右图
- 必须出现文案：...
- 交互要求：按钮 hover
- 不能错的点：标题换行、主 CTA 层级
- 媒体说明：背景有渐变纹理；右侧是内容主图

区块 2：
- 名称：features
- 图片：/path/features.png
- 说明：三列卡片
- 必须出现文案：...
- 交互要求：无
- 不能错的点：卡片等宽、图标对齐
```

## Minimal Acceptable Input

If input is sparse, still require:
- image order
- section names
- required text
- must-not-miss points

## Weak Input That Needs Follow-Up

Examples:
- one uncropped full-page screenshot without section ordering
- missing real text for unreadable design copy
- no project context and no target framework
- no `pageWidth` when repo cannot reveal width
