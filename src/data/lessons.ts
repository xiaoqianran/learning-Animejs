export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explain: string;
};

export type DemoKind =
  | "hello"
  | "targets"
  | "props"
  | "timing"
  | "easing"
  | "transform"
  | "timeline"
  | "stagger"
  | "keyframes"
  | "loop"
  | "controls"
  | "callbacks"
  | "svg-draw"
  | "svg-morph"
  | "text-split"
  | "scroll"
  | "spring"
  | "draggable"
  | "layout"
  | "micro-ui"
  | "page-trans"
  | "performance"
  | "waapi"
  | "utils";

export type LessonBlock =
  | { type: "text"; title?: string; body: string }
  | { type: "code"; title?: string; lang?: string; code: string }
  | { type: "tip"; body: string }
  | { type: "demo"; kind: DemoKind; title: string; hint?: string }
  | { type: "quiz"; questions: QuizQuestion[] };

export type Lesson = {
  slug: string;
  title: string;
  summary: string;
  level: "入门" | "进阶" | "实战";
  track: "基础" | "时间线" | "视觉特效" | "交互" | "实战" | "进阶模式";
  format?: "course" | "reference";
  minutes: number;
  official?: string;
  blocks: LessonBlock[];
};

export const TRACKS: Lesson["track"][] = [
  "基础",
  "时间线",
  "视觉特效",
  "交互",
  "实战",
  "进阶模式",
];

