import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { animate, createTimeline, stagger, spring, utils, type JSAnimation } from "animejs";
import type { DemoKind } from "@/data/lessons";
import { getDemoSource } from "@/data/demo-sources";
import { CodeBlock } from "@/components/CodeBlock";
import { Button } from "@/components/ui/button";
import { Code2, ChevronDown, ChevronUp, Play, Pause, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

type AnimLike = {
  play?: () => void;
  pause?: () => void;
  restart?: () => void;
  revert?: () => void;
  cancel?: () => void;
};

function kill(anim: AnimLike | null | undefined) {
  if (!anim) return;
  try {
    anim.pause?.();
    anim.revert?.();
    anim.cancel?.();
  } catch {
    /* ignore */
  }
}

function Stage({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative flex min-h-[200px] items-center justify-center overflow-hidden rounded-lg border border-border bg-bg p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

function usePlayable(run: (root: HTMLElement) => AnimLike | void | Promise<AnimLike | void>) {
  const rootRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimLike | null>(null);
  const [playing, setPlaying] = useState(false);

  const stop = useCallback(() => {
    kill(animRef.current);
    animRef.current = null;
    setPlaying(false);
  }, []);

  const play = useCallback(async () => {
    const root = rootRef.current;
    if (!root) return;
    stop();
    // reset common inline styles on direct demo nodes
    root.querySelectorAll<HTMLElement>("[data-anim]").forEach((el) => {
      el.style.transform = "";
      el.style.opacity = "";
      el.style.borderRadius = "";
      el.style.backgroundColor = "";
      el.style.scale = "";
    });
    setPlaying(true);
    const result = await run(root);
    if (result) {
      animRef.current = result;
      const anyAnim = result as JSAnimation & { then?: (fn: () => void) => void };
      if (typeof anyAnim.then === "function") {
        anyAnim.then(() => setPlaying(false));
      } else {
        window.setTimeout(() => setPlaying(false), 1600);
      }
    } else {
      window.setTimeout(() => setPlaying(false), 1200);
    }
  }, [run, stop]);

  useEffect(() => () => stop(), [stop]);

  return { rootRef, play, stop, playing, animRef };
}

function DemoHello() {
  const { rootRef, play, playing } = usePlayable((root) => {
    const el = root.querySelector<HTMLElement>(".box");
    if (!el) return;
    el.style.transform = "translateX(0px)";
    return animate(el, {
      translateX: 160,
      duration: 800,
      ease: "out(3)",
    });
  });
  return (
    <div>
      <Stage>
        <div ref={rootRef} className="flex w-full max-w-md items-center">
          <div
            data-anim
            className="box h-14 w-14 rounded-xl bg-primary shadow-soft"
            style={{ transform: "translateX(0px)" }}
          />
        </div>
      </Stage>
      <DemoActions onPlay={play} playing={playing} />
    </div>
  );
}

function DemoTargets() {
  const { rootRef, play, playing } = usePlayable((root) => {
    const dots = root.querySelectorAll(".dot");
    return animate(dots, {
      scale: [0.4, 1],
      opacity: [0.3, 1],
      delay: stagger(80),
      duration: 600,
      ease: "outBack",
    });
  });
  return (
    <div>
      <Stage>
        <div ref={rootRef} className="flex gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              data-anim
              className="dot h-10 w-10 rounded-full bg-pink opacity-30"
              style={{ transform: "scale(0.4)" }}
            />
          ))}
        </div>
      </Stage>
      <DemoActions onPlay={play} playing={playing} />
    </div>
  );
}

function DemoProps() {
  const { rootRef, play, playing } = usePlayable((root) => {
    const el = root.querySelector<HTMLElement>(".card");
    if (!el) return;
    return animate(el, {
      translateY: [-24, 0],
      opacity: [0, 1],
      borderRadius: ["4px", "20px"],
      backgroundColor: ["#313244", "#cba6f7"],
      duration: 900,
      ease: "out(3)",
    });
  });
  return (
    <div>
      <Stage>
        <div ref={rootRef}>
          <div
            data-anim
            className="card flex h-24 w-40 items-center justify-center text-sm font-semibold text-primary-fg opacity-0"
            style={{ backgroundColor: "#313244", borderRadius: 4, transform: "translateY(-24px)" }}
          >
            Card
          </div>
        </div>
      </Stage>
      <DemoActions onPlay={play} playing={playing} />
    </div>
  );
}

