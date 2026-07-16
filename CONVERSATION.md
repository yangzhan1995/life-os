# 人生操作系统 · Life OS — 对话记录

## 项目概述

基于"人生操作系统"框架搭建的前端网页，Next.js 16 + TypeScript + Tailwind CSS 4。

**仓库**: https://github.com/yangzhan1995/life-os

## 框架核心

### 判断层（核心枢纽）
一件事来了，先停一秒：**这件事我能改变吗？**
- 能 → 向外四思维（经·政·哲·军）
- 不能 → 向内六传统（斯·佛·道·存·儒·心）

### 向外四思维
- 经济思维：利益结构是什么？人会对激励做出反应
- 政治思维：力量对比是什么？没有绝对对错，只有力量平衡
- 哲学思维：这到底是什么问题？追问前提
- 军事思维：怎么打赢？目标既定，只管能不能成

### 向内六传统
- 斯多葛：分清可控与不可控
- 佛教：痛苦来自执取，松开即解脱
- 道家：为道日损，做减法
- 存在主义：直面虚无，在荒谬中自由选择
- 儒家心性：修身为了更好地活在关系里
- 现代心理学：向内能力是可训练的心理技能

### 支撑层（12层）
身体层 → 关系/依恋 → 习惯/行为改变 → 人性层 → 判断层 → 叙事/故事 → 发展阶段 → 阴影/非理性 → 集体/仪式 → 游戏/玩 → 爱 → 审美/超越

### 操作手册
禁止清单 · 危机模式 · 日常节奏 · 资源管理 · 退出键 · 哀悼/丧失

## 设计规范（Figma Design System）

- 黑白单色底盘 + 大块柔色面板
- Pill 按钮（50px 圆角）
- 字体：Geist Sans（正文）+ Geist Mono（标签订）
- 无阴影，颜色块替代传统 elevation
- 支持亮/暗模式切换
- 左侧导航 + 右侧内容布局
- 子导航支持折叠/展开
- 全站动效：卡片悬停上浮、内容淡入切换、详情逐条滑入

## 技术栈

- Next.js 16 (Turbopack)
- TypeScript
- Tailwind CSS 4
- RemixIcon 图标库
- 自建 UI 组件：Button, Card, Badge, Tabs, Accordion, Separator, Tooltip

## 常用命令

```bash
cd life-os
npm install
npm run dev       # 开发 → http://localhost:3456
npm run build     # 生产构建

# Git 同步
git pull          # 拉取最新
git add -A && git commit -m "改动说明"
git push          # 推送到 GitHub
```

## 文件结构

```
life-os/
├── src/
│   ├── app/
│   │   ├── globals.css    # 全局样式 + 亮暗主题变量
│   │   ├── layout.tsx     # 根布局
│   │   └── page.tsx       # 主页面（数据+UI全在这里）
│   ├── components/ui/     # UI 组件库
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── tabs.tsx
│   │   ├── accordion.tsx
│   │   ├── separator.tsx
│   │   ├── scroll-area.tsx
│   │   └── tooltip.tsx
│   └── lib/utils.ts       # cn() 工具函数
├── .claude/settings.json  # Claude 项目权限
└── package.json
```

## 待优化项

- 移动端响应式适配
- 搜索功能
- 内容持续扩充
