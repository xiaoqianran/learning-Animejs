import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { animate, createTimeline, stagger, spring } from "animejs";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/showcase")({
  component: ShowcasePage,
});

function ShowcasePage() {
  return (
    <div className="mx-auto max-w-3xl pb-16">
      <header className="mb-8">
        <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          秀场 · 精选动效
        </p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-fg sm:text-3xl">
          看一遍就会上瘾
        </h1>
        <p className="mt-2 text-sm text-muted">
          综合运用 Timeline / Stagger / Spring 的展示页。点「重播」欣赏完整编排。
        </p>
      </header>

      <div className="space-y-6">
        <HeroReel />
        <LoaderCards />
        <CtaBurst />
      </div>
    </div>
  );
}

function HeroReel() {
  const rootRef = useRef<HTMLDivElement>(null);

  const play = () => {
    const root = rootRef.current;
    if (!root) return;
    const logo = root.querySelector(".logo");
    const chars = root.querySelectorAll(".char");
    const cards = root.querySelectorAll(".feat");
    const cta = root.querySelector(".cta");
    if (!logo || !cta) return;
    const tl = createTimeline({ defaults: { ease: "out(3)" } });
    tl.add(logo, { scale: [0, 1], rotate: [-20, 0], duration: 500 })
      .add(
        chars,
        {
          opacity: [0, 1],
          translateY: [16, 0],
          delay: stagger(28),
          duration: 400,
        },
        "-=200",
      )
      .add(
        cards,
        {
          opacity: [0, 1],
          translateY: [24, 0],
          delay: stagger(90),
          duration: 450,
        },
        "-=100",
      )
      .add(cta, { scale: [0.85, 1], opacity: [0, 1], duration: 500 }, "-=120");
  };

  useEffect(() => {
    play();
  }, []);

  const title = "Motion UI";
  return (
    <section className="rounded-xl border border-border bg-surface p-5 shadow-soft sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="font-display text-base font-semibold">迷你广告片</h2>
        <Button size="sm" variant="secondary" onClick={play}>
          重播
        </Button>
      </div>
      <div ref={rootRef} className="rounded-lg border border-border bg-bg p-6 text-center">
        <div className="logo mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-primary-fg">
          A
        </div>
        <div className="mb-5 flex justify-center overflow-hidden font-display text-3xl font-semibold">
          {title.split("").map((ch, i) => (
            <span key={i} className="char inline-block opacity-0">
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </div>
        <div className="mb-5 grid grid-cols-3 gap-2">
          {["Fast", "Fluid", "Fun"].map((t) => (
            <div
              key={t}
              className="feat rounded-lg border border-border bg-surface-2 py-3 text-xs font-medium opacity-0"
            >
              {t}
            </div>
          ))}
        </div>
        <button
          type="button"
          className="cta rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-fg opacity-0"
        >
          开始学习
        </button>
      </div>
    </section>
  );
}

function LoaderCards() {
  const rootRef = useRef<HTMLDivElement>(null);

  const play = () => {
    const root = rootRef.current;
    if (!root) return;
    const bars = root.querySelectorAll(".bar");
    animate(bars, {
      scaleY: [0.2, 1],
      opacity: [0.4, 1],
      delay: stagger(80),
      duration: 500,
      ease: "inOut(2)",
      loop: true,
      alternate: true,
    });
  };

  useEffect(() => {
    play();
  }, []);

  return (
    <section className="rounded-xl border border-border bg-surface p-5 shadow-soft sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="font-display text-base font-semibold">音频条加载</h2>
        <Button size="sm" variant="secondary" onClick={play}>
          重播
        </Button>
      </div>
      <div ref={rootRef} className="flex h-28 items-end justify-center gap-2 rounded-lg border border-border bg-bg p-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="bar w-3 origin-bottom rounded-full bg-sapphire"
            style={{ height: 20 + (i % 4) * 14 }}
          />
        ))}
      </div>
    </section>
  );
}

function CtaBurst() {
  const rootRef = useRef<HTMLDivElement>(null);

  const play = () => {
    const root = rootRef.current;
    if (!root) return;
    const btn = root.querySelector(".burst-btn");
    const bits = root.querySelectorAll(".bit");
    if (!btn) return;
    animate(btn, {
      scale: [
        { to: 0.92, duration: 80 },
        { to: 1, duration: 280, ease: spring({ stiffness: 200, damping: 12 }) },
      ],
    });
    animate(bits, {
      translateX: () => (Math.random() - 0.5) * 140,
      translateY: () => (Math.random() - 0.5) * 100,
      scale: [0, 1, 0],
      opacity: [0, 1, 0],
      delay: stagger(12),
      duration: 700,
      ease: "out(2)",
    });
  };

  return (
    <section className="rounded-xl border border-border bg-surface p-5 shadow-soft sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="font-display text-base font-semibold">点击爆发</h2>
        <Button size="sm" variant="secondary" onClick={play}>
          触发
        </Button>
      </div>
      <div
        ref={rootRef}
        className="relative flex h-40 items-center justify-center overflow-hidden rounded-lg border border-border bg-bg"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            className="bit absolute h-2.5 w-2.5 rounded-full bg-pink"
            style={{ left: "50%", top: "50%", marginLeft: -5, marginTop: -5 }}
          />
        ))}
        <button
          type="button"
          onClick={play}
          className="burst-btn relative z-10 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-fg"
        >
          Like
        </button>
      </div>
    </section>
  );
}
