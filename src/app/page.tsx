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
   Data — 类型定义
   ============================================================ */

interface ToolData {
  id: string; full: string; question: string; core: string; desc: string; books: string;
  concepts: string[]; scenarios: string[]; training: string[]; pitfalls: string[];
  icon: React.ElementType;
}

interface LayerData {
  id: string; title: string; subtitle: string; desc: string; books: string;
  principles: string[]; why: string; practice: string[];
  icon: React.ElementType;
}

interface MetaData {
  id: string; title: string; subtitle: string;
  items: { title: string; desc: string }[];
  icon: React.ElementType;
}

/* ============================================================
   Data — 向外四思维
   ============================================================ */

const outwardTools: ToolData[] = [
  {
    id: "jing", full: "经济思维", question: "利益结构是什么？各方要什么？",
    core: "人会对激励做出反应。不理解利益，就不理解行为。",
    desc: "所有社会现象背后都有成本收益的计算——不是每个人都在算钱，但每个人都在趋利避害。经济思维让你透过道德话语看到真实的利益格局：谁付出、谁获益、谁承担风险、谁拥有信息。看不见的手不是说市场万能，而是说个体的自利行为在特定制度下会产生非预期的秩序。",
    books: "《国富论》亚当·斯密 | 《资本论》马克思 | 《经济学原理》曼昆",
    concepts: ["稀缺性：资源有限，欲望无穷，选择意味着放弃", "机会成本：做一件事的真正成本是你放弃了什么", "边际思维：不是「要不要做」，而是「再做一点值不值」", "激励：改变激励就改变行为，结构决定结果", "交易成本：市场不是免费的，信息、谈判、执行都有成本"],
    scenarios: ["判断一个政策/制度的真实影响——谁受益、谁买单", "谈判时理解对方的核心利益和底线", "设计团队激励方案——奖惩机制决定行为方向", "个人决策：花钱、投资、换工作——算清隐性成本和长期收益"],
    training: ["每天问一次：这件事的成本是谁在承担？", "读新闻时追问：这背后的利益格局是什么？", "做决策前列出所有选项的机会成本", "练习「边际思维」：不是好不好，是再多一点值不值"],
    pitfalls: ["只算钱不算其他价值（时间、关系、尊严）", "假设人是纯理性的——实际上人会系统性犯错", "把一切看成交易，忽略了信任、爱和意义"],
    icon: RiMoneyDollarCircleLine,
  },
  {
    id: "zheng", full: "政治思维", question: "力量对比是什么？各方如何妥协？",
    core: "没有绝对的对错，只有力量的平衡和利益的妥协。",
    desc: "政治思维不空谈正义，而是分析真实的权力结构——谁手里有什么牌、谁和谁结盟、谁在什么时候出手。关键不是「最好的方案」，而是「各方都能接受的方案」。政治的本质是：在资源有限、利益冲突的条件下，通过权力博弈实现暂时的秩序。",
    books: "《君主论》马基雅维利 | 《社会契约论》卢梭 | 《论法的精神》孟德斯鸠",
    concepts: ["权力：让其他人做你想让他们做的事的能力", "合法性：权力被自愿接受的基础——暴力、传统、魅力、程序", "联盟：没有永远的朋友，只有永远的利益", "时机：同样的方案，在不同时间提出来，结果完全不同", "妥协：政治不是消灭对手，是和对手共存在一个秩序里"],
    scenarios: ["推动一个需要多方支持的项目——识别盟友、动摇中间派、隔离反对者", "理解公司政治：谁在上升、谁被边缘化、谁的背书重要", "在团队冲突中找到各方都能接受的方案", "判断一个制度变革是否可行——不是它好不好，是支持力量够不够"],
    training: ["画利益相关方地图：谁支持、谁反对、谁可以争取", "分析一件事的「政治可行性」——不光问对不对，还问能不能", "练习换位思考：如果你是对手，你的最优策略是什么？", "在组织里建立关系网络——不是搞关系，是建立信任"],
    pitfalls: ["变成马基雅维利主义——为了权力不择手段", "把一切都当成阴谋——很多结果只是结构性的，不是谁设计的", "忽视制度的约束力——政治不只有个人博弈，还有规则框架"],
    icon: RiGovernmentLine,
  },
  {
    id: "zhe", full: "哲学思维", question: "这到底是什么问题？前提是什么？",
    core: "不急着解决，先问问题本身对不对。",
    desc: "哲学思维是所有思考的底层操作系统。它在别人开始解题之前先追问：「这个问题定义对了吗？」「我们用的概念是什么意思？」「这个推理的前提假设是什么？」。大多数人卡住不是解不出答案，而是在错误的问题框架里打转。哲学思维的价值不是给出答案，是让你意识到你可能问了错误的问题。",
    books: "《纯粹理性批判》康德 | 《理想国》柏拉图 | 《道德经》老子 | 《存在与时间》海德格尔",
    concepts: ["前提批判：任何论断都有未经审查的前提，找到它", "概念澄清：我们说的「公平」「自由」「效率」到底指什么？", "范畴错误：把属于A范畴的问题用B范畴的方法解决", "第一性原理：回到最基本的事实，从那里重新推导", "辩证法：看似矛盾的命题可能在更高层面统一"],
    scenarios: ["遇到难题卡住时——重新定义问题比努力解决更重要", "辩论/讨论时——不是争输赢，是追问「我们的分歧到底在哪」", "做出重大人生决策——反思自己真正的价值观和预设", "设计产品或方案——从用户真正的需求出发，而不是从已有方案出发"],
    training: ["遇到问题先问三遍：这到底是什么问题？", "读到观点时反问：这个结论的前提是什么？", "区分「事实」「解读」「情绪」——一件事发生和你对它的判断是两回事", "练习写论证链：主张→理由→证据→前提假设", "和不同观点的人深入对话——你的预设只有在碰撞中才显形"],
    pitfalls: ["为了追问而追问，变成「分析瘫痪」——哲学应该导向更好的行动", "以为一切都没有答案——苏格拉底知道自己无知是智慧，但拒绝所有判断是逃避", "脱离具体情境空谈概念——好的哲学落在地上，坏的哲学飘在空中"],
    icon: RiLightbulbLine,
  },
  {
    id: "jun", full: "军事思维", question: "怎么打赢？第一步做什么？",
    core: "目标既定，集中资源，不计较手段，只问能不能成。",
    desc: "军事思维是最务实的手段思维——不讨论应不应该（那是政治的事），只讨论在给定资源、时间和对手反抗的条件下，如何实现目标。核心是：明确重心、集中兵力、因敌制胜、临机应变。计划在纸上是完美的，一接触现实就开始崩坏——所以真正的军事思维不是「按计划执行」，而是「在混乱中保持判断力」。",
    books: "《孙子兵法》孙武 | 《战争论》克劳塞维茨 | 《论持久战》毛泽东",
    concepts: ["重心：找到最关键的一个点——拿下它，全局就动", "摩擦：计划在纸上有100%的效率，现实中能实现30%就很好", "战争之雾：信息永远不完整，决策永远在不确定中进行", "集中兵力：在决定性位置形成压倒性优势，不在次要方向浪费资源", "因敌制胜：根据对手的行动调整自己的策略，没有一成不变的打法"],
    scenarios: ["启动一个有明确截止日期的重要项目", "做竞争分析：对手的弱点在哪？我们集中资源打哪个点？", "个人执行：每天最重要的一件事是什么？先把它干掉", "资源有限时做取舍——什么不做和什么要做同等重要"],
    training: ["每天先做最难/最重要的一件事（吃掉那只青蛙）", "做任何计划都问：如果只能实现一个目标，是哪个？", "复盘每次失败：是计划错了、执行错了、还是信息不够？", "练习「摩擦意识」——做计划时主动打七折，留出缓冲", "模拟最坏情况：如果对手知道了你的计划，你还能怎么调整？"],
    pitfalls: ["把一切当成战争——在工作之外的人际关系中用军事思维会伤人", "执着于完美计划——计划是死的，执行是活的", "忽视了「不战而屈人之兵」——最高级的胜利不需要打", "过于关注短期输赢而忽略长期战略——赢了每一场战役输了整个战争"],
    icon: RiSwordLine,
  },
]

