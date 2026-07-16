"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  RiFocus3Line, RiArrowRightUpLine, RiMentalHealthLine,
  RiMoneyDollarCircleLine, RiGovernmentLine, RiLightbulbLine, RiSwordLine,
  RiAncientGateLine, RiFlowerLine, RiContrastLine, RiEmotionLine,
  RiBookOpenLine, RiBrainLine, RiUserLine, RiHeartPulseLine,
  RiLinksLine, RiLoopLeftLine, RiDnaLine, RiCompass3Line,
  RiBookletLine, RiSeedlingLine, RiMoonLine, RiTeamLine,
  RiGamepadLine, RiHeartLine, RiStarLine, RiForbidLine,
  RiAlarmWarningLine, RiTimeLine, RiCoinsLine, RiShutDownLine,
  RiCandleLine, RiStackLine, RiMenuFoldLine, RiMenuUnfoldLine,
} from "@remixicon/react"

/* ============================================================
   Data
   ============================================================ */

const outwardTools = [
  { id: "jing", name: "经", full: "经济思维", question: "利益结构是什么？", core: "人会对激励做出反应", desc: "成本收益分析、激励设计、资源配置。问「划不划算」「钱从哪里来、到哪里去」。", books: "《国富论》亚当·斯密、《资本论》马克思", icon: RiMoneyDollarCircleLine },
  { id: "zheng", name: "政", full: "政治思维", question: "力量对比是什么？", core: "没有绝对对错，只有力量平衡", desc: "权力关系、利益平衡、共识建构。问「谁能说了算」「各方如何妥协」。", books: "《君主论》马基雅维利、《社会契约论》卢梭", icon: RiGovernmentLine },
  { id: "zhe", name: "哲", full: "哲学思维", question: "这到底是什么问题？", core: "追问前提，不急着给答案", desc: "本质追问、前提批判、概念澄清。不急着解决问题，先问问题定义对了没有。", books: "《纯粹理性批判》康德、《理想国》柏拉图、《道德经》老子", icon: RiLightbulbLine },
  { id: "jun", name: "军", full: "军事思维", question: "怎么打赢？执行路径？", core: "目标既定，只管能不能成", desc: "目标-手段匹配、集中兵力、对抗博弈、执行纪律。不管应不应该，只管能不能成。", books: "《孙子兵法》孙武、《战争论》克劳塞维茨、《论持久战》毛泽东", icon: RiSwordLine },
]

const inwardTools = [
  { id: "stoic", name: "斯", full: "斯多葛", question: "什么由我控制？", core: "分清可控与不可控", desc: "焦虑的根源是把不取决于自己的事当成取决于自己的。控制不了发生什么，但能控制如何回应。", books: "《沉思录》马可·奥勒留、《手册》爱比克泰德", icon: RiAncientGateLine },
  { id: "buddha", name: "佛", full: "佛教", question: "苦从哪里来？如何止息？", core: "痛苦来自执取，松开即解脱", desc: "四圣谛：苦→苦的原因（渴爱）→苦可止息→止息的方法（八正道）。观察执取，放下执取。", books: "《心经》《阿含经》《清净道论》觉音", icon: RiFlowerLine },
  { id: "tao", name: "道", full: "道家", question: "为什么越努力越糟糕？", core: "为道日损，做减法", desc: "问题往往出在太用力。无为——不妄为、不强为。虚静——内心空了才能装新的。", books: "《道德经》老子、《庄子》", icon: RiContrastLine },
  { id: "exist", name: "存", full: "存在主义", question: "如果生命本无意义，我怎么活？", core: "直面虚无，在荒谬中自由选择", desc: "存在先于本质——你先存在，然后通过选择定义你是谁。意义不是你找到的，是你活出来的。", books: "《西西弗神话》加缪、《存在与时间》海德格尔", icon: RiEmotionLine },
  { id: "confu", name: "儒", full: "儒家心性", question: "如何在关系中安身立命？", core: "修身不是为了脱离世界，是为了更好地活在关系里", desc: "格物→致知→诚意→正心→修身→齐家→治国→平天下。向内修身和向外待人是一件事的两面。", books: "《大学》《传习录》王阳明", icon: RiBookOpenLine },
  { id: "psych", name: "心", full: "现代心理学", question: "怎么用科学方法面对内心痛苦？", core: "向内能力是可训练的心理技能", desc: "ACT 接纳承诺疗法：接纳、认知解离、活在当下、观察自我、价值观、承诺行动。", books: "《ACT就这么简单》哈里斯、《活出生命的意义》弗兰克尔", icon: RiBrainLine },
]

