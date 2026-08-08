# Anime.js 实战学习

交互式中文 Anime.js 教程：课程 + 测验 + 进度 + 真运行 Demo + Playground。

**在线访问：** [https://xiaoqianran.github.io/learning-Animejs/](https://xiaoqianran.github.io/learning-Animejs/)  
**仓库：** [https://github.com/xiaoqianran/learning-Animejs](https://github.com/xiaoqianran/learning-Animejs)

部署：GitHub Actions → GitHub Pages（`Deploy to GitHub Pages` workflow，`build_type: workflow`）。

参考姊妹站：[learning-vue3](https://github.com/xiaoqianran/learning-vue3)

---

## 这是什么

面向想系统学习 **Anime.js v4** 的同学。内容以「读一点、动手一点、测一点」组织。

你可以：

- 按路径学完课程（**讲解 + 对应源码 + 交互 Demo + 小测验**）
- 在 **Playground** 里改代码并立刻看动画
- 在 **秀场** 里欣赏综合编排
- 用 **速查表** 复习，用 **学习中心 / 错题本 / 结业证明** 跟进度

> 说明：本站用 React + TanStack Start 承载教学内容；Demo 与 Playground 运行真实 `animejs` v4。

---

## 功能一览

| 模块 | 路径 | 说明 |
|------|------|------|
| 课程 | `/lesson/:slug` | 正文、对应源码、Live Demo、测验、笔记 |
| 首页大纲 | `/` | 搜索、路径筛选、进度条 |
| Playground | `/playground` | 可编辑 Anime.js 沙盒 |
| 秀场 | `/showcase` | 精选综合动效 |
| 文档地图 | `/docs` | 对照 animejs.com 文档 |
| 主题 | 全局 | Catppuccin（Mocha/Macchiato/Frappé/Latte + Accent） |
| 速查表 | `/cheatsheet` | 一页核心 API |
| 学习中心 | `/hub` | 打卡、收藏、路径进度 |
| 练习场 | `/lab` | 综合练习 |
| 错题本 | `/mistakes` | 测验错题回顾 |
| 结业证明 | `/certificate` | 主修全部完成后解锁 |

---

## 学习路径

| 路径 | 你学到什么 |
|------|------------|
| **基础** | 目标、属性、时长、缓动、变换 |
| **时间线** | Timeline、Stagger、关键帧、循环、控制、回调 |
| **视觉特效** | SVG 描边 / Morph、文字拆分 |
| **交互** | 滚动、弹簧、拖拽、布局 FLIP |
| **实战** | 微交互、转场、性能与 a11y、毕业作品 |
| **进阶模式** | WAAPI、Utils（可选，不计入结业硬门槛） |

建议顺序：

```text
基础 → 时间线 → 视觉特效 → 交互 → 实战 → Playground 自己写
```

---

## 本地开发

```bash
npm install
npm run dev      # http://localhost:8080
npm run build
npm run build:pages   # GitHub Pages 静态站
```

---

## 技术栈

React 19 · TanStack Start / Router · Tailwind v4 · Zustand · Anime.js v4 · Catppuccin