function DemoTiming() {
  const { rootRef, play, playing } = usePlayable((root) => {
    const el = root.querySelector<HTMLElement>(".bar");
    if (!el) return;
    return animate(el, {
      scaleX: [0, 1],
      duration: 700,
      delay: 200,
      ease: "inOut(2)",
    });
  });
  return (
    <div>
      <Stage>
        <div ref={rootRef} className="w-full max-w-sm">
          <div className="h-3 overflow-hidden rounded-full bg-surface-3">
            <div
              data-anim
              className="bar h-full origin-left rounded-full bg-primary"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>
      </Stage>
      <DemoActions onPlay={play} playing={playing} />
    </div>
  );
}

function DemoEasing() {
  const { rootRef, play, playing } = usePlayable((root) => {
    const a = root.querySelector(".ball-a");
    const b = root.querySelector(".ball-b");
    const c = root.querySelector(".ball-c");
    if (!a || !b || !c) return;
    animate(a, { translateX: 200, duration: 900, ease: "linear" });
    animate(b, { translateX: 200, duration: 900, ease: "out(3)" });
    return animate(c, { translateX: 200, duration: 900, ease: "outElastic" });
  });
  return (
    <div>
      <Stage className="min-h-[240px]">
        <div ref={rootRef} className="flex w-full max-w-md flex-col gap-4">
          {[
            { cls: "ball-a", label: "linear", color: "bg-blue" },
            { cls: "ball-b", label: "out(3)", color: "bg-primary" },
            { cls: "ball-c", label: "outElastic", color: "bg-pink" },
          ].map((row) => (
            <div key={row.cls} className="flex items-center gap-3">
              <span className="w-20 shrink-0 font-mono text-[10px] text-muted">{row.label}</span>
              <div className="relative h-8 flex-1 rounded-md bg-surface-2">
                <div
                  data-anim
                  className={cn(row.cls, "absolute left-1 top-1 h-6 w-6 rounded-full", row.color)}
                />
              </div>
            </div>
          ))}
        </div>
      </Stage>
      <DemoActions onPlay={play} playing={playing} />
    </div>
  );
}

function DemoTransform() {
  const { rootRef, play, playing } = usePlayable((root) => {
    const el = root.querySelector<HTMLElement>(".flip");
    if (!el) return;
    return animate(el, {
      rotateY: 180,
      scale: [1, 1.05, 1],
      duration: 900,
      ease: "inOut(2)",
    });
  });
  return (
    <div>
      <Stage className="[perspective:800px]">
        <div ref={rootRef}>
          <div
            data-anim
            className="flip flex h-28 w-28 items-center justify-center rounded-2xl bg-gradient-to-br from-pink to-mauve text-sm font-bold text-primary-fg shadow-soft"
            style={{ transformStyle: "preserve-3d" }}
          >
            Flip
          </div>
        </div>
      </Stage>
      <DemoActions onPlay={play} playing={playing} />
    </div>
  );
}