/* ============================================================
   Data — 向内六传统
   ============================================================ */

const inwardTools: ToolData[] = [
  {
    id: "stoic", full: "斯多葛", question: "什么东西由我控制？",
    core: "你控制不了发生什么，但你能控制如何回应。自由在这里。",
    desc: "斯多葛是向内框架里最「硬」的传统——不讲玄学，只讲可操作的内心训练。核心操作只有一个：每遇到一件事，立刻区分「取决于我的」和「不取决于我的」。前者用力，后者放手。大多数人的痛苦来自把第二类误认为第一类——想要控制别人的看法、事情的结果、身体的变化，然后因为控制不了而焦虑。",
    books: "《沉思录》马可·奥勒留 | 《手册》爱比克泰德 | 《论幸福生活》塞涅卡",
    concepts: ["控制二分法：有些事取决于我们（判断、欲望、行动），有些事不取决于我们（健康、财富、名声、别人的看法）", "消极想象：定期想象失去你已经拥有的东西——不是悲观，是让你重新珍惜", "内在堡垒：外部事件不能直接伤害你，是你对事件的判断伤害了你", "顺应自然：接受宇宙的秩序，不是被动认命，是主动理解什么是你能改变的、什么是不能的", "Memento Mori（记住你会死）：死亡是最终的参照系，让一切变得清晰"],
    scenarios: ["被批评/否定时——区分「对方说了什么」（不可控）和「我选择怎么理解它」（可控）", "面临不确定性时——把注意力从结果（不可控）转移到过程（可控）", "与人冲突时——你可以控制自己的情绪反应和表达方式", "遭遇挫折时——问自己：这件事里，还有什么是依赖我的努力可以做的？"],
    training: ["每天早晚用控制二分法审视当天的事", "遇到情绪波动时，对自己说：伤害我的不是事件本身，是我对事件的判断", "练习消极想象：想象今天是你拥有的最后一天这种生活——然后正常地过", "睡前问三个问题：今天我克服了什么冲动？今天我对什么放手了？明天我可以控制什么？"],
    pitfalls: ["把斯多葛当成压抑情绪——不是不感受，是感受之后选择不被打倒", "用「这不在我控制之内」来逃避该承担的责任", "过度认同命运——有些事确实可以改变，斯多葛和消极是两回事"],
    icon: RiAncientGateLine,
  },
  {
    id: "buddha", full: "佛教", question: "苦从哪里来？如何止息？",
    core: "痛苦来自执取——抓着不放手的东西。松开，不是放弃，是解脱。",
    desc: "佛教是向内框架里最系统、最深细的一个。核心发现可以用四圣谛概括：人生有苦（面对它）→ 苦的原因是对无常的东西执取（诊断它）→ 苦可以被止息（相信可以好起来）→ 止息的方法是八正道（路径）。佛教不要求你信什么，它邀请你观察自己的心——看看执取是怎样制造痛苦的。",
    books: "《心经》 | 《阿含经》 | 《清净道论》觉音 | 《当下的力量》托利（现代正念）",
    concepts: ["四圣谛：苦（问题）→ 集（原因）→ 灭（可能性）→ 道（方法）", "无常：一切都在变化，抗拒变化就是痛苦的来源", "无我：「我」不是一个固定的实体，是一串流动的经验和念头的集合", "执取：对快乐的贪爱、对痛苦的排斥、对「自我」的执着——这三把火烧着人", "正念：不评判地观察当下的身心现象——看着念头来来去去，不抓住，不推开"],
    scenarios: ["反复纠缠同一件事放不下——观察那个「放不下」的感觉本身，而不是它的内容", "对过去的事懊悔——过去已经不存在了，存在的是你现在对它的执取", "对未来的事焦虑——未来还没来，你现在经历的不是未来，是对未来的想象", "人际关系中反复出现的痛苦模式——观察自己的自动化反应，不急着改变，先看清楚"],
    training: ["每天正念呼吸5分钟：注意力放在呼吸上，跑掉就回来", "标记情绪：生气的时侯在心里说「生气、生气」，不评判，只是命名", "身体扫描：从头到脚感受身体各部位的感受——紧张、放松、冷、热", "观察无常：注意一切感受如何生起、停留、消逝——没有一个会永远停留"],
    pitfalls: ["把「放下」当作逃避问题的借口——放下的是执取，不是责任", "把「无我」用来否定自己的存在感和价值——无我不是没有你，是没有固定的你", "修行变成一种新的执取——「我一定要开悟」本身就是一个执取对象"],
    icon: RiFlowerLine,
  },
  {
    id: "tao", full: "道家", question: "为什么越努力越糟糕？",
    core: "不是因为做得不够，是因为太用力了。为道日损，做减法。",
    desc: "道家的洞见和所有其他传统都不一样。斯多葛、佛教、存在主义都在「用力」——训练、修行、建构意义。道家说：问题出在你太用力了。水不争，但水到渠成。无为不是什么都不做，是不妄为——不违背事物的自然节律强行干涉。道家的核心姿势不是「克服」，是「顺应」。",
    books: "《道德经》老子 | 《庄子》",
    concepts: ["道：万物运行的自然法则——不是神，不是规律，是「本来如此」的秩序", "无为：不妄为、不强为——知道什么时候该收手比知道什么时候该出手更难", "自然：事物本来的样子——不是未经改造的自然界，是「自己如此」的状态", "虚静：心空了才能装新的——满的杯子倒不进水", "柔弱胜刚强：水是最柔软的，但水滴石穿——柔不是弱，是韧"],
    scenarios: ["做事遇到阻力越推越糟——停下来，问自己：是不是该换个方向了？", "过度规划和控制——松开手，看看事情本身的走向", "创造力枯竭——不去想它，散个步，让潜意识工作", "人际关系紧张——退一步，不是所有的分歧都需要解决"],
    training: ["每天有一段时间「什么都不做」——不是刷手机，是真的闲下来", "遇到困难时问：如果我不去「解决」它，只是观察它，会发生什么？", "练习说不——对不必要的承诺、多余的社交、别人的期待", "读庄子：不为了获得什么，只是放松"],
    pitfalls: ["把「无为」当作偷懒的借口——无为是不妄为，不是不作为", "变成消极避世——道家的智慧是用来更好地活在世界里，不是逃离世界", "否定一切努力——努力在正确方向上是好的，瞎忙才是有害的"],
    icon: RiContrastLine,
  },
  {
    id: "exist", full: "存在主义", question: "如果生命本无意义，我怎么活？",
    core: "没有天生的意义——意义是你活出来的。你是自由的，因此你要负责。",
    desc: "存在主义是最诚实的向内传统。它不假装人生有意义，不自欺，不靠宗教或玄学来逃避。它的出发点是：人被「抛」到这个世界上，没有预先设定的目的，终有一死。这个事实让人眩晕——但正是在这种眩晕中，人获得了真正的自由。没有人为你写好剧本，你必须自己写。痛苦的不是没有意义，是不敢面对「你必须自己创造意义」这个事实。",
    books: "《西西弗神话》加缪 | 《存在与时间》海德格尔 | 《存在与虚无》萨特 | 《活出生命的意义》弗兰克尔",
    concepts: ["存在先于本质：你先存在（被抛到世界上），然后通过选择定义你是谁——你不是天生的「什么样的人」，你是你自己选择的总和", "荒谬：人对意义的渴望和世界不给意义的沉默之间形成了裂缝——荒谬不是终点，是起点", "本真性：直面死亡和自由的焦虑，选择属于自己的活法——不去模仿别人，不去躲在社会期待后面", "他者即地狱：不是别人是坏的，而是别人的目光让你把自己当成了客体", "反抗：即使世界荒诞，我选择继续活着——推石头上山，并想象西西弗是幸福的"],
    scenarios: ["感受不到人生的意义——不是去找意义，是去做一件你觉得值得做的事", "做重大人生选择——没有「正确」答案，但你必须选，选了就要承担后果", "觉得自己活在别人的期待里——问：如果没有人在看我，我会怎么做？", "面对死亡或重大丧失——正是有限让人生有了紧迫感和意义"],
    training: ["问自己：如果没有人会评价你，你会怎么活？", "对自己的一个选择承担全部责任——不说「没办法」，说「我选择了」", "写自己的人生宣言：你选择为什么而活？每周重读，可以修改", "接受焦虑：焦虑不是bug，是人意识到自由时的正常反应——不逃避它"],
    pitfalls: ["把「人生无意义」当作绝望的理由——无意义是起点，不是结论", "过度强调个人选择而忽视社会结构——你不是在真空中选择的", "存在主义焦虑变成一种表演——不是越痛苦越深刻"],
    icon: RiEmotionLine,
  },
  {
    id: "confu", full: "儒家心性", question: "如何在关系中安身立命？",
    core: "修身不是为了脱离世界，是为了更好地活在天地之间、人群之中。",
    desc: "儒家和前面四家最大的不同在于：它不把「向内」理解为脱离关系，而是在关系中完成向内。修身的目的是齐家、治国、平天下——不是逃离，是承担。格物致知诚意正心，这八个字是儒家的向内路径。关键是「诚」——对自己诚实，不自欺。一旦自欺，整个链条就断了。",
    books: "《大学》 | 《传习录》王阳明 | 《近思录》朱熹、吕祖谦",
    concepts: ["八条目：格物→致知→诚意→正心→修身→齐家→治国→平天下——从内到外完整打通", "诚意：对自己真实——不掩饰、不欺骗、不表演。诚意是修身的起点", "致良知（王阳明）：每个人内心都有良知——不是学来的，是需要去掉遮蔽才能显现的", "知行合一：知道做不到，等于不知道。真正的知一定包含行", "中庸：不是平庸，是恰到好处——不偏不倚，无过无不及"],
    scenarios: ["在家庭和事业之间找不到平衡——这不是时间管理问题，是价值排序问题", "对自己做的事感到矛盾——回到「诚意」：你真正相信什么？", "在组织中感到迷失——儒家的路径：先修己，再影响周围", "教育孩子/带团队——以身作则比说教有效一百倍"],
    training: ["每天问自己：今天有没有对自己说谎？", "练习「慎独」——一个人时和在人前一样诚实", "从最小的关系开始修：对家人多一点耐心，对自己多一点诚实", "读一段经典（如《大学》）然后当天就试着践行一句话"],
    pitfalls: ["把修身变成道德表演——为了让别人觉得你「有修养」而修身，失了诚意", "用道德绑架别人——儒家是向内修的，不是用来审判别人的工具", "忽视制度的作用——好的社会需要制度，不能只靠个人修养"],
    icon: RiBookOpenLine,
  },
  {
    id: "psych", full: "现代心理学", question: "怎么用科学验证的方法面对内心痛苦？",
    core: "向内能力不是玄学，是可以训练、可以测量的心理技能。",
    desc: "现代心理学是前面五个传统的「科学版」——几千年来修行人用直觉和经验积累的智慧，现在被实验和临床验证了一遍。ACT（接纳承诺疗法）是整合度最高的现代向内框架：接纳不可改变的感受、认知解离（看到想法不等于事实）、活在当下、以观察自我为锚点、按价值观行动。这六步不是哲学思辨，是临床验证过的有效操作。",
    books: "《ACT就这么简单》哈里斯 | 《活出生命的意义》弗兰克尔 | 《不完美的礼物》布琳·布朗 | 《身体从未忘记》范德考克",
    concepts: ["接纳：不是喜欢痛苦，是不浪费精力去对抗它——把力气用在能改变的地方", "认知解离：看到想法只是想法——「我很差」只是一个念头，不是事实", "活在当下：注意力在现在——不是在过去的懊悔里，也不是在对未来的焦虑里", "观察自我：你不是你的想法，你是那个能观察到自己在想的人", "价值观：不是目标（可以达到的终点），而是方向（持续的指南针）"],
    scenarios: ["焦虑发作——先接纳「我现在在焦虑」，然后观察身体感受，不急着赶走它", "反复自我批评——练习认知解离：给那个批评的声音起个名字，把它当外人", "没有动力——不是缺意志力，是没和价值观连上。问自己：什么东西对我真正重要？", "关系冲突——先处理自己的情绪反应，再回应对方"],
    training: ["每天5分钟正念——不是「放空」，是觉察当下的身心状态", "情绪来了先命名——「这是焦虑」「这是愤怒」——命名就是和它拉开距离", "写价值观清单：什么对我最重要？列出5个，按重要性排序", "做一件事前问：这和我的价值观一致吗？"],
    pitfalls: ["只在脑子里练——ACT是实践，光读不做等于没学", "把接纳当成放弃——接纳是接受感受的存在，不意味放弃行动", "追求「永远没有负面情绪」——那是不可能的，也是不必要的。健康的人不是永远开心，是能在各种情绪中保持功能"],
    icon: RiBrainLine,
  },
]

