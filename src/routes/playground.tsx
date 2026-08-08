import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { animate, createTimeline, stagger, spring, utils } from "animejs";
import { Button } from "@/components/ui/button";
import { Code2, Play, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/playground")({
  component: PlaygroundPage,
});

const PRESETS: { id: string; title: string; code: string }[] = [
  {
    id: "hello",
    title: "Hello",
    code: `// root 是预览区容器
const box = root.querySelector('.box')
return animate(box, {
  translateX: 160,
  rotate: 12,
  duration: 800,
  ease: 'out(3)',
})`,
  },
  {
    id: "stagger",
    title: "Stagger",
    code: `const dots = root.querySelectorAll('.dot')
return animate(dots, {
  scale: [0.3, 1],
  opacity: [0.2, 1],
  delay: stagger(70),
  duration: 550,
  ease: 'outBack',
})`,
  },
  {
    id: "timeline",
    title: "Timeline",
    code: `const a = root.querySelector('.a')
const b = root.querySelector('.b')
const c = root.querySelector('.c')
const tl = createTimeline({ defaults: { ease: 'out(3)' } })
tl.add(a, { translateY: [-30, 0], opacity: [0, 1], duration: 450 })
  .add(b, { translateY: [-30, 0], opacity: [0, 1], duration: 450 }, '-=250')
  .add(c, { scale: [0.5, 1], opacity: [0, 1], duration: 500 }, '-=200')
return tl`,
  },
  {
    id: "spring",
    title: "Spring",
    code: `const chip = root.querySelector('.chip')
return animate(chip, {
  translateX: 170,
  ease: spring({ stiffness: 140, damping: 14 }),
})`,
  },
  {
    id: "particles",
    title: "Particles",
    code: `const nodes = root.querySelectorAll('.p')
return animate(nodes, {
  translateX: () => utils.random(-90, 90),
  translateY: () => utils.random(-50, 50),
  scale: [0, 1],
  opacity: [0, 1],
  delay: stagger(18),
  duration: 650,
  ease: 'outBack',
})`,
  },
];

const STAGE_HTML: Record<string, string> = {
  hello: `<div class="box" style="width:56px;height:56px;border-radius:14px;background:var(--color-primary)"></div>`,
  stagger: `<div style="display:flex;gap:10px">${Array.from({ length: 6 })
    .map(
      () =>
        `<div class="dot" style="width:36px;height:36px;border-radius:999px;background:var(--color-pink);opacity:.25;transform:scale(.4)"></div>`,
    )
    .join("")}</div>`,
  timeline: `<div style="display:flex;gap:10px">
    <div class="a" style="width:72px;height:72px;border-radius:12px;background:var(--color-surface-3);opacity:0;display:flex;align-items:center;justify-content:center">1</div>
    <div class="b" style="width:72px;height:72px;border-radius:12px;background:var(--color-surface-3);opacity:0;display:flex;align-items:center;justify-content:center">2</div>
    <div class="c" style="width:72px;height:72px;border-radius:12px;background:var(--color-surface-3);opacity:0;display:flex;align-items:center;justify-content:center">3</div>
  </div>`,
  spring: `<div class="chip" style="display:inline-flex;padding:8px 16px;border-radius:999px;background:var(--color-teal);color:var(--color-primary-fg);font-size:12px;font-weight:600">spring</div>`,
  particles: `<div style="position:relative;width:100%;height:140px">${Array.from({ length: 14 })
    .map(
      () =>
        `<div class="p" style="position:absolute;left:50%;top:50%;width:10px;height:10px;margin:-5px 0 0 -5px;border-radius:999px;background:var(--color-pink);transform:scale(0)"></div>`,
    )
    .join("")}</div>`,
};

function PlaygroundPage() {
  const [presetId, setPresetId] = useState("hello");
  const [code, setCode] = useState(PRESETS[0]!.code);
  const [error, setError] = useState<string | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<{ pause?: () => void; revert?: () => void } | null>(null);

  const mountStage = useCallback((id: string) => {
    const stage = stageRef.current;
    if (!stage) return;
    stage.innerHTML = STAGE_HTML[id] ?? STAGE_HTML.hello!;
  }, []);

  useEffect(() => {
    mountStage(presetId);
  }, [presetId, mountStage]);

  const run = useCallback(() => {
    const root = stageRef.current;
    if (!root) return;
    try {
      animRef.current?.pause?.();
      animRef.current?.revert?.();
    } catch {
      /* ignore */
    }
    mountStage(presetId);
    setError(null);
    try {
      // eslint-disable-next-line no-new-func
      const fn = new Function(
        "root",
        "animate",
        "createTimeline",
        "stagger",
        "spring",
        "utils",
        code,
      );
      const result = fn(root, animate, createTimeline, stagger, spring, utils);
      if (result) animRef.current = result;
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }, [code, mountStage, presetId]);

  return (
    <div className="mx-auto max-w-5xl pb-16">
      <header className="mb-5">
        <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-primary">
          <Code2 className="h-3.5 w-3.5" />
          Playground · Anime.js v4
        </p>
        <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
          动画沙盒
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          在下方编辑代码，点击运行。可用变量：
          <code className="mx-1 rounded-sm bg-surface-3 px-1.5 py-0.5 font-mono text-xs text-primary">
            root, animate, createTimeline, stagger, spring, utils
          </code>
        </p>
      </header>

      <div className="mb-4 flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => {
              setPresetId(p.id);
              setCode(p.code);
              setError(null);
            }}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-150",
              presetId === p.id
                ? "bg-primary text-primary-fg"
                : "bg-surface-3 text-muted hover:text-fg",
            )}
          >
            {p.title}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-border bg-code-bg">
          <div className="flex items-center justify-between border-b border-border px-3 py-2">
            <span className="text-xs text-muted">editor.js</span>
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" onClick={() => setCode(PRESETS.find((p) => p.id === presetId)?.code ?? code)}>
                <RotateCcw className="h-3.5 w-3.5" />
                重置
              </Button>
              <Button size="sm" onClick={run}>
                <Play className="h-3.5 w-3.5" />
                运行
              </Button>
            </div>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className="min-h-[320px] w-full resize-y bg-transparent p-4 font-mono text-[13px] leading-relaxed text-code-fg outline-none"
          />
        </div>
        <div className="flex flex-col rounded-xl border border-border bg-surface">
          <div className="border-b border-border px-3 py-2 text-xs text-muted">预览</div>
          <div
            ref={stageRef}
            className="flex min-h-[320px] flex-1 items-center justify-center overflow-hidden p-6"
          />
          {error ? (
            <p className="border-t border-danger/30 bg-danger/10 px-3 py-2 font-mono text-xs text-danger">
              {error}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