function DemoTimeline() {
  const { rootRef, play, playing } = usePlayable((root) => {
    const a = root.querySelector(".a");
    const b = root.querySelector(".b");
    const c = root.querySelector(".c");
    if (!a || !b || !c) return;
    const tl = createTimeline({ defaults: { ease: "out(3)" } });
    tl.add(a, { translateY: [-40, 0], opacity: [0, 1], duration: 500 })
      .add(b, { translateY: [-40, 0], opacity: [0, 1], duration: 500 }, "-=280")
      .add(c, { scale: [0.6, 1], opacity: [0, 1], duration: 600 }, "-=200");
    return tl;
  });
  return (
    <div>
      <Stage>
        <div ref={rootRef} className="flex gap-3">
          {["a", "b", "c"].map((cls, i) => (
            <div
              key={cls}
              data-anim
              className={cn(
                cls,
                "flex h-20 w-20 items-center justify-center rounded-xl border border-border bg-surface-2 text-sm font-semibold opacity-0",
              )}
              style={{ transform: cls === "c" ? "scale(0.6)" : "translateY(-40px)" }}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </Stage>
      <DemoActions onPlay={play} playing={playing} />
    </div>
  );
}

function DemoStagger() {
  const { rootRef, play, playing } = usePlayable((root) => {
    const cells = root.querySelectorAll(".cell");
    return animate(cells, {
      scale: [0.2, 1],
      opacity: [0, 1],
      delay: stagger(40, { grid: [5, 3], from: "center" }),
      duration: 500,
      ease: "outBack",
    });
  });
  return (
    <div>
      <Stage>
        <div ref={rootRef} className="grid grid-cols-5 gap-2">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              data-anim
              className="cell h-10 w-10 rounded-md bg-sapphire opacity-0"
              style={{ transform: "scale(0.2)" }}
            />
          ))}
        </div>
      </Stage>
      <DemoActions onPlay={play} playing={playing} />
    </div>
  );
}

function DemoKeyframes() {
  const { rootRef, play, playing } = usePlayable((root) => {
    const el = root.querySelector(".orb");
    if (!el) return;
    return animate(el, {
      translateY: [
        { to: -60, duration: 320, ease: "out" },
        { to: 0, duration: 420, ease: "in" },
      ],
      scaleX: [
        { to: 1.1, duration: 320 },
        { to: 1, duration: 420 },
      ],
    });
  });
  return (
    <div>
      <Stage className="min-h-[220px] items-end pb-10">
        <div ref={rootRef} className="flex flex-col items-center">
          <div data-anim className="orb h-14 w-14 rounded-full bg-peach shadow-soft" />
          <div className="mt-2 h-1 w-16 rounded-full bg-surface-3" />
        </div>
      </Stage>
      <DemoActions onPlay={play} playing={playing} />
    </div>
  );
}

function DemoLoop() {
  const { rootRef, play, stop, playing, animRef } = usePlayable((root) => {
    const el = root.querySelector(".pulse");
    if (!el) return;
    return animate(el, {
      scale: [1, 1.18],
      opacity: [0.7, 1],
      duration: 900,
      ease: "inOut(2)",
      loop: true,
      alternate: true,
    });
  });
  return (
    <div>
      <Stage>
        <div ref={rootRef}>
          <div
            data-anim
            className="pulse flex h-20 w-20 items-center justify-center rounded-full bg-primary/80 text-xs font-semibold text-primary-fg"
          >
            pulse
          </div>
        </div>
      </Stage>
      <div className="mt-3 flex flex-wrap gap-2">
        <Button size="sm" onClick={play} disabled={playing}>
          <Play className="h-3.5 w-3.5" />
          开始循环
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => {
            animRef.current?.pause?.();
            stop();
          }}
        >
          <Pause className="h-3.5 w-3.5" />
          停止
        </Button>
      </div>
    </div>
  );
}

function DemoControls() {
  const rootRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimLike | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const el = root.querySelector(".ship");
    if (!el) return;
    animRef.current = animate(el, {
      translateX: 220,
      rotate: 12,
      duration: 1200,
      ease: "inOut(2)",
      autoplay: false,
    });
    return () => kill(animRef.current);
  }, []);

  return (
    <div>
      <Stage>
        <div ref={rootRef} className="w-full max-w-md">
          <div
            data-anim
            className="ship flex h-12 w-12 items-center justify-center rounded-lg bg-sky text-xs font-bold text-primary-fg"
          >
            ▶
          </div>
        </div>
      </Stage>
      <div className="mt-3 flex flex-wrap gap-2">
        <Button size="sm" onClick={() => animRef.current?.play?.()}>
          <Play className="h-3.5 w-3.5" /> 播放
        </Button>
        <Button size="sm" variant="secondary" onClick={() => animRef.current?.pause?.()}>
          <Pause className="h-3.5 w-3.5" /> 暂停
        </Button>
        <Button size="sm" variant="secondary" onClick={() => animRef.current?.restart?.()}>
          <RotateCcw className="h-3.5 w-3.5" /> 重开
        </Button>
      </div>
    </div>
  );
}