/* ============================================================
   Data — 支撑层
   ============================================================ */

const foundationLayers: LayerData[] = [
  {
    id: "body", title: "身体层", subtitle: "一切向内向外工作的生理基础",
    desc: "神经系统状态决定你能不能思考、能不能感受、能不能连接。你焦虑的时候，不只是「想法」出了问题——是心率在变、肌肉在收紧、皮质醇在飙升。如果神经系统处于战斗/逃跑/冻结状态，斯多葛和加缪都进不去。先让身体回到安全模式，理性的向内工具才有效。",
    books: "《身体从未忘记》范德考克 | 多重迷走神经理论（波吉斯）",
    principles: ["身体先于理性：紧张时先调整身体（呼吸、肌肉），再调整想法", "神经系统自动判断安全/危险——你无法用语言说服它，但可以用身体信号告诉它", "睡眠、运动、饮食是底线——这三样出了问题，上面的框架全跑不动", "创伤不是记忆，是储存在身体里的生理反应——需要身体层面的工作"],
    why: "因为你的大脑是身体的一部分，不是一个独立的软件跑在硬件上。身体的状态直接决定了你能否使用任何向内或向外工具。",
    practice: ["每天一次身体扫描：从头到脚感受每个部位3分钟", "压力大时先深呼吸三次，再思考", "保持睡眠≥6h、每周运动≥3次、不吃垃圾食品——这是操作系统的最低配置", "当你情绪上来时，先感受身体：哪里紧？哪里热？——不要分析，只观察"],
    icon: RiHeartPulseLine,
  },
  {
    id: "attachment", title: "关系/依恋", subtitle: "你和别人的模式从哪来",
    desc: "你成年后在亲密关系中的反应——为什么被冷落时会疯狂发消息、为什么有人靠近时你想逃跑——很多源头在你还没学会说话的时候就定型了。安全型、焦虑型、回避型、混乱型，这四种依恋模式像操作系统里的底层驱动，自动运行，你不注意就看不到它。",
    books: "《依恋》阿米尔·莱文 | 客体关系理论（克莱因、温尼科特）",
    principles: ["依恋模式不是性格缺陷，是早期适应的遗留——你小时候用它活下来了", "大多数关系冲突不是「对方不够爱你」，是依恋模式在打架", "安全型可以通过新的关系体验来建立——不是一辈子改不了", "识別自己的依恋模式是第一步——不评判，只观察"],
    why: "因为不了解依恋，就解释不了为什么有些情绪反复出现、理性和意志力完全管不住。那个三岁小孩还在你心里，他/她需要被看见，而不是被说服。",
    practice: ["观察你在一段关系中的自动化反应——被冷落时会做什么？对方太亲近时会怎样？", "做依恋风格测试（网上有免费的），了解自己的模式", "和伴侣/朋友讨论彼此的模式——不是指责，是理解", "在冲突中先暂停：我现在反应的，是现在这个人，还是过去某个人？"],
    icon: RiLinksLine,
  },
  {
    id: "habit", title: "习惯/行为改变", subtitle: "知道和做到之间的鸿沟怎么跨",
    desc: "你明知该做的事没做，明知不该做的事反复做——这不是意志力问题，是行为设计问题。习惯是大脑的节能模式：提示触发惯常行为，行为带来奖励，回路自动运行。改变习惯不是靠「下决心」，而是靠重新设计提示、降低行为难度、设计即时奖励。",
    books: "《原子习惯》詹姆斯·克利尔 | 《习惯的力量》查尔斯·杜希格 | 福格行为模型",
    principles: ["行为 = 动机 + 能力 + 提示（福格模型）——三者同时具备，行为才会发生", "大多数失败不是动机不足，是行为设计得太难或者没有明确的提示", "习惯靠身份驱动——不是「我想跑步」，是「我是一个跑步的人」", "环境设计比意志力有效十倍——你想少吃零食，就别把零食放在桌上"],
    why: "因为所有向内和向外框架，最终都要落到具体的行为改变上。没有行为改变的机制，框架只是知识，变不成能力。",
    practice: ["想养成一个习惯？把提示放在显眼处，把行为做小（2分钟版本），做完立刻给自己一个奖励", "想戒掉一个习惯？把提示藏起来，增加做这件事的步骤，让做这件事不愉快", "一次性「习惯堆叠」：在已有习惯后面加新行为——「刷牙后立刻冥想1分钟」", "记录习惯追踪：不是为了一直完美，是为了看到中断后能更快回来"],
    icon: RiLoopLeftLine,
  },
  {
    id: "humanity", title: "人性层", subtitle: "向外和向内的共同地基",
    desc: "「人是什么样的」这个问题，是所有向外框架和向内传统的前提。不了解人性，向外工具会产生错误的预测（忘了人会恐惧、会嫉妒、会被故事驱动），向内工具会变成死板的教条（把情感压抑当成修行）。五个基本设定：趋乐避苦、社会动物、追问意义、自我意识、有限性——古今中外所有关于人的严肃思考，都绕不开这五点。",
    books: "所有向外和向内框架的共同地基——不是一个独立的学科，是所有学科的交汇点",
    principles: ["趋乐避苦：人会靠近快乐远离痛苦——这是所有经济激励、政治权力、军事奖惩的基础", "社会动物：人需要关系又怕关系——孤独会激活和身体疼痛一样的脑区", "追问意义：猫吃饱了晒太阳，人吃饱了问「然后呢」——这是空虚的根源，也是创造力的起点", "自我意识：人能把自己当对象看——这是向内能力的基础。你不是你的情绪，你能观察自己在思考", "有限且知道有限：人会死，知道会死。这不是bug，是海德格尔说的「最本己的可能性」"],
    why: "因为不了解人性，就不知道自己在对抗什么、在顺应什么。向外的失败往往来自对人性过于乐观的假设，向内的失败往往来自对人性的否认和压抑。",
    practice: ["每次冲突后问自己：ta在追逐什么、逃避什么？我在追逐什么、逃避什么？", "观察自己的自动化反应——不是评判对错，是看清自己的出厂设置", "读一本演化心理学或行为经济学的书——了解人类大脑的原始操作系统", "对比不同文化下的人性表现——什么是不变的，什么是被文化塑造的"],
    icon: RiDnaLine,
  },
  {
    id: "judge", title: "判断层", subtitle: "这件事我能改变结果吗？",
    desc: "判断层是整个框架的操作中枢。一件事来了，先停一秒——定方向。能改变结果 → 向外框架，去搞定。不能改变结果 → 向内框架，来接住。能影响一部分 → 向外做能做的部分，向内接住剩下的。这看起来简单，实际上是整个系统里最难的一步——人在情绪中容易误判：把能改变的当成不能改变的然后放弃，把不能改变的当成能改变的然后死磕。判断力不是读出来的，是在一次次的误判和校正中练出来的。",
    books: "——没有专门的书，但斯多葛的「控制二分法」和认知行为疗法的「问题解决 vs 接纳」都提供了操作框架",
    principles: ["先判断再行动：不要在还没想清楚「这件事我能改变吗」之前就冲进去", "能改变 → 经政哲军：分析利益、评估力量、追问本质、执行方案", "不能改变 → 斯佛道存儒心：接纳可以接纳的、放下可以放下的、选择可以选择的", "灰色地带 → 一边动手做事，一边让自己放下对结果的执着", "判断力通过复盘提升——每天睡前拿一件事过一遍：「我当时该用向外还是向内？用对了吗？」"],
    why: "因为大部分人的痛苦来自用错工具：在该向外用力的时候向内退缩，在该向内接纳的时候向外死磕。判断层帮你切换，切换对了，后面的事就简单了。",
    practice: ["每天睡前复盘一件事：该向外还是向内？用对了吗？", "遇到事情先停顿3秒，问自己：「这件事我能改变吗？」", "每个月初对自己的人生做一个判断：哪些事需要去搞，哪些事需要接住", "把判断结果写下来——一个月后回看，看看你当时的判断准不准"],
    icon: RiCompass3Line,
  },
  {
    id: "narrative", title: "叙事/故事", subtitle: "你对自己讲了什么故事？",
    desc: "你对一件事情的体验，不是由事情本身决定的，是由你怎么讲这个故事决定的。同样的经历——被裁了、失恋了、失败了——在不同的人那里产生截然不同的影响，不是因为有些人向内修得好，是因为他们给自己讲了一个不同的故事：这不是终点，是转折点；这不是失去，是腾出空间。叙事不是改变事实，也不是接受事实，是重新框定事实的意义——它是介于向外和向内之间的第三条路。",
    books: "《也许你该找个人聊聊》洛莉·戈特利布 | 叙事疗法（迈克尔·怀特）| 框架效应（卡尼曼）",
    principles: ["你不是你的经历——你是你对经历的解读。改变叙事就改变了体验", "同一个事实可以用无数种方式讲述——选择对你最有建设性的那个版本", "关键不是扭曲事实，是找到事实中你没有注意到的面向", "问题不是人，问题是问题——把问题和人分开，就有了改变的空间"],
    why: "因为很多「心理问题」其实是叙事问题。你不是抑郁的、焦虑的、失败的人——你是正在经历困难和挑战的人。这个叙事的转换，就是改变的开始。",
    practice: ["把你当下最困扰的一件事写下来，然后用另一个人的视角（比如你最好的朋友）重新写一遍", "注意你常用的叙事句式：「我总是…」「我永远…」「我这辈子…」——这些是绝对化叙事，它们说了谎", "做一次「重写练习」：把你人生中最难的一段经历写出来，然后试着找到这段经历带给你的力量", "每周写一个「胜利故事」——这周你做对了什么，不管多小"],
    icon: RiBookletLine,
  },
  {
    id: "stage", title: "发展阶段", subtitle: "你在人生的哪个阶段？",
    desc: "你的框架假设所有人在所有阶段用同一套工具，实际上不是。二十岁要建立身份，三十岁要建立亲密关系和事业根基，四十岁要面对意义的重新审视，五十岁后要面对衰退与整合。用错阶段的工具会陷入特殊的空虚——比如前半生很成功的人在后半生突然崩了，因为他一直在用向外四思维往前冲，不知道什么时候该停下来向内看。",
    books: "《为什么长大》苏珊·奈曼 | 成人发展理论（凯根）| 人生阶段理论（埃里克森）| 中年转变（荣格）",
    principles: ["每个阶段有核心任务和核心危机——知道你在哪个阶段，才知道该用什么工具", "前半生建立自我（向外），后半生整合阴影与自性化（向内）——荣格说，前半生的成功不保证后半生的幸福", "身份危机不是病，是成长的必经阶段——埃里克森把人生分为八阶段，每个阶段都有一个要解决的危机", "不是年龄决定了你在哪个阶段，是你面对的问题决定了你的阶段"],
    why: "很多人不是「有病」，是阶段任务没完成。二十岁的人迷茫不是抑郁症，是需要建立身份。五十岁的人空虚不是没追求，是需要从向外转成向内——方向错了，越努力越痛苦。",
    practice: ["写下你当前人生阶段的三个核心任务——什么最重要？什么已经完成了？什么还没开始？", "每五年回顾一次：你现在的身份、关系、价值观和五年前有什么不一样？", "注意「阶段跳跃」——有些人被生活逼着过早承担成年人的角色，有些阶段没走过的会在以后冒出来", "和比你大十年、小十年的人聊天——了解不同阶段的人在关心什么问题"],
    icon: RiSeedlingLine,
  },
  {
    id: "shadow", title: "阴影/非理性", subtitle: "你身上你不知道的那部分",
    desc: "你会莫名其妙讨厌一个人，尽管他不碍你什么事。你会在关键时刻搞砸，尽管你完全有能力做好。你会反复进入同样类型的破坏性关系，尽管上一次的教训还在疼。这些不是因为你向内修得不够，是因为有一个你不知道的部分在后台运行。荣格叫它「阴影」——所有被你压抑的、否认的、不敢承认的特质：攻击性、脆弱、自私、性欲、嫉妒。你越压抑它们，它们越从暗处控制你。",
    books: "《荣格自传》 | 移情理论（弗洛伊德）| 《我们内心的冲突》卡伦·霍妮",
    principles: ["你最讨厌别人的那个点，往往指向你自己被压抑的部分（投射）", "被压抑的东西不会消失，会在你意想不到的地方冒出来——梦、口误、情绪失控", "阴影不全是负面的——被你压抑的也可能是你的创造力、愤怒的力量、性的活力", "整合阴影不是「变坏」，是承认它们存在，然后在阳光下和它们共处"],
    why: "因为不了解阴影，你就理解不了自己那些「莫名其妙」的反应。你会以为那些是外界的问题，或者自己「有病」。不是的。是你有一部分自己还没被看到。",
    practice: ["注意你最讨厌别人的三种特质——然后问自己：我在什么时候也表现过这些？", "记录你的梦——梦里那些让你害怕、厌恶的形象，往往是你阴影的显现", "在安全的关系里谈论你的「不那么光彩」的感受——说出来，阴影就在阳光下变小了", "注意你的「slips」——说错话、忘记重要的事、关键时刻掉链子——这可能不是粗心，是阴影在表达"],
    icon: RiMoonLine,
  },
  {
    id: "collective", title: "集体/仪式", subtitle: "有些痛苦只能在群体中修复",
    desc: "人是群居动物。几万年来，人类处理焦虑、空虚、孤独的主要方式不是个人修行，是集体仪式——葬礼让你面对死亡不崩解，节日让一群人在同一天做同一件事暂时摆脱孤独，宗教让整个社群共享一套意义系统。现代社会把这些集体仪式拆掉了，然后把责任压到个人身上——你要自己找到意义、自己管理情绪、自己面对一切。向内框架是这个时代的产物：当集体仪式消失，人只能靠自己。但靠自己是有上限的。",
    books: "《独自打保龄》帕特南 | 集体无意识与原型（荣格）| 仪式研究（范·热内普、特纳）| 集体创伤与修复（朱迪思·赫尔曼）",
    principles: ["人不是设计来独自面对一切的——集体仪式是进化塑造的心理技术", "归属感不是奢侈品，是心理健康的必需品——孤独对身体的伤害相当于每天抽15支烟", "现代社会用「每个人对自己负责」替代了集体互助——这不是解放，是另一种负担", "重建社群不是怀旧，是找到了这个时代缺失的心理基础设施"],
    why: "因为你的向内框架再好，有些痛苦也超出了个人处理的能力范围。不要独自扛。找到一个不需要证明什么的群体——每周至少去一次。",
    practice: ["找到一个不需要证明自己的群体（读书会、运动队、兴趣小组、宗教团体），一周至少去一次", "在家庭或朋友中建立一个小型「仪式」——每周一起吃一顿饭，每年一起做一件事", "当你在痛苦中时，不要一个人消化——至少告诉一个人你的真实感受", "参加一个集体活动：合唱、舞蹈、志愿者——让身体在集体中找到节奏"],
    icon: RiTeamLine,
  },
  {
    id: "play", title: "游戏/玩", subtitle: "做一件事不因为它有用，只因为它有意思",
    desc: "人在玩的时候不问意义。孩子追蝴蝶、大人打球、一群人喝酒吹牛——这些时刻不解决任何问题，但人在这些时刻最不焦虑、最不空虚、最不孤独。玩的本质是做一件事不因为它有用，只因为它有意思。如果整个框架（包括向外和向内）都在追求「有用」的维度，玩就是在有用之外保留的空间——在这个空间里，你不必解决问题，不必安顿内心，你只需要沉浸。",
    books: "《游戏的人》赫伊津哈 | 心流理论（契克森米哈赖）| 过渡性空间（温尼科特）",
    principles: ["玩是文化的基础——文明本身起源于游戏，不是功利的算计", "心流是玩的高级形态：完全沉浸在当下，自我暂时消失，时间感消失", "玩不是工作的对立面——最有效的创造往往发生在玩的状态中", "不会玩的人，向外（僵硬地执行）和向内（死板地反思）都会出问题"],
    why: "因为如果你的操作系统只有「解决问题」和「接受现实」两种模式，你会把自己活成一个项目。玩是第三种模式——它提醒你，你不是一个需要持续优化的产品。",
    practice: ["每周至少做一件纯粹因为好玩而做的事——不拍照、不发朋友圈、不总结收获", "把工作和学习游戏化——设挑战、做尝试、允许出错", "和小孩一起玩一次——不是教他们，是学他们", "问自己：我上一次纯粹因为好玩做一件事是什么时候？如果很久了，这周末就去"],
    icon: RiGamepadLine,
  },
  {
    id: "love", title: "爱", subtitle: "所有框架之上的力量",
    desc: "爱不是依恋模式的重复，不是利益计算，不是关系中的位置博弈。爱是你愿意让另一个人的幸福成为你幸福的一部分，不求回报。为什么爱是框架的顶部维度？因为爱能做到向外和向内都做不到的事——向外靠利益驱动，利益耗尽了行动就停了；向内靠意志修炼，意志耗尽了修炼就停了。爱不需要消耗，爱本身就是燃料。一个人为所爱的人做事，不计成本收益。一个人被爱着，不需要斯多葛的接纳也能面对不可控。框架如果不给爱留一个位置，就等于假设人是孤立个体在面对世界和面对自己。但事实上，人最深层的体验——无论向内还是向外——往往发生在爱里。",
    books: "《爱的艺术》弗洛姆 | 四种爱（C.S.刘易斯）| EFT情绪聚焦疗法（苏·约翰逊）",
    principles: ["爱不是感觉，是能力——弗洛姆说，爱需要纪律、专注、耐心和信心", "爱不是被爱的问题，是去爱的问题——主动的爱比被动的被爱更有力量", "爱有多种形式：亲情之爱（storge）、友谊之爱（philia）、浪漫之爱（eros）、无条件之爱（agape）", "成年人的爱是依恋的延续，但不只是依恋创伤的重复——亲密关系可以是修复的场所"],
    why: "因为如果一切工具都失效了——向外搞不定，向内接不住——爱还在。不是因为你特别厉害，是因为你心里还有在乎的人。",
    practice: ["今天对一个你在乎的人做一件不求回报的事——不说出来，就做", "写一封不必寄出的信，写给一个你爱的人——不要修改，不要追求表达完美", "练习「爱的注意力」——完全专注地听一个人说话，不打断，不想着怎么回复", "每周至少一次和朋友/家人在一起，不做任何「有用」的事——就是在一起"],
    icon: RiHeartLine,
  },
  {
    id: "aesthetic", title: "审美/超越", subtitle: "理性之外的治愈——留给不可言说",
    desc: "人看到壮丽的自然景观，空虚暂时消失——这不是向内也不是向外。人听到一段音乐被击中，不知为什么流泪。人在某个瞬间突然觉得「一切都是对的」——这些时刻超越了框架的分界，也超越了理性的理解范围。这是最不该被忽略的维度。因为历史上真正治愈人的，往往不是哲学体系和修行方法，而是一首诗、一段旋律、一片夕阳、一个拥抱。在框架的最外层，要留一个位置给不可言说的东西。",
    books: "什么都别读了。去听一首曲子，去公园散步，去美术馆发呆。",
    principles: ["美不需要解释——解释了反而破坏了体验", "超越不是宗教体验，是「自我感」暂时消失的感受——完全沉浸在当下", "艺术、自然、音乐、沉默——这些不是逃避，是另一种形式的「知道」", "在框架的最外面留白——有些东西无法被建模，但它们是真实的"],
    why: "因为如果你的生活可以完全被框架解释和覆盖，那你的生活就太窄了。框架之外的东西——美、神秘、不可言说——不是系统的bug，是生活本身。",
    practice: ["每天花5分钟看窗外——不是思考，只是看", "每周听一首从未听过的曲子——不分析，不评价", "每月去一次自然里——不要拍照，不要发朋友圈", "在房间的角落留一些好看的无用之物——它们存在的唯一理由是美"],
    icon: RiStarLine,
  },
]