const foundationLayers = [
  { id: "body", title: "身体层", subtitle: "一切的地基", desc: "神经系统状态决定你能不能思考、感受、连接。身体不安全，斯多葛和加缪都进不去。", books: "《身体从未忘记》范德考克", icon: RiHeartPulseLine },
  { id: "attachment", title: "关系/依恋", subtitle: "模式从哪来", desc: "安全型、焦虑型、回避型——成年后的关系反应，源头在你还不会说话的时候。", books: "《依恋》阿米尔·莱文", icon: RiLinksLine },
  { id: "habit", title: "习惯/行为改变", subtitle: "知道→做到", desc: "行为 = 动机 + 能力 + 提示。改变不靠意志力，靠重新设计回路。", books: "《原子习惯》詹姆斯·克利尔", icon: RiLoopLeftLine },
  { id: "humanity", title: "人性层", subtitle: "五个人性设定", desc: "趋乐避苦 · 社会动物 · 追问意义 · 自我意识 · 有限且知道有限", books: "向外和向内框架的共同地基", icon: RiDnaLine },
  { id: "judge", title: "判断层", subtitle: "能改变？→ 向外 / 不能？→ 向内", desc: "一件事来了，先停一秒。这个判断决定了你用哪套工具。判断力不是读出来的，是练出来的。", books: "——", icon: RiCompass3Line },
  { id: "narrative", title: "叙事/故事", subtitle: "你怎么讲述一切", desc: "同样的经历，不同的故事产生不同的影响。叙事不是改变事实，是重新框定事实的意义。", books: "《也许你该找个人聊聊》洛莉·戈特利布", icon: RiBookletLine },
  { id: "stage", title: "发展阶段", subtitle: "你在人生哪个阶段", desc: "二十岁建立身份，三十岁建立关系与事业，四十岁重新审视意义。用错阶段的工具会陷入特殊的空虚。", books: "《为什么长大》苏珊·奈曼", icon: RiSeedlingLine },
  { id: "shadow", title: "阴影/非理性", subtitle: "你不知道的那部分自己", desc: "你最讨厌别人的点，往往指向你自己被压抑的部分。被压抑的东西不会消失，会在别处冒出来。", books: "《荣格自传》", icon: RiMoonLine },
  { id: "collective", title: "集体/仪式", subtitle: "有些痛苦只能一起修复", desc: "几万年来，人类处理焦虑、空虚、孤独的主要方式不是个人修行，是集体仪式。", books: "《独自打保龄》帕特南", icon: RiTeamLine },
  { id: "play", title: "游戏/玩", subtitle: "不为了任何目的", desc: "人在玩的时候不问意义。孩子追蝴蝶、大人打球——这些时刻不解决任何问题，但人在这时最不焦虑。", books: "《游戏的人》赫伊津哈", icon: RiGamepadLine },
  { id: "love", title: "爱", subtitle: "所有框架之上的力量", desc: "爱不是依恋模式的重复，不是利益计算。你愿意让另一个人的幸福成为你幸福的一部分，不求回报。", books: "《爱的艺术》弗洛姆", icon: RiHeartLine },
  { id: "aesthetic", title: "审美/超越", subtitle: "理性之外的治愈", desc: "有些东西超出框架。一首曲子、一片夕阳、一个拥抱——不分析，只感受。", books: "什么都别读，去听一首曲子", icon: RiStarLine },
]

