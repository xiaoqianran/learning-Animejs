import { createFileRoute, Link } from "@tanstack/react-router";
import { BookMarked } from "lucide-react";

export const Route = createFileRoute("/cheatsheet")({
  component: CheatsheetPage,
});

const SECTIONS: { title: string; items: { k: string; v: string }[] }[] = [
  {
    title: "核心 API",
    items: [
      { k: "animate(t, p)", v: "创建并播放一段动画；返回可控制实例" },
      { k: "createTimeline()", v: "多段编排；.add(target, params, position)" },
      { k: "stagger(n)", v: "交错 delay / 数值；可 grid / from" },
      { k: "spring({...})", v: "物理弹簧 ease" },
      { k: "utils.random(a,b)", v: "随机数；属性可写函数按目标求值" },
    ],
  },
  {
    title: "常用参数",
    items: [
      { k: "duration", v: "毫秒；微交互 80–300，转场 400–800" },
      { k: "delay", v: "开始前等待；常与 stagger 组合" },
      { k: "ease", v: "v4 字段名；如 'out(3)' / 'outBack' / spring()" },
      { k: "loop / alternate", v: "循环与往返" },
      { k: "autoplay", v: "false 时手动 play()" },
    ],
  },
  {
    title: "属性写法",
    items: [
      { k: "x: 100", v: "到终点" },
      { k: "x: [0, 100]", v: "显式 from → to" },
      { k: "x: [{to:..},{to:..}]", v: "关键帧序列" },
      { k: "x: () => n", v: "每个目标不同值" },
      { k: "translate* / opacity", v: "性能友好首选" },
    ],
  },
  {
    title: "实例控制",
    items: [
      { k: "play / pause", v: "播放与暂停" },
      { k: "restart / reverse", v: "重开 / 反向" },
      { k: "seek(ms)", v: "跳到时间点；做 scrub" },
      { k: "onUpdate", v: "每帧回调；同步对象动画" },
      { k: "onComplete", v: "结束时业务衔接" },
    ],
  },
  {
    title: "v3 → v4 注意",
    items: [
      { k: "anime({...})", v: "改为 animate(targets, params)" },
      { k: "easing", v: "改为 ease" },
      { k: "elasticity", v: "更多用 spring / outElastic" },
      { k: "模块导入", v: "import { animate } from 'animejs'" },
    ],
  },
  {
    title: "实践清单",
    items: [
      { k: "a11y", v: "尊重 prefers-reduced-motion" },
      { k: "卸载", v: "路由离开 pause / 清理" },
      { k: "列表", v: "stagger 优于逐个硬编码 delay" },
      { k: "调试", v: "autoplay:false + 按钮控制" },
    ],
  },
];

function CheatsheetPage() {
  return (
    <div className="mx-auto max-w-3xl pb-16">
      <header className="mb-6">
        <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-primary">
          <BookMarked className="h-3.5 w-3.5" />
          速查 · Anime.js v4
        </p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-fg">速查表</h1>
        <p className="mt-2 text-sm text-muted">
          写码时扫一眼。完整 API 见{" "}
          <a
            href="https://animejs.com/documentation/"
            target="_blank"
            rel="noreferrer"
            className="text-primary no-underline hover:underline"
          >
            animejs.com
          </a>
          ，练习去{" "}
          <Link to="/playground" className="text-primary no-underline hover:underline">
            Playground
          </Link>
          。
        </p>
      </header>

      <div className="space-y-5">
        {SECTIONS.map((sec) => (
          <section key={sec.title} className="rounded-xl border border-border bg-surface p-4 sm:p-5">
            <h2 className="font-display text-sm font-semibold text-fg">{sec.title}</h2>
            <dl className="mt-3 divide-y divide-border">
              {sec.items.map((item) => (
                <div
                  key={item.k}
                  className="grid gap-1 py-2.5 sm:grid-cols-[11rem_1fr] sm:gap-4"
                >
                  <dt className="font-mono text-xs text-primary">{item.k}</dt>
                  <dd className="text-sm text-muted">{item.v}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </div>
  );
}