function DemoCallbacks() {
  const labelRef = useRef<HTMLSpanElement>(null);
  const { rootRef, play, playing } = usePlayable(() => {
    const state = { n: 0 };
    if (labelRef.current) labelRef.current.textContent = "0%";
    return animate(state, {
      n: 100,
      duration: 1200,
      ease: "out(3)",
      onUpdate: () => {
        if (labelRef.current) labelRef.current.textContent = `${Math.round(state.n)}%`;
      },
    });
  });
  return (
    <div>
      <Stage>
        <div ref={rootRef} className="text-center">
          <span
            ref={labelRef}
            className="font-display text-5xl font-semibold tabular-nums text-primary"
          >
            0%
          </span>
          <p className="mt-2 text-xs text-muted">onUpdate 同步 JS 对象</p>
        </div>
      </Stage>
      <DemoActions onPlay={play} playing={playing} />
    </div>
  );
}

function DemoSvgDraw() {
  const { rootRef, play, playing } = usePlayable((root) => {
    const path = root.querySelector(".path");
    if (!path) return;
    return animate(path, {
      strokeDashoffset: [320, 0],
      duration: 1400,
      ease: "inOut(2)",
    });
  });
  return (
    <div>
      <Stage>
        <div ref={rootRef}>
          <svg width="200" height="120" viewBox="0 0 200 120" fill="none">
            <path
              className="path"
              d="M20 80 C 50 20, 90 20, 120 60 S 170 100, 180 40"
              stroke="var(--color-primary)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="320"
              strokeDashoffset="320"
            />
          </svg>
        </div>
      </Stage>
      <DemoActions onPlay={play} playing={playing} />
    </div>
  );
}

function DemoSvgMorph() {
  const { rootRef, play, playing } = usePlayable((root) => {
    const el = root.querySelector(".blob");
    if (!el) return;
    return animate(el, {
      d: [
        "M40,80 Q80,20 120,80 Q80,120 40,80",
        "M30,70 Q80,30 130,70 Q110,120 40,100 Z",
      ],
      duration: 1000,
      ease: "inOut(2)",
    });
  });
  return (
    <div>
      <Stage>
        <div ref={rootRef}>
          <svg width="160" height="140" viewBox="0 0 160 140">
            <path
              className="blob"
              d="M40,80 Q80,20 120,80 Q80,120 40,80"
              fill="var(--color-mauve)"
              opacity="0.9"
            />
          </svg>
        </div>
      </Stage>
      <DemoActions onPlay={play} playing={playing} />
    </div>
  );
}

function DemoTextSplit() {
  const text = "Anime.js";
  const { rootRef, play, playing } = usePlayable((root) => {
    const chars = root.querySelectorAll(".char");
    return animate(chars, {
      translateY: ["100%", "0%"],
      opacity: [0, 1],
      delay: stagger(30),
      duration: 500,
      ease: "out(3)",
    });
  });
  return (
    <div>
      <Stage>
        <div ref={rootRef} className="flex overflow-hidden font-display text-4xl font-semibold">
          {text.split("").map((ch, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <span
                data-anim
                className="char inline-block text-fg opacity-0"
                style={{ transform: "translateY(100%)" }}
              >
                {ch === " " ? "\u00A0" : ch}
              </span>
            </span>
          ))}
        </div>
      </Stage>
      <DemoActions onPlay={play} playing={playing} />
    </div>
  );
}