export const LESSONS: Lesson[] = [
  {
    slug: "intro",
    title: "Anime.js 是什么",
    summary: "轻量多用途动画引擎：CSS / SVG / DOM / JS 对象都能动。",
    level: "入门",
    track: "基础",
    minutes: 6,
    official: "https://animejs.com/documentation/",
    blocks: [
      {
        type: "text",
        title: "一句话",
        body: "Anime.js 是一个快速、轻量的 JavaScript 动画库。v4 以 animate / createTimeline / stagger 等模块化 API 为核心，既适合按钮微交互，也适合复杂编排。\n\n学习方法：先读「对应源码」，再点 Demo 播放 — 源码里的参数就是 Demo 里动起来的原因。",
      },
      {
        type: "code",
        title: "对应源码 · Hello Anime",
        lang: "js",
        code: `import { animate } from 'animejs'

animate('.box', {
  translateX: 160,
  duration: 800,
  ease: 'out(3)',
})`,
      },
      {
        type: "demo",
        kind: "hello",
        title: "动手：第一个动画",
        hint: "点击播放，方块水平滑出并带回弹感。",
      },
      {
        type: "tip",
        body: "本站基于 Anime.js v4（import { animate } from 'animejs'）。网上旧教程里的 anime({...}) 是 v3 写法，参数名也有差异（如 easing → ease）。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "i1",
            question: "Anime.js v4 创建动画的推荐入口是？",
            options: ["anime({...})", "animate(targets, params)", "gsap.to()", "requestAnimationFrame 手写"],
            answer: 1,
            explain: "v4 导出 animate；v3 的 anime() 全局函数已不是主 API。",
          },
          {
            id: "i2",
            question: "Anime.js 可以动画哪些目标？",
            options: ["只能 CSS", "只能 SVG", "CSS / SVG / DOM 属性 / JS 对象", "只能 Canvas"],
            answer: 2,
            explain: "多目标类型是它的核心卖点。",
          },
        ],
      },
    ],
  },
  {
    slug: "targets",
    title: "选择目标 Targets",
    summary: "CSS 选择器、DOM 节点、NodeList、数组、JS 对象都能作为 targets。",
    level: "入门",
    track: "基础",
    minutes: 7,
    blocks: [
      {
        type: "text",
        title: "传什么给 animate",
        body: "第一个参数是 targets：\n• CSS 选择器字符串 '.dot'\n• 单个 Element\n• NodeList / HTMLCollection / 数组\n• 普通 JS 对象（动画数值，配合 onUpdate 写到 UI）\n\n多目标时，默认会同时开启动画；结合 stagger 可错开。",
      },
      {
        type: "code",
        title: "对应源码 · 多目标",
        lang: "js",
        code: `import { animate, stagger } from 'animejs'

animate('.dot', {
  scale: [0.4, 1],
  opacity: [0.3, 1],
  delay: stagger(80),
  duration: 600,
  ease: 'outBack',
})`,
      },
      {
        type: "demo",
        kind: "targets",
        title: "动手：一排圆点",
        hint: "同一选择器选中多个元素，配合 stagger 依次弹出。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "t1",
            question: "要对一组 .card 做动画，最常见写法是？",
            options: ["animate('.card', {...})", "animate(document, {...})", "只有 querySelector 单节点", "必须包成 Timeline"],
            answer: 0,
            explain: "选择器字符串最省事，库内部会 query 所有匹配节点。",
          },
        ],
      },
    ],
  },
  {
    slug: "properties",
    title: "可动画属性",
    summary: "CSS 变换、颜色、透明度、自定义属性与任意数值对象。",
    level: "入门",
    track: "基础",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "常见属性",
        body: "• 变换：translateX/Y/Z、rotate、scale、skew\n• 外观：opacity、backgroundColor、borderRadius、filter\n• SVG：strokeDashoffset、d（路径 morph）等\n• 对象字段：{ value: 0 } → value: 100，在 onUpdate 里同步到 DOM\n\n属性值可以是：终点数字、数组 [from, to]、带单位字符串 '80%'。",
      },
      {
        type: "code",
        title: "对应源码 · 多属性",
        lang: "js",
        code: `animate('.card', {
  translateY: [-24, 0],
  opacity: [0, 1],
  borderRadius: ['4px', '20px'],
  backgroundColor: ['#313244', '#cba6f7'],
  duration: 900,
  ease: 'out(3)',
})`,
      },
      {
        type: "demo",
        kind: "props",
        title: "动手：卡片入场",
        hint: "同时改位移、透明度、圆角与背景色。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "p1",
            question: "写法 translateX: [0, 100] 表示？",
            options: ["只设终点", "从 0 补间到 100", "随机取 0 或 100", "循环关键帧"],
            answer: 1,
            explain: "数组形式是 [from, to] 的显式起止。",
          },
        ],
      },
    ],
  },
  {
    slug: "timing",
    title: "时长 · 延迟 · 速度",
    summary: "duration / delay / playbackRate 控制节奏。",
    level: "入门",
    track: "基础",
    minutes: 7,
    blocks: [
      {
        type: "text",
        title: "节奏三件套",
        body: "• duration：整段动画毫秒数（默认约 1000）\n• delay：开始前等待\n• 全局/实例的 speed 或 playbackRate：>1 加速，<1 放慢\n\nUI 微交互通常 150–400ms；页面转场 400–800ms；展示类可到 1s+。",
      },
      {
        type: "code",
        title: "对应源码 · 延迟链",
        lang: "js",
        code: `animate('.bar', {
  scaleX: [0, 1],
  duration: 700,
  delay: 200,
  ease: 'inOut(2)',
})`,
      },
      {
        type: "demo",
        kind: "timing",
        title: "动手：进度条填充",
        hint: "延迟 200ms 后以 700ms 从左填满。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "tm1",
            question: "按钮按下反馈通常建议 duration？",
            options: ["2–3 秒", "150–300ms 量级", "必须 0", "固定 5000ms"],
            answer: 1,
            explain: "微交互要快，拖沓会感觉卡。",
          },
        ],
      },
    ],
  },
  {
    slug: "easing",
    title: "缓动 Easing",
    summary: "linear / out / spring 决定手感，是动画灵魂。",
    level: "入门",
    track: "基础",
    minutes: 9,
    blocks: [
      {
        type: "text",
        title: "怎么选 ease",
        body: "v4 使用 ease 字段（不是 v3 的 easing）：\n• 'linear'：匀速\n• 'out' / 'out(3)'：先快后慢，适合入场\n• 'in'：先慢后快，适合离场\n• 'inOut'：两端柔和\n• 'outBack' / 'outElastic'：过冲 / 弹性\n• spring(...)：物理弹簧\n\n同一位移换 ease，气质完全不同。",
      },
      {
        type: "code",
        title: "对应源码 · 对比 ease",
        lang: "js",
        code: `animate('.ball-a', { translateX: 200, duration: 900, ease: 'linear' })
animate('.ball-b', { translateX: 200, duration: 900, ease: 'out(3)' })
animate('.ball-c', { translateX: 200, duration: 900, ease: 'outElastic' })`,
      },
      {
        type: "demo",
        kind: "easing",
        title: "动手：三种手感",
        hint: "三条轨道同时跑，对比 linear / out / outElastic。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "e1",
            question: "元素「落位」到界面时，最常用的一类 ease？",
            options: ["inExpo 猛冲", "out / out(n) 减速落位", "steps 阶梯", "必须 spring"],
            answer: 1,
            explain: "出缓（ease-out）符合物体到达终点减速的直觉。",
          },
        ],
      },
    ],
  },
  {
    slug: "transform",
    title: "变换与合成层",
    summary: "优先 animate transform / opacity，少动 layout 属性。",
    level: "入门",
    track: "基础",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "性能友好属性",
        body: "优先：translate*、scale、rotate、opacity。\n慎用：top/left/width/height（触发 layout）。\n\n组合变换时直接写多个字段即可，Anime 会处理好。三维可用 rotateX + perspective。",
      },
      {
        type: "code",
        title: "对应源码 · 3D 翻转卡片",
        lang: "js",
        code: `animate('.flip', {
  rotateY: 180,
  scale: [1, 1.05, 1],
  duration: 900,
  ease: 'inOut(2)',
})`,
      },
      {
        type: "demo",
        kind: "transform",
        title: "动手：翻转 + 缩放",
        hint: "观察 rotateY 与 scale 的合成。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "tr1",
            question: "移动元素时更推荐？",
            options: ["反复改 left", "translateX / translateY", "只能用 margin", "document.write"],
            answer: 1,
            explain: "transform 通常走合成层，更流畅。",
          },
        ],
      },
    ],
  },
  {
    slug: "timeline",
    title: "时间线 Timeline",
    summary: "把多段动画排成故事板：顺序、重叠、标签。",
    level: "进阶",
    track: "时间线",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "为什么需要 Timeline",
        body: "单个 animate 适合一段动作；复杂场景要「先 A 再 B，B 与 C 重叠」。createTimeline() 返回可链式 .add() 的时间线，统一 play / pause / seek。",
      },
      {
        type: "code",
        title: "对应源码 · 三幕剧",
        lang: "js",
        code: `import { createTimeline } from 'animejs'

const tl = createTimeline({ defaults: { ease: 'out(3)' } })

tl.add('.a', { translateY: [-40, 0], opacity: [0, 1], duration: 500 })
  .add('.b', { translateY: [-40, 0], opacity: [0, 1], duration: 500 }, '-=280')
  .add('.c', { scale: [0.6, 1], opacity: [0, 1], duration: 600 }, '-=200')`,
      },
      {
        type: "demo",
        kind: "timeline",
        title: "动手：叠加入场",
        hint: "三块卡片用时间线错峰入场（负偏移重叠）。",
      },
      {
        type: "tip",
        body: "第三个参数 position：绝对时间、'+=200' 相对末尾、'-=200' 重叠、或标签名。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "tl1",
            question: "createTimeline().add(A).add(B, '-=200') 表示？",
            options: ["B 在 A 结束后 200ms", "B 比 A 结束提前 200ms 开始", "取消 B", "B 倒放"],
            answer: 1,
            explain: "'-=200' 是相对时间线当前末尾回退 200ms，制造重叠。",
          },
        ],
      },
    ],
  },
  {
    slug: "stagger",
    title: "交错 Stagger",
    summary: "列表/网格依次动起来，最常用的编排糖。",
    level: "进阶",
    track: "时间线",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "stagger 用法",
        body: "import { stagger } from 'animejs'\n\ndelay: stagger(60) — 每个目标多等 60ms\nstagger(60, { from: 'center' }) — 从中间往两边\nstagger({ grid: [4, 3], from: 'first', amount: 400 }) — 网格涟漪\n\n也可用于 duration、translateX 等数值字段制造波浪。",
      },
      {
        type: "code",
        title: "对应源码 · 网格涟漪",
        lang: "js",
        code: `import { animate, stagger } from 'animejs'

animate('.cell', {
  scale: [0.2, 1],
  opacity: [0, 1],
  delay: stagger(40, { grid: [5, 3], from: 'center' }),
  duration: 500,
  ease: 'outBack',
})`,
      },
      {
        type: "demo",
        kind: "stagger",
        title: "动手：网格涟漪",
        hint: "从中心向外弹出 5×3 格子。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "s1",
            question: "stagger 最常搭配哪个参数？",
            options: ["ease", "delay", "autoplay", "loop"],
            answer: 1,
            explain: "错开开始时间是最经典用途。",
          },
        ],
      },
    ],
  },
  {
    slug: "keyframes",
    title: "关键帧 Keyframes",
    summary: "一段动画内多段路径：弹跳、脉冲、复杂轨迹。",
    level: "进阶",
    track: "时间线",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "多段数值",
        body: "属性可写成关键帧数组或对象序列。例如 translateY: [0, -40, 0] 表示上跳再落下。配合 ease 分段能做出更自然的弹跳。",
      },
      {
        type: "code",
        title: "对应源码 · 弹跳",
        lang: "js",
        code: `animate('.orb', {
  translateY: [
    { to: -60, duration: 320, ease: 'out' },
    { to: 0, duration: 420, ease: 'in' },
  ],
  scaleX: [
    { to: 1.1, duration: 320 },
    { to: 1, duration: 420 },
  ],
})`,
      },
      {
        type: "demo",
        kind: "keyframes",
        title: "动手：弹跳球",
        hint: "上跳压扁再回弹。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "k1",
            question: "关键帧的作用是？",
            options: ["只改颜色", "在一次动画里描述多段中间状态", "替代 Timeline 的唯一方式", "关闭 GPU"],
            answer: 1,
            explain: "关键帧定义属性随时间的多段变化。",
          },
        ],
      },
    ],
  },
  {
    slug: "loop-direction",
    title: "循环与方向",
    summary: "loop / alternate / reverse 做呼吸灯与往返。",
    level: "进阶",
    track: "时间线",
    minutes: 7,
    blocks: [
      {
        type: "text",
        title: "循环模式",
        body: "• loop: true 或次数\n• alternate: true 时来回（往返）\n• reversed / direction 控制起始方向\n\n加载指示、脉冲高亮、无限装饰动效很常用。记得给「可访问性」提供减弱动效选项。",
      },
      {
        type: "code",
        title: "对应源码 · 呼吸",
        lang: "js",
        code: `animate('.pulse', {
  scale: [1, 1.18],
  opacity: [0.7, 1],
  duration: 900,
  ease: 'inOut(2)',
  loop: true,
  alternate: true,
})`,
      },
      {
        type: "demo",
        kind: "loop",
        title: "动手：脉冲呼吸",
        hint: "无限往返缩放。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "l1",
            question: "alternate: true 的效果？",
            options: ["只播一次", "播完倒放再播，形成往返", "随机帧", "静音"],
            answer: 1,
            explain: "交替方向形成来回动画。",
          },
        ],
      },
    ],
  },
  {
    slug: "controls",
    title: "播放控制",
    summary: "play / pause / reverse / restart / seek 掌控实例。",
    level: "进阶",
    track: "时间线",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "实例方法",
        body: "const anim = animate(..., { autoplay: false })\n• anim.play() / pause()\n• anim.restart()\n• anim.reverse()\n• anim.seek(time) 跳到毫秒位置\n\n做预览器、滚动 scrub、手动时间轴时必备。",
      },
      {
        type: "code",
        title: "对应源码 · 手动播放",
        lang: "js",
        code: `const anim = animate('.ship', {
  translateX: 220,
  rotate: 12,
  duration: 1200,
  ease: 'inOut(2)',
  autoplay: false,
})

// 按钮：
// anim.play() / anim.pause() / anim.restart()`,
      },
      {
        type: "demo",
        kind: "controls",
        title: "动手：播放器",
        hint: "使用播放 / 暂停 / 重开控制同一实例。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "c1",
            question: "默认不想自动播时设置？",
            options: ["loop: false", "autoplay: false", "delay: Infinity", "ease: 'none'"],
            answer: 1,
            explain: "autoplay: false 后由你调用 play()。",
          },
        ],
      },
    ],
  },
  {
    slug: "callbacks",
    title: "回调与更新",
    summary: "onBegin / onUpdate / onComplete 串联业务逻辑。",
    level: "进阶",
    track: "时间线",
    minutes: 7,
    blocks: [
      {
        type: "text",
        title: "生命周期钩子",
        body: "• onBegin：开始时\n• onUpdate：每帧（读 progress / 写副作用）\n• onComplete：结束时\n• onLoop：每次循环\n\n适合同步数字计数、音效触发、状态机切换。注意 onUpdate 里别做重 DOM 查询。",
      },
      {
        type: "code",
        title: "对应源码 · 数字滚动",
        lang: "js",
        code: `const state = { n: 0 }
animate(state, {
  n: 100,
  duration: 1200,
  ease: 'out(3)',
  onUpdate: () => {
    label.textContent = Math.round(state.n) + '%'
  },
})`,
      },
      {
        type: "demo",
        kind: "callbacks",
        title: "动手：百分比计数",
        hint: "动画 JS 对象，onUpdate 写回文本。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "cb1",
            question: "动画普通对象字段时，通常配合？",
            options: ["只靠 CSS", "onUpdate 同步到 DOM", "必须 Timeline", "stagger only"],
            answer: 1,
            explain: "对象本身不会显示，需要 onUpdate 读值渲染。",
          },
        ],
      },
    ],
  },
  {
    slug: "svg-draw",
    title: "SVG 路径描边",
    summary: "createDrawable / stroke 做出手写与绘制感。",
    level: "进阶",
    track: "视觉特效",
    minutes: 9,
    blocks: [
      {
        type: "text",
        title: "描边动画思路",
        body: "经典手法：设置 stroke-dasharray 为路径长度，动画 stroke-dashoffset 从长度到 0，呈现「绘制」效果。Anime.js v4 提供 svg.createDrawable 等工具简化。",
      },
      {
        type: "code",
        title: "对应源码 · 描线",
        lang: "js",
        code: `import { animate } from 'animejs'

animate('.path', {
  strokeDashoffset: [320, 0],
  duration: 1400,
  ease: 'inOut(2)',
})`,
      },
      {
        type: "demo",
        kind: "svg-draw",
        title: "动手：路径绘制",
        hint: "SVG 路径从无到有描出。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "sd1",
            question: "路径「画出来」常用属性是？",
            options: ["fontSize", "strokeDashoffset", "zIndex", "tabIndex"],
            answer: 1,
            explain: "配合 dasharray 控制可见线段。",
          },
        ],
      },
    ],
  },
  {
    slug: "svg-morph",
    title: "SVG Morph",
    summary: "路径 d 属性变形：图标切换与流体形状。",
    level: "进阶",
    track: "视觉特效",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "形态过渡",
        body: "当两个 path 的 d 命令结构兼容时，可对 d 做补间，实现图标 A→B 的 morph。复杂图形可用专用 morph 工具。演示中用多边形近似展示形状过渡感。",
      },
      {
        type: "code",
        title: "对应源码 · 形状过渡",
        lang: "js",
        code: `animate('.blob', {
  d: [
    'M20,50 Q50,10 80,50 Q50,90 20,50',
    'M20,40 Q50,20 80,40 Q70,80 20,70 Z',
  ],
  duration: 1000,
  ease: 'inOut(2)',
})`,
      },
      {
        type: "demo",
        kind: "svg-morph",
        title: "动手：流体变形",
        hint: "观察形状在两种轮廓间插值。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "sm1",
            question: "SVG morph 主要插值的是？",
            options: ["png 像素", "path 的 d / 几何命令", "HTTP 头", "localStorage"],
            answer: 1,
            explain: "对路径数据做数值插值形成变形。",
          },
        ],
      },
    ],
  },
  {
    slug: "text-split",
    title: "文字拆分动画",
    summary: "splitText 按字符/词拆开，再 stagger 入场。",
    level: "进阶",
    track: "视觉特效",
    minutes: 9,
    blocks: [
      {
        type: "text",
        title: "标题动效",
        body: "v4 的 text.split / splitText 能把文本拆成 span。拆完后对字符做 translateY + opacity + stagger，就是常见英雄区标题动画。注意无障碍：避免关键信息不只存在于动画中。",
      },
      {
        type: "code",
        title: "对应源码 · 逐字入场",
        lang: "js",
        code: `import { animate, stagger } from 'animejs'

animate('.char', {
  translateY: ['100%', '0%'],
  opacity: [0, 1],
  delay: stagger(30),
  duration: 500,
  ease: 'out(3)',
})`,
      },
      {
        type: "demo",
        kind: "text-split",
        title: "动手：标题逐字",
        hint: "每个字符依次上浮出现。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "tx1",
            question: "逐字动画前通常要？",
            options: ["把文字拆成多个元素", "删除字体", "关闭 CSS", "只用 alert"],
            answer: 0,
            explain: "每个字符需要独立 DOM 节点才能分别动画。",
          },
        ],
      },
    ],
  },
  {
    slug: "scroll",
    title: "滚动联动",
    summary: "onScroll 将动画进度与滚动位置绑定。",
    level: "进阶",
    track: "交互",
    minutes: 9,
    blocks: [
      {
        type: "text",
        title: "Scroll Observer",
        body: "v4 提供 onScroll / ScrollObserver：元素进入视口时播放，或将动画 progress 绑定到滚动百分比（scrub）。落地页「边滚边演」常用此模式。\n\n演示用简化版：进入区域自动播放一次。",
      },
      {
        type: "code",
        title: "对应源码 · 进入视口",
        lang: "js",
        code: `import { animate, onScroll } from 'animejs'

animate('.reveal', {
  translateY: [40, 0],
  opacity: [0, 1],
  duration: 700,
  ease: 'out(3)',
  autoplay: onScroll({ target: '.reveal', sync: true }),
})`,
      },
      {
        type: "demo",
        kind: "scroll",
        title: "动手：滚动显现",
        hint: "模拟进入视口后上浮显现（点播放等价触发）。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "sc1",
            question: "滚动叙事网站常用？",
            options: ["只用 alert", "将动画与滚动进度同步", "禁用滚动条", "固定 24fps GIF"],
            answer: 1,
            explain: "scroll-linked / scrub 动画是现代落地页标配。",
          },
        ],
      },
    ],
  },
  {
    slug: "spring",
    title: "弹簧 Spring",
    summary: "物理弹簧参数：质量、刚度、阻尼 → 自然过冲。",
    level: "进阶",
    track: "交互",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "为什么像真的",
        body: "spring 缓动模拟弹簧系统，比固定 duration 的 back 更「活」。适合拖拽松手、开关、点赞粒子。参数过大可能长时间振荡 — 注意收敛。",
      },
      {
        type: "code",
        title: "对应源码 · 弹簧落位",
        lang: "js",
        code: `import { animate, spring } from 'animejs'

animate('.chip', {
  translateX: 180,
  ease: spring({ stiffness: 120, damping: 12 }),
})`,
      },
      {
        type: "demo",
        kind: "spring",
        title: "动手：弹簧滑块",
        hint: "松手般的弹性落位。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "sp1",
            question: "spring 动画的特点是？",
            options: ["永远线性", "可带物理过冲与回弹", "只能用于颜色", "不能用于 transform"],
            answer: 1,
            explain: "弹簧模型天然带来超调与回弹。",
          },
        ],
      },
    ],
  },
  {
    slug: "draggable",
    title: "拖拽 Draggable",
    summary: "createDraggable 让元素可拖，松手可吸附。",
    level: "进阶",
    track: "交互",
    minutes: 9,
    blocks: [
      {
        type: "text",
        title: "交互式运动",
        body: "v4 的 createDraggable 把指针输入映射到变换，可设容器边界、release 弹簧、回调。卡片堆、旋钮、可拖排序原型都能用。",
      },
      {
        type: "code",
        title: "对应源码 · 可拖卡片",
        lang: "js",
        code: `import { createDraggable } from 'animejs'

createDraggable('.knob', {
  container: '.pad',
  releaseEase: 'out(3)',
})`,
      },
      {
        type: "demo",
        kind: "draggable",
        title: "动手：拖我",
        hint: "按住圆点拖动；演示用简化拖拽实现同款手感。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "d1",
            question: "Draggable 主要解决？",
            options: ["服务端渲染", "指针拖拽与释放动画", "SQL 查询", "路由守卫"],
            answer: 1,
            explain: "把输入与运动结合。",
          },
        ],
      },
    ],
  },
  {
    slug: "layout-anim",
    title: "布局动画",
    summary: "列表重排、FLIP 思想与 createLayout。",
    level: "进阶",
    track: "交互",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "FLIP",
        body: "First-Last-Invert-Play：记录位置 → 更新 DOM → 计算差值反转 → 播放到 0。Anime layout 工具可简化列表重排动画。演示用打乱格子展示位移动画。",
      },
      {
        type: "code",
        title: "对应源码 · 重排",
        lang: "js",
        code: `// 伪代码：记录旧 rect → 换顺序 → animate 到新位置
animate(el, {
  translateX: [dx, 0],
  translateY: [dy, 0],
  duration: 450,
  ease: 'out(3)',
})`,
      },
      {
        type: "demo",
        kind: "layout",
        title: "动手：打乱重排",
        hint: "点击打乱，方块滑到新槽位。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "ly1",
            question: "FLIP 中的 I 是？",
            options: ["Ignore", "Invert（反转差值）", "Import", "Idle"],
            answer: 1,
            explain: "用 transform 反转差值，再 Play 回 0。",
          },
        ],
      },
    ],
  },
  {
    slug: "micro-ui",
    title: "UI 微交互",
    summary: "按钮、开关、Toast — 产品感从 100ms 里来。",
    level: "实战",
    track: "实战",
    minutes: 10,
    blocks: [
      {
        type: "text",
        title: "微交互清单",
        body: "• 按下：scale 0.96 + 阴影收\n• 成功：勾选 stroke 绘制 + 轻弹\n• 切换：滑块 spring\n• 错误：水平 shake 几次\n\n原则：快速、可打断、尊重 prefers-reduced-motion。",
      },
      {
        type: "code",
        title: "对应源码 · 按钮反馈",
        lang: "js",
        code: `animate('.btn', {
  scale: [
    { to: 0.94, duration: 80, ease: 'out' },
    { to: 1, duration: 220, ease: 'outBack' },
  ],
})`,
      },
      {
        type: "demo",
        kind: "micro-ui",
        title: "动手：按钮与抖动",
        hint: "主按钮弹压；错误按钮摇头。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "mu1",
            question: "微交互时长一般？",
            options: ["数秒级", "大约 80–300ms", "必须 0", "一分钟"],
            answer: 1,
            explain: "短促反馈，不挡操作。",
          },
        ],
      },
    ],
  },
  {
    slug: "page-trans",
    title: "页面 / 视图转场",
    summary: "路由切换时的离场与入场编排。",
    level: "实战",
    track: "实战",
    minutes: 9,
    blocks: [
      {
        type: "text",
        title: "转场模式",
        body: "常见：旧视图下沉淡出 → 新视图上浮淡入；或共享元素放大。用 Timeline 串「out 完成后再 in」，或重叠 100–200ms 更流畅。",
      },
      {
        type: "code",
        title: "对应源码 · 双页切换",
        lang: "js",
        code: `const tl = createTimeline()
tl.add('.page-a', { opacity: 0, translateY: 16, duration: 280, ease: 'in(2)' })
  .add('.page-b', { opacity: [0, 1], translateY: [16, 0], duration: 360, ease: 'out(3)' }, '-=120')`,
      },
      {
        type: "demo",
        kind: "page-trans",
        title: "动手：视图切换",
        hint: "A/B 两页交叉溶解上浮。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "pt1",
            question: "转场重叠 120ms 的好处？",
            options: ["更拖沓", "减少空窗，观感更连", "必须卡顿", "破坏 Timeline"],
            answer: 1,
            explain: "轻微重叠避免中间空白帧。",
          },
        ],
      },
    ],
  },
  {
    slug: "performance",
    title: "性能与可访问性",
    summary: "少触发 layout、控制并发、尊重减弱动效。",
    level: "实战",
    track: "实战",
    minutes: 8,
    blocks: [
      {
        type: "text",
        title: "清单",
        body: "1. 优先 transform/opacity\n2. 避免在 onUpdate 里读 layout（offsetHeight）\n3. 离屏暂停；路由卸载时 pause/cancel\n4. matchMedia('(prefers-reduced-motion: reduce)') 时缩短或跳过\n5. 同屏动画数量有预算，列表用 stagger 而非每人独立重计算",
      },
      {
        type: "code",
        title: "对应源码 · 减弱动效",
        lang: "js",
        code: `const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
animate('.hero', {
  opacity: [0, 1],
  translateY: reduce ? 0 : [24, 0],
  duration: reduce ? 0 : 600,
})`,
      },
      {
        type: "demo",
        kind: "performance",
        title: "动手：批量与轻量",
        hint: "对比「只动 transform」的流畅批次。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "pf1",
            question: "prefers-reduced-motion: reduce 时应？",
            options: ["动画加倍", "缩短或关闭非必要动画", "强制 3D", "忽略"],
            answer: 1,
            explain: "尊重系统无障碍偏好。",
          },
        ],
      },
    ],
  },
  {
    slug: "waapi",
    title: "WAAPI 互通",
    summary: "Web Animations API 与 Anime.js 的分工。",
    level: "进阶",
    track: "进阶模式",
    minutes: 8,
    format: "reference",
    blocks: [
      {
        type: "text",
        title: "何时用原生",
        body: "浏览器原生 element.animate()（WAAPI）可被 DevTools 检查，部分场景更轻。Anime v4 也暴露 waapi 相关能力。复杂时间线、SVG、弹簧仍是 Anime 强项；简单 CSS 属性可考虑 WAAPI 或纯 CSS。",
      },
      {
        type: "code",
        title: "对应源码 · 对照",
        lang: "js",
        code: `// WAAPI
el.animate(
  [{ transform: 'translateX(0)' }, { transform: 'translateX(120px)' }],
  { duration: 600, easing: 'ease-out', fill: 'forwards' },
)

// Anime.js
animate(el, { translateX: 120, duration: 600, ease: 'out' })`,
      },
      {
        type: "demo",
        kind: "waapi",
        title: "动手：同样位移",
        hint: "Anime 版本实现同等效果。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "w1",
            question: "WAAPI 是？",
            options: ["数据库", "浏览器原生 Web Animations API", "Vue 插件", "打包器"],
            answer: 1,
            explain: "原生动画 API。",
          },
        ],
      },
    ],
  },
  {
    slug: "utils",
    title: "工具函数 Utils",
    summary: "stagger、random、clamp、lerp、engine 调速。",
    level: "进阶",
    track: "进阶模式",
    minutes: 7,
    format: "reference",
    blocks: [
      {
        type: "text",
        title: "常备工具",
        body: "• stagger / random / randomPick / shuffle\n• clamp / lerp / mapRange / snap\n• engine.speed 全局加速（调试神器）\n• utils.set / get 读写目标属性\n\n做生成感、游戏 juice、数据可视化补间时很香。",
      },
      {
        type: "code",
        title: "对应源码 · 随机散开",
        lang: "js",
        code: `import { animate, stagger, utils } from 'animejs'

animate('.p', {
  translateX: () => utils.random(-80, 80),
  translateY: () => utils.random(-40, 40),
  scale: [0, 1],
  delay: stagger(20),
  duration: 600,
  ease: 'outBack',
})`,
      },
      {
        type: "demo",
        kind: "utils",
        title: "动手：粒子散开",
        hint: "每个点随机方向弹出。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "u1",
            question: "属性写成函数 () => number 通常用于？",
            options: ["语法错误", "每个目标不同终值", "关闭动画", "SSR"],
            answer: 1,
            explain: "函数式参数按目标求值，适合随机/索引相关。",
          },
        ],
      },
    ],
  },
  {
    slug: "capstone",
    title: "毕业：编排一条广告片",
    summary: "综合 timeline + stagger + 微交互 + 减弱动效。",
    level: "实战",
    track: "实战",
    minutes: 12,
    blocks: [
      {
        type: "text",
        title: "作品清单",
        body: "用本站所学拼一条 3 秒小广告：\n1. Logo 描边或缩放入场\n2. 标题逐字\n3. 三张特性卡 stagger\n4. CTA 按钮 spring 出现\n5. 循环脉冲吸引点击\n\n能 pause/restart，并处理 reduced-motion 即为合格毕业作。",
      },
      {
        type: "code",
        title: "对应源码 · 迷你广告时间线",
        lang: "js",
        code: `const tl = createTimeline({ defaults: { ease: 'out(3)' } })
tl.add('.logo', { scale: [0, 1], duration: 500 })
  .add('.title .char', { opacity: [0, 1], translateY: [12, 0], delay: stagger(25), duration: 400 }, '-=200')
  .add('.feature', { opacity: [0, 1], translateY: [20, 0], delay: stagger(80), duration: 450 }, '-=100')
  .add('.cta', { scale: [0.8, 1], opacity: [0, 1], duration: 500 }, '-=120')`,
      },
      {
        type: "demo",
        kind: "timeline",
        title: "复习：时间线编排",
        hint: "用时间线思维看叠加入场 — 毕业时请在 Playground 重写完整版。",
      },
      {
        type: "quiz",
        questions: [
          {
            id: "cap1",
            question: "复杂多幕动画首选？",
            options: ["多个无关 setTimeout", "createTimeline 统一编排", "只用 CSS hover", "alert 串联"],
            answer: 1,
            explain: "Timeline 可 seek、重叠、统一控制。",
          },
          {
            id: "cap2",
            question: "上线前应检查？",
            options: ["仅 Chrome 放大镜", "性能、可访问性减弱动效、卸载清理", "删除全部 ease", "强制 loop 9999"],
            answer: 1,
            explain: "体验与稳健性并重。",
          },
        ],
      },
    ],
  },
];

