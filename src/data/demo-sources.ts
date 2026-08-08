import type { DemoKind } from "./lessons";

export type DemoSource = {
  title: string;
  code: string;
};

const SOURCES: Record<DemoKind, DemoSource> = {
  hello: {
    title: "hello.js",
    code: `import { animate } from 'animejs'

animate('.box', {
  translateX: 160,
  duration: 800,
  ease: 'out(3)',
})`,
  },
  targets: {
    title: "targets.js",
    code: `import { animate, stagger } from 'animejs'

animate('.dot', {
  scale: [0.4, 1],
  opacity: [0.3, 1],
  delay: stagger(80),
  duration: 600,
  ease: 'outBack',
})`,
  },
  props: {
    title: "props.js",
    code: `animate('.card', {
  translateY: [-24, 0],
  opacity: [0, 1],
  borderRadius: ['4px', '20px'],
  duration: 900,
  ease: 'out(3)',
})`,
  },
  timing: {
    title: "timing.js",
    code: `animate('.bar', {
  scaleX: [0, 1],
  duration: 700,
  delay: 200,
  ease: 'inOut(2)',
})`,
  },
  easing: {
    title: "easing.js",
    code: `animate('.ball-a', { translateX: 200, duration: 900, ease: 'linear' })
animate('.ball-b', { translateX: 200, duration: 900, ease: 'out(3)' })
animate('.ball-c', { translateX: 200, duration: 900, ease: 'outElastic' })`,
  },
  transform: {
    title: "transform.js",
    code: `animate('.flip', {
  rotateY: 180,
  scale: [1, 1.05, 1],
  duration: 900,
  ease: 'inOut(2)',
})`,
  },
  timeline: {
    title: "timeline.js",
    code: `import { createTimeline } from 'animejs'

const tl = createTimeline({ defaults: { ease: 'out(3)' } })
tl.add('.a', { translateY: [-40, 0], opacity: [0, 1], duration: 500 })
  .add('.b', { translateY: [-40, 0], opacity: [0, 1], duration: 500 }, '-=280')
  .add('.c', { scale: [0.6, 1], opacity: [0, 1], duration: 600 }, '-=200')`,
  },
  stagger: {
    title: "stagger.js",
    code: `import { animate, stagger } from 'animejs'

animate('.cell', {
  scale: [0.2, 1],
  opacity: [0, 1],
  delay: stagger(40, { grid: [5, 3], from: 'center' }),
  duration: 500,
  ease: 'outBack',
})`,
  },
  keyframes: {
    title: "keyframes.js",
    code: `animate('.orb', {
  translateY: [
    { to: -60, duration: 320, ease: 'out' },
    { to: 0, duration: 420, ease: 'in' },
  ],
})`,
  },
  loop: {
    title: "loop.js",
    code: `animate('.pulse', {
  scale: [1, 1.18],
  opacity: [0.7, 1],
  duration: 900,
  ease: 'inOut(2)',
  loop: true,
  alternate: true,
})`,
  },
  controls: {
    title: "controls.js",
    code: `const anim = animate('.ship', {
  translateX: 220,
  rotate: 12,
  duration: 1200,
  ease: 'inOut(2)',
  autoplay: false,
})
anim.play()`,
  },
  callbacks: {
    title: "callbacks.js",
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
  "svg-draw": {
    title: "svg-draw.js",
    code: `animate('.path', {
  strokeDashoffset: [320, 0],
  duration: 1400,
  ease: 'inOut(2)',
})`,
  },
  "svg-morph": {
    title: "svg-morph.js",
    code: `animate('.blob', {
  d: [pathA, pathB],
  duration: 1000,
  ease: 'inOut(2)',
})`,
  },
  "text-split": {
    title: "text-split.js",
    code: `import { animate, stagger } from 'animejs'

animate('.char', {
  translateY: ['100%', '0%'],
  opacity: [0, 1],
  delay: stagger(30),
  duration: 500,
  ease: 'out(3)',
})`,
  },
  scroll: {
    title: "scroll.js",
    code: `import { animate, onScroll } from 'animejs'

animate('.reveal', {
  translateY: [40, 0],
  opacity: [0, 1],
  duration: 700,
  autoplay: onScroll({ target: '.reveal' }),
})`,
  },
  spring: {
    title: "spring.js",
    code: `import { animate, spring } from 'animejs'

animate('.chip', {
  translateX: 180,
  ease: spring({ stiffness: 120, damping: 12 }),
})`,
  },
  draggable: {
    title: "draggable.js",
    code: `import { createDraggable } from 'animejs'

createDraggable('.knob', {
  container: '.pad',
  releaseEase: 'out(3)',
})`,
  },
  layout: {
    title: "layout.js",
    code: `// FLIP: record → reorder → animate delta → 0
animate(el, {
  translateX: [dx, 0],
  translateY: [dy, 0],
  duration: 450,
  ease: 'out(3)',
})`,
  },
  "micro-ui": {
    title: "micro-ui.js",
    code: `animate('.btn', {
  scale: [
    { to: 0.94, duration: 80 },
    { to: 1, duration: 220, ease: 'outBack' },
  ],
})`,
  },
  "page-trans": {
    title: "page-trans.js",
    code: `const tl = createTimeline()
tl.add('.page-a', { opacity: 0, translateY: 16, duration: 280 })
  .add('.page-b', { opacity: [0, 1], translateY: [16, 0], duration: 360 }, '-=120')`,
  },
  performance: {
    title: "performance.js",
    code: `const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
animate('.hero', {
  opacity: [0, 1],
  translateY: reduce ? 0 : [24, 0],
  duration: reduce ? 0 : 600,
})`,
  },
  waapi: {
    title: "waapi.js",
    code: `animate(el, { translateX: 120, duration: 600, ease: 'out' })`,
  },
  utils: {
    title: "utils.js",
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
};

export function getDemoSource(kind: DemoKind): DemoSource {
  return SOURCES[kind] ?? { title: "demo.js", code: `// ${kind}` };
}