function DemoScroll() {
  const { rootRef, play, playing } = usePlayable((root) => {
    const el = root.querySelector(".reveal");
    if (!el) return;
    return animate(el, {
      translateY: [40, 0],
      opacity: [0, 1],
      duration: 700,
      ease: "out(3)",
    });
  });
  return (
    <div>
      <Stage>
        <div ref={rootRef}>
          <div
            data-anim
            className="reveal rounded-xl border border-border bg-surface-2 px-6 py-4 text-sm opacity-0"
            style={{ transform: "translateY(40px)" }}
          >
            进入视口 · 上浮显现
          </div>
        </div>
      </Stage>
      <DemoActions onPlay={play} playing={playing} label="模拟进入视口" />
    </div>
  );
}

function DemoSpring() {
  const { rootRef, play, playing } = usePlayable((root) => {
    const el = root.querySelector(".chip");
    if (!el) return;
    return animate(el, {
      translateX: 180,
      ease: spring({ stiffness: 120, damping: 12 }),
    });
  });
  return (
    <div>
      <Stage>
        <div ref={rootRef} className="w-full max-w-md">
          <div
            data-anim
            className="chip inline-flex rounded-full bg-teal px-4 py-2 text-xs font-semibold text-primary-fg"
          >
            spring
          </div>
        </div>
      </Stage>
      <DemoActions onPlay={play} playing={playing} />
    </div>
  );
}