export function getLesson(slug: string): Lesson | undefined {
  return LESSONS.find((l) => l.slug === slug);
}

export function getLessonIndex(slug: string): number {
  return LESSONS.findIndex((l) => l.slug === slug);
}

export function getAdjacent(slug: string): { prev?: Lesson; next?: Lesson } {
  const i = getLessonIndex(slug);
  if (i < 0) return {};
  return {
    prev: i > 0 ? LESSONS[i - 1] : undefined,
    next: i < LESSONS.length - 1 ? LESSONS[i + 1] : undefined,
  };
}

export function getLessonsByTrack(track: Lesson["track"]): Lesson[] {
  return LESSONS.filter((l) => l.track === track);
}

export function getAllQuizQuestions(): Array<
  QuizQuestion & { lessonSlug: string; lessonTitle: string }
> {
  const out: Array<QuizQuestion & { lessonSlug: string; lessonTitle: string }> = [];
  for (const lesson of LESSONS) {
    for (const block of lesson.blocks) {
      if (block.type === "quiz") {
        for (const q of block.questions) {
          out.push({ ...q, lessonSlug: lesson.slug, lessonTitle: lesson.title });
        }
      }
    }
  }
  return out;
}

export function isCourseLesson(l: Lesson): boolean {
  if (l.format === "reference") return false;
  if (l.format === "course") return true;
  return l.track !== "进阶模式";
}

export function getCourseLessons(): Lesson[] {
  return LESSONS.filter(isCourseLesson);
}