const metaItems = [
  { id: "forbidden", title: "禁止清单", subtitle: "八条绝对不做的事", icon: RiForbidLine, items: ["情绪高峰不做重大决定", "深夜不反刍", "不用向外工具处理向内问题", "不用向内当作逃避向外的借口", "不自欺", "不因害怕别人反应而不做该做的事", "不比较", "不放弃身体"] },
  { id: "crisis", title: "危机模式", subtitle: "崩溃时照着做，不思考", icon: RiAlarmWarningLine, items: ["前三天：不决定、不死扛、不独处", "只做五件事：吃饭、睡觉、走路、说真话、不逃避", "三天后：画可控/不可控线、哀悼该哀悼的、找一个人帮忙"] },
  { id: "rhythm", title: "日常节奏", subtitle: "早晚各5分钟", icon: RiTimeLine, items: ["早晨：身体检查1min → 今日预判2min → 一个意图1min → 激活身体1min", "晚间：一件事复盘3min → 可控/不可控清单1min → 呼吸收尾1min", "每周30min维护：钱·身体·关系·重点·不做什么"] },
  { id: "resource", title: "资源管理", subtitle: "钱·时间·健康", icon: RiCoinsLine, items: ["钱：紧急金≥3月生活费，花销≤收入70%，不欠消费贷", "时间：每天一段90分钟连续时间，手机不在身边的1小时", "健康：睡≥6h，每周动≥3次，不喝含糖饮料"] },
  { id: "exit", title: "退出键", subtitle: "能关掉的系统才是好系统", icon: RiShutDownLine, items: ["每天有一段不用框架的时间：吃饭不看手机", "每周半天：不计划、不分析、不优化", "每月一次：自然接触——山、海、公园、日落"] },
  { id: "mourning", title: "哀悼/丧失", subtitle: "有些东西不能被解决，只能被哀悼", icon: RiCandleLine, items: ["哀悼不是焦虑、空虚或孤独——虽然它可能带着所有三个", "失去是真实的，不能被「接纳」和「放下」跳过", "哀悼是健康的：慢慢把力比多从丧失对象上收回来"] },
]

/* ============================================================
   Sidebar Nav
   ============================================================ */

type NavSection = {
  id: string
  label: string
  icon: React.ElementType
  children?: { id: string; label: string; icon?: React.ElementType }[]
}

const navSections: NavSection[] = [
  {
    id: "judge",
    label: "判断层",
    icon: RiFocus3Line,
  },
  {
    id: "outward",
    label: "向外四思维",
    icon: RiArrowRightUpLine,
    children: outwardTools.map(t => ({ id: t.id, label: t.full })),
  },
  {
    id: "inward",
    label: "向内六传统",
    icon: RiMentalHealthLine,
    children: inwardTools.map(t => ({ id: t.id, label: t.full })),
  },
  {
    id: "foundation",
    label: "支撑层",
    icon: RiStackLine,
    children: foundationLayers.map(l => ({ id: l.id, label: l.title })),
  },
  {
    id: "meta",
    label: "操作手册",
    icon: RiBookletLine,
    children: metaItems.map(m => ({ id: m.id, label: m.title })),
  },
]

/* ============================================================
   Main Page
   ============================================================ */