function DemoDraggable() {
  const knobRef = useRef<HTMLDivElement>(null);
  const padRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; px: number; py: number } | null>(null);

  useEffect(() => {
    const knob = knobRef.current;
    const pad = padRef.current;
    if (!knob || !pad) return;

    let x = 0;
    let y = 0;

    const onDown = (e: PointerEvent) => {
      knob.setPointerCapture(e.pointerId);
      drag.current = { x, y, px: e.clientX, py: e.clientY };
    };
    const onMove = (e: PointerEvent) => {
      if (!drag.current) return;
      const rect = pad.getBoundingClientRect();
      const nx = drag.current.x + (e.clientX - drag.current.px);
      const ny = drag.current.y + (e.clientY - drag.current.py);
      const maxX = rect.width - knob.offsetWidth - 8;
      const maxY = rect.height - knob.offsetHeight - 8;
      x = Math.max(0, Math.min(maxX, nx));
      y = Math.max(0, Math.min(maxY, ny));
      knob.style.transform = `translate(${x}px, ${y}px)`;
    };
    const onUp = (e: PointerEvent) => {
      if (!drag.current) return;
      drag.current = null;
      try {
        knob.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
      animate(knob, {
        translateX: x,
        translateY: y,
        duration: 1,
      });
    };

    knob.addEventListener("pointerdown", onDown);
    knob.addEventListener("pointermove", onMove);
    knob.addEventListener("pointerup", onUp);
    return () => {
      knob.removeEventListener("pointerdown", onDown);
      knob.removeEventListener("pointermove", onMove);
      knob.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <div>
      <Stage className="p-0">
        <div ref={padRef} className="pad relative h-48 w-full max-w-md touch-none">
          <div
            ref={knobRef}
            className="knob absolute left-2 top-2 flex h-12 w-12 cursor-grab items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-fg active:cursor-grabbing"
          >
            拖
          </div>
        </div>
      </Stage>
      <p className="mt-2 text-xs text-muted">按住圆点在区域内拖动（简化 Draggable 手感）。</p>
    </div>
  );
}

function DemoLayout() {
  const [order, setOrder] = useState([0, 1, 2, 3, 4, 5]);
  const boxRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const prev = useRef<Map<number, DOMRect>>(new Map());

  const shuffle = () => {
    boxRefs.current.forEach((el, id) => {
      prev.current.set(id, el.getBoundingClientRect());
    });
    setOrder((o) => {
      const next = [...o];
      for (let i = next.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [next[i], next[j]] = [next[j]!, next[i]!];
      }
      return next;
    });
  };

  useEffect(() => {
    boxRefs.current.forEach((el, id) => {
      const first = prev.current.get(id);
      if (!first) return;
      const last = el.getBoundingClientRect();
      const dx = first.left - last.left;
      const dy = first.top - last.top;
      if (dx === 0 && dy === 0) return;
      animate(el, {
        translateX: [dx, 0],
        translateY: [dy, 0],
        duration: 450,
        ease: "out(3)",
      });
    });
  }, [order]);

  return (
    <div>
      <Stage>
        <div className="grid grid-cols-3 gap-2">
          {order.map((id) => (
            <div
              key={id}
              ref={(el) => {
                if (el) boxRefs.current.set(id, el);
              }}
              className="flex h-14 w-14 items-center justify-center rounded-lg bg-lavender text-sm font-bold text-primary-fg"
            >
              {id + 1}
            </div>
          ))}
        </div>
      </Stage>
      <div className="mt-3">
        <Button size="sm" onClick={shuffle}>
          <RotateCcw className="h-3.5 w-3.5" /> 打乱重排
        </Button>
      </div>
    </div>
  );
}

function DemoMicroUi() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const errRef = useRef<HTMLButtonElement>(null);

  const press = () => {
    if (!btnRef.current) return;
    animate(btnRef.current, {
      scale: [
        { to: 0.94, duration: 80, ease: "out" },
        { to: 1, duration: 220, ease: "outBack" },
      ],
    });
  };

  const shake = () => {
    if (!errRef.current) return;
    animate(errRef.current, {
      translateX: [0, -8, 8, -6, 6, 0],
      duration: 420,
      ease: "inOut(1)",
    });
  };

  return (
    <div>
      <Stage className="gap-4">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            ref={btnRef}
            type="button"
            onClick={press}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-fg"
          >
            主按钮
          </button>
          <button
            ref={errRef}
            type="button"
            onClick={shake}
            className="rounded-lg border border-danger/40 bg-danger/10 px-5 py-2.5 text-sm font-semibold text-danger"
          >
            错误抖动
          </button>
        </div>
      </Stage>
      <p className="mt-2 text-xs text-muted">点击按钮体验微交互。</p>
    </div>
  );
}

function DemoPageTrans() {
  const { rootRef, play, playing } = usePlayable((root) => {
    const a = root.querySelector(".page-a");
    const b = root.querySelector(".page-b");
    if (!a || !b) return;
    // reset
    (a as HTMLElement).style.opacity = "1";
    (b as HTMLElement).style.opacity = "0";
    const tl = createTimeline();
    tl.add(a, { opacity: 0, translateY: 16, duration: 280, ease: "in(2)" }).add(
      b,
      { opacity: [0, 1], translateY: [16, 0], duration: 360, ease: "out(3)" },
      "-=120",
    );
    return tl;
  });
  return (
    <div>
      <Stage className="min-h-[220px]">
        <div ref={rootRef} className="relative h-36 w-full max-w-sm">
          <div className="page-a absolute inset-0 flex items-center justify-center rounded-xl border border-border bg-surface-2 text-sm font-medium">
            页面 A
          </div>
          <div
            className="page-b absolute inset-0 flex items-center justify-center rounded-xl border border-primary/30 bg-primary-soft text-sm font-medium opacity-0"
            style={{ transform: "translateY(16px)" }}
          >
            页面 B
          </div>
        </div>
      </Stage>
      <DemoActions onPlay={play} playing={playing} label="切换视图" />
    </div>
  );
}

function DemoPerformance() {
  const { rootRef, play, playing } = usePlayable((root) => {
    const nodes = root.querySelectorAll(".hero");
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return animate(nodes, {
      opacity: [0, 1],
      translateY: reduce ? 0 : [24, 0],
      delay: stagger(40),
      duration: reduce ? 0 : 600,
      ease: "out(3)",
    });
  });
  return (
    <div>
      <Stage>
        <div ref={rootRef} className="flex gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              data-anim
              className="hero h-12 w-8 rounded-md bg-primary/70 opacity-0"
              style={{ transform: "translateY(24px)" }}
            />
          ))}
        </div>
      </Stage>
      <DemoActions onPlay={play} playing={playing} />
    </div>
  );
}

