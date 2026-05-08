# DesignToCode

[![Release](https://img.shields.io/github/v/release/fitoe/DesignToCode)](https://github.com/fitoe/DesignToCode/releases)
![Topics](https://img.shields.io/badge/topics-agent--skills%20%C2%B7%20design--to--code%20%C2%B7%20unocss-blue)

安装：

```bash
npx skills add fitoe/DesignToCode
```

DesignToCode 是一个通用 Codex skill，用于把分段设计稿图片转成基于 UnoCSS 的高保真页面代码。

它适合处理结构清晰、视觉要求明确的图片转代码任务，重点是保留页面层次、背景关系、媒体语义和可维护的实现方式。

## 它能帮你做什么

- 将按区块拆分的设计稿落成页面代码
- 处理有明确层级、背景和内容关系的页面
- 在生成代码前先得到可确认的实现说明
- 在缺少图片资源时先规划补足策略，避免页面实现变乱
- 用 Playwright 做区块级截图校验

## 适用范围

DesignToCode 适用于：

- 按区块切分好的页面设计截图
- 现有前端项目
- 基于 UnoCSS 的新页面实现
- 高保真落地页、营销页、dashboard、功能展示页

DesignToCode 不适用于：

- Figma 节点直接转代码
- 后端或 API 生成
- “照着这个随便做个类似的” 这类模糊需求
- 最终输出为框架无关伪代码

## 工作方式

1. 读取按顺序排列的区块图片和说明。
2. 检查当前项目，识别页面约定和可复用约束。
3. 从仓库推断目标页面宽度，或回退到用户提供的 `pageWidth`。
4. 按目标页面宽度缩放每个区块设计图。
5. 分析区块结构、媒体角色、资源情况和实现风险。
6. 缺少关键图片时，先输出 `Asset Fulfillment Plan`。
7. 先对当前项目做 design system mapping pass。
8. 输出强制性的 `Pre-Implementation Brief`。
9. 等待用户确认。
10. 按项目约定生成页面代码。
11. 使用 Playwright 做区块截图 diff。
12. 输出偏差说明，以及可选的局部修复建议。

## Pre-Implementation Brief

在真正生成代码前，skill 必须先输出：

```md
## Page Understanding
## Section Breakdown
## Input Mode
## Reuse Mapping
## Media Role Decisions
## Asset Fulfillment Plan
## Asset Compression Plan
## Layout Implementation Plan
## Framework/Output Plan
## Known Ambiguities
## Verification Plan
```

在用户确认这份 brief 之前，不应开始生成页面代码。

## 项目判定

DesignToCode 采用“项目优先”规则：

- 先读取仓库中已有的页面、组件和约定
- 生成与现有项目一致的页面输出
- 仓库约定混合或不清晰时，停止并询问

不会静默猜测项目约定。

## 媒体与资源

每个重要视觉媒体元素都要先判定为：

- `background`
- `content image`

默认映射：

- `background` -> CSS background
- `content image` -> `<img>` 或 `<picture>`

资源解析顺序固定为：

- `provided original`
- `project existing`
- `crop fallback`
- `css reproducible`
- `unresolved`

当图片资源缺失时，先按 `Asset Fulfillment` 策略处理：

- `existing/crop`：使用已有资源或可靠裁切
- `css/svg`：用 CSS、SVG 或组件实现简单视觉
- `single-generation`：为 hero、产品、人像、复杂插画单独生成
- `atlas-generation`：为 2-8 张同类 bitmap 生成图集再按坐标裁切
- `formal-fallback`：使用正式可上线的 fallback，不写占位说明文字

图集只用于多张同类小/中型 bitmap。代码只能引用裁切后的独立文件，不能引用 atlas 大图。

位图资源需要遵循基于角色的压缩规则。新增大图在合入前应先经过扫描检查；fallback 和 exemption 情况必须显式记录。

如果关键视觉角色或关键资源存在歧义，skill 必须先停下来问，而不是猜。

## 资源工具

仓库内包含轻量资源工具：

```bash
npm run scan-assets
npm run optimize-assets -- --input assets/example.png --write
npm run crop-atlas -- --manifest path/to/asset-fulfillment-manifest.json
npm run validate-atlas -- --manifest path/to/asset-fulfillment-manifest.json
```

使用建议：

- `scan-assets`：检查图片尺寸、格式和角色策略
- `optimize-assets`：将选定图片转为合适的 WebP 资源
- `crop-atlas`：从 atlas 大图按像素坐标裁切独立图片
- `validate-atlas`：检查 atlas 坐标越界、输出缺失和尺寸不匹配

缺图补足的推荐时机是：先在 `Pre-Implementation Brief` 阶段整体盘点，再按策略批处理；不要写代码时遇到一张缺一张再临时生成。

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

验证拆成三层：

- structure checks
- visual checks
- reuse checks

结构层面的 smoke check 包括：

- 不允许横向溢出
- 不允许明显文字重叠
- 不允许图片变形
- 不允许关键区块内容丢失
- 不允许主 CTA 不可见

## 强制停止条件

以下情况必须停止并追问：

- 目标页面宽度无法确定
- 必需文案无法识别且用户未提供
- 关键视觉的媒体角色存在歧义
- 关键资源缺失且截图裁切也无法可靠替代
- 核心布局关系无法安全推断
- 关键图片缺失且没有确认的补足策略
- 用户尚未确认 `Pre-Implementation Brief`

## 当前状态

当前仓库已包含 skill 规范和参考文档。

当前已包含资源扫描、压缩、atlas 裁切和 atlas 校验脚本。还未包含端到端示例运行结果。

## 相关文件

- skill 主规范：[skills/design-to-code/SKILL.md](skills/design-to-code/SKILL.md)
- 缺图补足规则：[skills/design-to-code/references/asset-fulfillment-pipeline.md](skills/design-to-code/references/asset-fulfillment-pipeline.md)
- atlas 图集规则：[skills/design-to-code/references/asset-atlas-generation.md](skills/design-to-code/references/asset-atlas-generation.md)
- 许可证：[LICENSE](LICENSE)
- 发布记录：[RELEASE_NOTES.md](RELEASE_NOTES.md)
- English README：[README.en.md](README.en.md)