export default function Home() {
  const [activeSection, setActiveSection] = useState("judge")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeDetail, setActiveDetail] = useState<string | null>(null)

  // Find current tool/layer/meta for detail view
  const allItems = useMemo(() => ({
    ...Object.fromEntries(outwardTools.map(t => [t.id, t])),
    ...Object.fromEntries(inwardTools.map(t => [t.id, t])),
    ...Object.fromEntries(foundationLayers.map(l => [l.id, l])),
    ...Object.fromEntries(metaItems.map(m => [m.id, m])),
  }), [])

  const detailItem = activeDetail ? (allItems as any)[activeDetail] : null

  /* ---- Render right content based on active section ---- */

  const renderContent = () => {
    // Show detail view inline if active
    if (activeDetail) return renderDetailInline()

    // Judge layer
    if (activeSection === "judge") {
      return (
        <div className="space-y-8">
          <div className="gradient-border rounded-2xl bg-card p-8 text-center max-w-2xl mx-auto">
            <RiFocus3Line size={40} className="mx-auto mb-3 text-primary" />
            <h2 className="text-xl font-bold mb-2">判断层</h2>
            <p className="text-3xl font-bold mb-3">
              这件事我<span className="text-primary">能改变</span>吗？
            </p>
            <div className="flex items-center justify-center gap-3">
              <Badge>能 → 向外，去搞定</Badge>
              <Badge variant="secondary">不能 → 向内，来接住</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-4">能影响一部分 → 向外做能做的，向内接住剩下的</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <RiArrowRightUpLine size={18} className="text-primary" />
                <h3 className="font-bold">向外四思维</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {outwardTools.map(t => (
                  <Card key={t.id} className="cursor-pointer hover:border-primary/40 transition-colors" onClick={() => setActiveDetail(t.id)}>
                    <CardHeader className="p-3 pb-1"><CardTitle className="text-sm flex items-center gap-1.5"><t.icon size={16} className="text-primary" />{t.full}</CardTitle></CardHeader>
                    <CardContent className="p-3 pt-0"><p className="text-xs text-muted-foreground">{t.core}</p></CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <RiMentalHealthLine size={18} className="text-primary" />
                <h3 className="font-bold">向内六传统</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {inwardTools.map(t => (
                  <Card key={t.id} className="cursor-pointer hover:border-primary/40 transition-colors" onClick={() => setActiveDetail(t.id)}>
                    <CardHeader className="p-3 pb-1"><CardTitle className="text-sm flex items-center gap-1.5"><t.icon size={16} className="text-primary" />{t.full}</CardTitle></CardHeader>
                    <CardContent className="p-3 pt-0"><p className="text-xs text-muted-foreground">{t.core}</p></CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    }

    // Outward tools
    if (activeSection === "outward") {
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2"><RiArrowRightUpLine size={20} className="text-primary" />向外四思维</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {outwardTools.map(t => (
              <Card key={t.id} className="cursor-pointer hover:border-primary/40 transition-colors" onClick={() => setActiveDetail(t.id)}>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base flex items-center gap-2"><t.icon size={20} className="text-primary" />{t.full}</CardTitle>
                  <CardDescription>{t.question}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0"><p className="text-sm">{t.core}</p></CardContent>
              </Card>
            ))}
          </div>
        </div>
      )
    }

    // Inward tools
    if (activeSection === "inward") {
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2"><RiMentalHealthLine size={20} className="text-primary" />向内六传统</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {inwardTools.map(t => (
              <Card key={t.id} className="cursor-pointer hover:border-primary/40 transition-colors" onClick={() => setActiveDetail(t.id)}>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base flex items-center gap-2"><t.icon size={20} className="text-primary" />{t.full}</CardTitle>
                  <CardDescription>{t.question}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0"><p className="text-sm">{t.core}</p></CardContent>
              </Card>
            ))}
          </div>
        </div>
      )
    }

    // Foundation layers
    if (activeSection === "foundation") {
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2"><RiStackLine size={20} className="text-primary" />支撑层</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {foundationLayers.map(l => (
              <div key={l.id}
                className={`rounded-lg border p-4 cursor-pointer transition-all hover:-translate-y-0.5 hover:border-primary/40 bg-card ${l.id === "judge" ? "border-primary/50" : "border-border/50"}`}
                onClick={() => setActiveDetail(l.id)}
              >
                <l.icon size={22} className="text-primary mb-2" />
                <h4 className="text-sm font-semibold">{l.title}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{l.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      )
    }

    // Meta items
    if (activeSection === "meta") {
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2"><RiBookletLine size={20} className="text-primary" />操作手册</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {metaItems.map(m => (
              <Card key={m.id} className="cursor-pointer hover:border-primary/40 transition-colors" onClick={() => setActiveDetail(m.id)}>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base flex items-center gap-2"><m.icon size={18} className="text-primary" />{m.title}</CardTitle>
                  <CardDescription>{m.subtitle}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <ul className="space-y-1">
                    {m.items.slice(0, 3).map((li, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex gap-1.5">
                        <span className="text-primary shrink-0">•</span>{li}
                      </li>
                    ))}
                    {m.items.length > 3 && <li className="text-xs text-primary mt-1">查看全部 {m.items.length} 条 →</li>}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )
    }

    return null
  }

  /* ---- Render detail inline ---- */

  const renderDetailInline = () => {
    if (!detailItem) return null
    const item = detailItem as any
    const Icon = item.icon
    const isMeta = metaItems.some(m => m.id === activeDetail)

    return (
      <div className="animate-fade-in">
        <div className="bg-card border rounded-xl p-6">
          {Icon && <Icon size={32} className="text-primary mb-3" />}
          <h3 className="text-xl font-bold">{item.full || item.title}</h3>
          {item.subtitle && <p className="text-sm text-primary font-medium mt-0.5">{item.subtitle}</p>}
          {item.core && <p className="text-sm text-primary font-medium mt-0.5">{item.core}</p>}
          <Separator className="my-3" />
          {item.question && <p className="text-sm mb-2"><strong>核心追问：</strong>{item.question}</p>}
          <p className="text-sm text-muted-foreground mb-3">{item.desc}</p>
          {item.books && <div className="bg-muted rounded-lg p-3 text-xs"><strong>关键资源：</strong>{item.books}</div>}
          {isMeta && item.items && (
            <ul className="mt-3 space-y-1.5">
              {item.items.map((li: string, i: number) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{i + 1}</span>
                  {li}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }

  /* ---- Floating particles ---- */

  const particles = useMemo(() =>
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 15,
      duration: Math.random() * 10 + 10,
      color: ["#FE8A01", "#403734", "#38322F", "#E4E4E4", "#111111"][Math.floor(Math.random() * 5)],
    })),
  [])

  /* ================================================================ */

  return (
    <div className="min-h-screen flex">
      {/* Floating particles */}
      <div className="floating-particles">
        {particles.map(p => (
          <div key={p.id} className="particle" style={{
            left: p.left, width: p.size + "px", height: p.size + "px",
            background: p.color, animationDelay: p.delay + "s", animationDuration: p.duration + "s",
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }} />
        ))}
      </div>

      {/* ===== Sidebar ===== */}
      <aside className={`${sidebarOpen ? "w-56" : "w-14"} transition-all duration-200 border-r bg-card shrink-0 flex flex-col h-screen sticky top-0 z-30`}>
        {/* Toggle */}
        <div className="flex items-center h-14 px-3 border-b">
          {sidebarOpen ? (
            <div className="flex items-center gap-2 flex-1">
              <RiCompass3Line size={20} className="text-primary shrink-0" />
              <span className="font-bold text-sm whitespace-nowrap">人生操作系统</span>
            </div>
          ) : null}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 rounded hover:bg-muted shrink-0 ml-auto">
            {sidebarOpen ? <RiMenuFoldLine size={18} /> : <RiMenuUnfoldLine size={18} />}
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-auto py-2">
          {navSections.map(section => (
            <div key={section.id}>
              <button
                onClick={() => { setActiveSection(section.id); setActiveDetail(null) }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors hover:bg-muted/50 ${activeSection === section.id ? "bg-muted text-primary font-medium" : "text-muted-foreground"}`}
              >
                <section.icon size={18} className="shrink-0" />
                {sidebarOpen && <span className="truncate">{section.label}</span>}
              </button>
              {sidebarOpen && section.children && (
                <div className="ml-7 mr-2">
                  {section.children.map(child => (
                    <button
                      key={child.id}
                      onClick={() => { setActiveSection(section.id); setActiveDetail(child.id) }}
                      className="w-full text-left text-xs text-muted-foreground hover:text-foreground py-1.5 px-2 rounded hover:bg-muted/30 transition-colors truncate block"
                    >
                      {child.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        {sidebarOpen && (
          <div className="p-3 border-t text-[10px] text-muted-foreground text-center">
            Life OS · 十层四维
          </div>
        )}
      </aside>

      {/* ===== Main Content ===== */}
      <main className="flex-1 min-w-0">
        {/* Top bar */}
        <div className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur-xl h-14 flex items-center px-6">
          {activeDetail ? (
            <>
              <button onClick={() => setActiveDetail(null)} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors mr-3">
                ← 返回
              </button>
              <h1 className="font-bold text-sm">
                {detailItem?.full || detailItem?.title}
              </h1>
            </>
          ) : (
            <>
              <h1 className="font-bold text-sm">
                {navSections.find(s => s.id === activeSection)?.label || "人生操作系统"}
              </h1>
              <span className="text-xs text-muted-foreground ml-3">
                {activeSection === "judge" && "核心枢纽 · 能改变吗？"}
                {activeSection === "outward" && "经 · 政 · 哲 · 军"}
                {activeSection === "inward" && "斯 · 佛 · 道 · 存 · 儒 · 心"}
                {activeSection === "foundation" && "从身体到审美，十二层支撑"}
                {activeSection === "meta" && "禁止清单 · 危机模式 · 日常节奏 · 退出键"}
              </span>
            </>
          )}
        </div>

        {/* Content area */}
        <div className="p-6 max-w-5xl">
          {renderContent()}
        </div>
      </main>
    </div>
  )
}
