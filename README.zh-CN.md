# DESIGNTOCODE

DESIGNTOCODE 是一个 Codex skill，用于把分段设计稿图片还原为基于 UnoCSS 的高保真页面代码。

它面向的不是“参考一下做个差不多”，而是更强调结构和视觉还原的图片转代码流程：
- 先识别当前项目技术栈
- 尽量从仓库中判断输出为 `Vue` 或 `Astro`
- 先按目标页面宽度缩放设计图区块，再做分析
- 识别视觉元素应落为 CSS 背景还是语义图片
- 写代码前必须先输出 `Pre-Implementation Brief`
- 最后通过 Playwright 做区块级截图 diff 校验

## 适用范围

DESIGNTOCODE 适用于：
- 按区块切分好的页面设计截图
- 现有 `Vue` 或 `Astro` 项目
- 基于 UnoCSS 的新页面实现
- 高保真落地页、营销页、dashboard、功能展示页

DESIGNTOCODE 不适用于：
- Figma 节点直接转代码
- 后端或 API 生成
- “照着这个随便做个类似的” 这类模糊需求
- 最终输出为框架无关伪代码

## 核心流程

1. 读取按顺序排列的区块图片和说明。
2. 检查当前项目，识别框架和页面约定。
3. 从仓库推断目标页面宽度，或回退到用户提供的 `pageWidth`。
4. 按目标页面宽度缩放每个区块设计图。
5. 分析区块结构、媒体角色、资源情况和实现风险。
6. 输出强制性的 `Pre-Implementation Brief`。
7. 等待用户确认。
8. 按项目匹配框架生成页面代码。
9. 使用 Playwright 做区块截图 diff。
10. 输出偏差说明，以及可选的局部修复建议。

## Pre-Implementation Brief

在真正生成代码前，skill 必须先输出：

```md
## Page Understanding
## Section Breakdown
## Media Role Decisions
## Layout Implementation Plan
## Framework/Output Plan
## Known Ambiguities
## Verification Plan
```

在用户确认这份 brief 之前，不应开始生成页面代码。

## 框架判定

DESIGNTOCODE 采用“项目优先”规则：
- `Vue` 项目 -> 生成 Vue 页面/组件
- `Astro` 项目 -> 生成 Astro 页面/组件
- 仓库混合或不清晰 -> 停止并询问

不会静默默认 Vue，也不会静默默认 Astro。

## 媒体角色规则

每个重要视觉媒体元素都要先判定为：
- `background`
- `content image`

默认映射：
- `background` -> CSS background
- `content image` -> `<img>` 或 `<picture>`

如果关键视觉角色存在歧义，skill 必须先停下来问，而不是猜。

## 仓库结构

```text
DESIGNTOCODE/
├── SKILL.md
├── agents/
│   └── openai.yaml
└── references/
    ├── prompt-shape.md
    ├── framework-resolution.md
    ├── pre-implementation-brief.md
    ├── width-normalization.md
    ├── media-role-classification.md
    ├── vue-astro-unocss-output-rules.md
    ├── playwright-section-diff.md
    ├── failure-handling.md
    ├── visual-checklist.md
    ├── examples.md
    ├── section-taxonomy.md
    ├── layer-stack-model.md
    ├── section-boundary-and-cross-section-rules.md
    ├── repair-loop-policy.md
    └── confidence-and-escalation.md
```

## 输入格式

推荐输入格式：

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
```

## 验证方式

主验证方式是 Playwright 区块级截图 diff：
- 通过 `data-section` 锚点锁定区块
- 将渲染结果与缩放后的区块参考图对比
- 只容忍轻微字体渲染噪声

同时做结构层面的 smoke check：
- 不允许横向溢出
- 不允许明显文字重叠
- 不允许图片变形
- 不允许关键区块内容丢失
- 不允许主 CTA 不可见

## 强制停止条件

以下情况必须停止并追问：
- 目标框架无法确定
- 目标页面宽度无法确定
- 必需文案无法识别且用户未提供
- 关键视觉的媒体角色存在歧义
- 关键资源缺失且截图裁切也无法可靠替代
- 核心布局关系无法安全推断
- 用户尚未确认 pre-implementation brief

## 当前状态

当前仓库已包含 skill 规范和参考文档。

还未包含：
- 仓库内可直接执行的实现 harness
- 仓库内自动校验脚本
- 端到端示例运行结果

## 相关文件

- skill 主规范：[DESIGNTOCODE/SKILL.md](DESIGNTOCODE/SKILL.md)
- 英文 README：[README.md](README.md)