function DemoWaapi() {
  const { rootRef, play, playing } = usePlayable((root) => {
    const el = root.querySelector(".wa");
    if (!el) return;
    return animate(el, { translateX: 120, duration: 600, ease: "out" });
  });
  return (
    <div>
      <Stage>
        <div ref={rootRef} className="w-full max-w-sm">
          <div data-anim className="wa h-12 w-12 rounded-lg bg-blue" />
        </div>
      </Stage>
      <DemoActions onPlay={play} playing={playing} />
    </div>
  );
}

function DemoUtils() {
  const { rootRef, play, playing } = usePlayable((root) => {
    const nodes = root.querySelectorAll(".p");
    return animate(nodes, {
      translateX: () => utils.random(-80, 80),
      translateY: () => utils.random(-40, 40),
      scale: [0, 1],
      delay: stagger(20),
      duration: 600,
      ease: "outBack",
    });
  });
  return (
    <div>
      <Stage>
        <div ref={rootRef} className="relative h-32 w-full max-w-sm">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              data-anim
              className="p absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink"
              style={{ transform: "translate(-50%, -50%) scale(0)" }}
            />
          ))}
        </div>
      </Stage>
      <DemoActions onPlay={play} playing={playing} />
    </div>
  );
}

function DemoActions({
  onPlay,
  playing,
  label = "播放动画",
}: {
  onPlay: () => void;
  playing: boolean;
  label?: string;
}) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      <Button size="sm" onClick={onPlay} disabled={playing}>
        <Play className="h-3.5 w-3.5" />
        {playing ? "播放中…" : label}
      </Button>
    </div>
  );
}

const DEMO_MAP: Record<DemoKind, () => ReactNode> = {
  hello: () => <DemoHello />,
  targets: () => <DemoTargets />,
  props: () => <DemoProps />,
  timing: () => <DemoTiming />,
  easing: () => <DemoEasing />,
  transform: () => <DemoTransform />,
  timeline: () => <DemoTimeline />,
  stagger: () => <DemoStagger />,
  keyframes: () => <DemoKeyframes />,
  loop: () => <DemoLoop />,
  controls: () => <DemoControls />,
  callbacks: () => <DemoCallbacks />,
  "svg-draw": () => <DemoSvgDraw />,
  "svg-morph": () => <DemoSvgMorph />,
  "text-split": () => <DemoTextSplit />,
  scroll: () => <DemoScroll />,
  spring: () => <DemoSpring />,
  draggable: () => <DemoDraggable />,
  layout: () => <DemoLayout />,
  "micro-ui": () => <DemoMicroUi />,
  "page-trans": () => <DemoPageTrans />,
  performance: () => <DemoPerformance />,
  waapi: () => <DemoWaapi />,
  utils: () => <DemoUtils />,
};

export function InteractiveDemo({
  kind,
  title,
  hint,
}: {
  kind: DemoKind;
  title: string;
  hint?: string;
}) {
  const [showCode, setShowCode] = useState(true);
  const source = getDemoSource(kind);
  const Demo = DEMO_MAP[kind];

  return (
    <section className="overflow-hidden rounded-xl border border-border bg-surface shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-2 border-b border-border px-4 py-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-primary">
            交互 Demo · Anime.js
          </p>
          <h3 className="mt-0.5 font-display text-base font-semibold text-fg">{title}</h3>
        </div>
        <button
          type="button"
          onClick={() => setShowCode((v) => !v)}
          className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-2 px-2.5 py-1 text-[11px] text-muted transition-colors hover:text-fg"
        >
          <Code2 className="h-3.5 w-3.5" />
          {showCode ? "收起源码" : "展开源码"}
          {showCode ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </button>
      </div>
      <div className="p-4 sm:p-5">
        {hint ? <p className="mb-4 text-sm text-muted">{hint}</p> : null}
        {Demo ? Demo() : <p className="text-sm text-muted">Demo 暂缺</p>}
        {showCode ? (
          <div className="mt-4">
            <CodeBlock code={source.code} title={source.title} lang="js" />
          </div>
        ) : null}
      </div>
    </section>
  );
}