/* ============================================================
   Data — 操作手册
   ============================================================ */

const metaItems: MetaData[] = [
  {
    id: "forbidden", title: "禁止清单", subtitle: "刻在系统底层的八条绝对不做的事",
    items: [
      { title: "情绪高峰不做重大决定", desc: "愤怒、狂喜、恐惧、绝望时的大脑不是你的大脑。这些状态下前额叶皮层被杏仁核劫持，你做决定的「理性」部分是半关闭的。等至少24小时再做决定——大多数让你后悔的事都是在情绪高峰决定的。" },
      { title: "深夜不反刍", desc: "晚上11点后脑子想的问题，90%在白天看起来没那么真实。深夜是大脑的「灾难化实验室」——一切看起来都更坏、更不可挽回。设立铁律：11点后不琢磨任何人生大事。睡觉。明天再说。" },
      { title: "不用向外工具处理向内问题", desc: "焦虑不是效率问题，不是多做一个计划就能解决的。空虚不是目标不够大，不是你再加一个目标就好了。在内心痛苦时制定更多计划和目标，只会加剧痛苦——因为你在用错误的工具。" },
      { title: "不用向内当作逃避向外的借口", desc: "「放下」「随缘」「无为」不能用来解释为什么你不敢争取、不敢面对、不敢承担责任。真正的放下是全力以赴后的释然，不是还没出发就放弃了。" },
      { title: "不自欺", desc: "对自己说谎是所有谎言里最贵的。你可以不跟别人说真话，但你跟自己说过的每一个谎，迟早要还——以焦虑的形式、以空虚的形式、以失眠的形式、以你在身体里卡住的感觉。" },
      { title: "不因害怕别人的反应而不做该做的事", desc: "该说的话不说、该设的边界不设、该走的关系不走——这些账不是在省钱，是在攒债。攒够了就变成对自己生活的怨恨，以及一种说不清的疲惫。" },
      { title: "不比较", desc: "你不知道别人付出了什么代价，也不知道别人承受着什么痛苦。你拿你的幕后（24小时不间断播放）比别人的高光剪辑（精心挑选的片段），这个比较从一开始就输了。" },
      { title: "不放弃身体", desc: "无论发生什么——睡眠、运动、饮食三种底线不能同时放弃。可以松一条（特别难的时候），但不能全松。全松的信号是：你不再在意自己了。这是需要求助的信号。" },
    ],
    icon: RiForbidLine,
  },
  {
    id: "crisis", title: "危机模式", subtitle: "崩溃时不思考，照着做就行",
    items: [
      { title: "前三天原则：不决定、不死扛、不独处", desc: "前三天你的大脑处于应激状态，前额叶功能受损。不决定：不做任何重大人生决定（辞职、分手、搬家）。不死扛：允许自己躺着、哭、什么都不做——这不是软弱，是神经系统在自我修复。不独处：身边要有信任的人，不一定聊天，但不要一个人——一个人时大脑默认最坏可能性。" },
      { title: "只做五件事", desc: "危机期间不想「该做什么」，只做五件：按时吃饭（哪怕不饿）、按时睡觉（哪怕睡不着，躺着也算）、走一段路（不管多短，身体要动）、对一个人说真实的感受（不说「我没事」）、不借酒/药/屏幕逃避（至少前三天）。" },
      { title: "三天后启动恢复", desc: "三天过后启动恢复模式：画出「我能控制的」和「我不能控制的」之间的线；判断有什么需要哀悼的东西就哀悼它——失去是真实的，不跳过；找一个人帮忙——不一定是专业人士，但得是能听、不急着给建议的人；恢复日常节奏的第一个元素——哪怕只是早上那一分钟的呼吸。一个锚点就够了。" },
    ],
    icon: RiAlarmWarningLine,
  },
  {
    id: "rhythm", title: "日常节奏", subtitle: "早晚各5分钟，每周30分钟维护",
    items: [
      { title: "早晨5分钟开机", desc: "不刷手机。1min身体扫描（注意力扫一遍身体——哪紧？只观察不调整）→ 2min今日预判（今天哪件事「能改变」准备向外，哪件事「不能改变」提前接住）→ 1min设定一个意图关键词（不是任务清单，是一种状态，如「稳」「松」「直接」）→ 1min身体激活（站起来伸展深呼吸三次）。" },
      { title: "晚间5分钟关机", desc: "不看手机。3min一件事复盘（今天发生的一件事——过人性层、判断层、改进点）→ 1min可控/不可控清单（今天放不下的事写下来，画一条线，左边可控明天做，右边不可控不再想）→ 1min呼吸收尾（数10次呼吸引，放下所有东西）。" },
      { title: "每周30分钟维护", desc: "固定一个时间：5min财务（这周花了多少，有没有超出预算）→ 5min身体（睡够了吗，动了吗，吃了多少垃圾）→ 5min关系（对谁不够耐心，需要对谁表示谢意）→ 10min回顾（本周最重要三件事，下周最重要的事）→ 5min「不做什么」（下周有什么可以拒绝的）。" },
    ],
    icon: RiTimeLine,
  },
  {
    id: "resource", title: "资源管理", subtitle: "操作系统的硬件——钱、时间、健康",
    items: [
      { title: "钱的三条底线", desc: "紧急金：存够3-6个月生活费放活期不动——危机中的决策质量最差，这笔钱买的就是「不用急着决定」。收支比：月花销不超过收入的70%，剩余30%分三份（10%应急金、10%长期储蓄、10%自我投资）。无坏债：只欠生产性债务（房贷、教育贷），不欠消费贷——利息超过通胀率的债就是坏债。" },
      { title: "时间的三个黑洞", desc: "手机：每天至少一个小时手机不在同一间屋子里，睡前一小时屏幕关掉。碎片切换：每天至少有一段连续90分钟不被打断的时间——关通知、关邮件、只做一件事。烂会议/烂社交：能拒绝的拒绝，必须去的带着自己的事去——表面在听，脑子里做自己的梳理。" },
      { title: "健康的三条最低标准", desc: "睡眠：每天不少于6小时，起床时间固定（不固定起床时间是睡眠质量的杀手，周末补觉补不回来）。运动：每周至少3次，每次至少20分钟，心率要上去——不需要健身房，快走爬楼梯跳绳都行，做什么都比不做好。饮食：不喝含糖饮料，每天至少一顿有蔬菜——两条够了，多了做不到，先控糖再加菜。" },
    ],
    icon: RiCoinsLine,
  },
  {
    id: "exit", title: "退出键", subtitle: "能关掉的系统才是好系统",
    items: [
      { title: "每天退出一次", desc: "至少有一段时间不用框架——吃饭不看手机就是吃饭，走路不思考就是走路。不是为了「活在当下」，是为了不做任何分析。" },
      { title: "每周退出半天", desc: "不计划、不分析、不优化。可以散步、可以发呆、可以和喜欢的人一起浪费一个下午，可以一个人去看电影什么都不想。" },
      { title: "每月退出一次", desc: "一次自然接触——山、海、公园、哪怕爬个楼顶看日落。不拍照、不用脑、就在那里。不是思维导图里的「自然接触」，是你真的去了。" },
    ],
    icon: RiShutDownLine,
  },
  {
    id: "mourning", title: "哀悼/丧失", subtitle: "有些东西不能被解决，只能被哀悼",
    items: [
      { title: "哀悼不是情绪问题", desc: "哀悼不是焦虑，不是空虚，不是孤独——虽然它可能带着所有三个。哀悼是人类特有的能力：承认失去了什么，哀悼它，然后带着缺憾继续活。这个过程不能被跳跃，不能被升华，不能被任何哲学或修行替代。" },
      { title: "哀悼不能被「接纳」跳过", desc: "斯多葛教你接受不能改变的，佛教教你放下执取——但哀悼不一样。你失去了一件事、一个人、一段关系、一种可能性，这个失是真实的。用向内框架跳过哀悼，代价是某个地方开始麻木。" },
      { title: "健康的哀悼", desc: "哀悼不是一直沉浸在痛苦里。弗洛伊德区分了哀悼和忧郁：哀悼是健康的——慢慢把投注在丧失对象上的情感收回来，过程可能很长，但方向是「走出来」。忧郁是不健康的——不承认丧失了，把对丧失对象的愤怒转向自己，变成了自我批评和自我厌恶。" },
    ],
    icon: RiCandleLine,
  },
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
                        <span className="text-primary shrink-0">•</span>{li.title}
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
    const isTool = item.concepts !== undefined
    const isLayer = item.principles !== undefined
    const isMeta = item.items !== undefined && typeof item.items[0] === "object"

    return (
      <div className="animate-fade-in space-y-6 max-w-3xl">
        {/* Header */}
        <div className="bg-card border rounded-xl p-6">
          {Icon && <Icon size={32} className="text-primary mb-3" />}
          <h3 className="text-xl font-bold">{item.full || item.title}</h3>
          {item.subtitle && <p className="text-sm text-primary font-medium mt-0.5">{item.subtitle}</p>}
          {item.core && <p className="text-sm text-primary font-medium mt-0.5">{item.core}</p>}
          <Separator className="my-3" />
          {item.question && <p className="text-sm mb-2"><strong className="text-foreground">核心追问：</strong>{item.question}</p>}
          <p className="text-sm text-muted-foreground">{item.desc}</p>
          {item.books && <div className="bg-muted rounded-lg p-3 text-xs mt-3"><strong className="text-foreground">代表作品：</strong>{item.books}</div>}
        </div>

        {/* Tool: 核心概念 + 使用场景 + 如何训练 + 常见误区 */}
        {isTool && (
          <>
            <div className="bg-card border rounded-xl p-6">
              <h4 className="font-bold text-sm mb-3">核心概念</h4>
              <ul className="space-y-2">
                {item.concepts.map((c: string, i: number) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{i + 1}</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card border rounded-xl p-6">
              <h4 className="font-bold text-sm mb-3">使用场景</h4>
              <ul className="space-y-2">
                {item.scenarios.map((s: string, i: number) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary shrink-0 mt-0.5">▸</span> {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card border rounded-xl p-6">
              <h4 className="font-bold text-sm mb-3">如何训练</h4>
              <ul className="space-y-2">
                {item.training.map((t: string, i: number) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary shrink-0 mt-0.5">▸</span> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card border rounded-xl p-6">
              <h4 className="font-bold text-sm mb-3 text-destructive">常见误区</h4>
              <ul className="space-y-2">
                {item.pitfalls.map((p: string, i: number) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-destructive shrink-0 mt-0.5">⚠</span> {p}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {/* Layer: 核心原则 + 为什么重要 + 实操建议 */}
        {isLayer && (
          <>
            <div className="bg-card border rounded-xl p-6">
              <h4 className="font-bold text-sm mb-3">核心原则</h4>
              <ul className="space-y-2">
                {item.principles.map((p: string, i: number) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{i + 1}</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card border rounded-xl p-6">
              <h4 className="font-bold text-sm mb-2">为什么重要</h4>
              <p className="text-sm text-muted-foreground">{item.why}</p>
            </div>
            <div className="bg-card border rounded-xl p-6">
              <h4 className="font-bold text-sm mb-3">实操建议</h4>
              <ul className="space-y-2">
                {item.practice.map((p: string, i: number) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary shrink-0 mt-0.5">▸</span> {p}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {/* Meta: 条目列表（标题 + 描述） */}
        {isMeta && (
          <div className="bg-card border rounded-xl p-6">
            <h4 className="font-bold text-sm mb-4">详细说明</h4>
            <ul className="space-y-4">
              {item.items.map((li: { title: string; desc: string }, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                  <div>
                    <h5 className="text-sm font-medium text-foreground">{li.title}</h5>
                    <p className="text-sm text-muted-foreground mt-0.5">{li.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
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
