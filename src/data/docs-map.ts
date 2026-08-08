/** 官方文档地图：Anime.js docs ↔ 本站课程 */
export type DocMapItem = {
  title: string;
  official: string;
  lessonSlug?: string;
  note?: string;
};

export type DocSection = {
  title: string;
  items: DocMapItem[];
};

export const DOC_SECTIONS: DocSection[] = [
  {
    title: "Getting started",
    items: [
      {
        title: "Introduction",
        official: "https://animejs.com/documentation/",
        lessonSlug: "intro",
        note: "库定位与 v4 模块化 API",
      },
    ],
  },
  {
    title: "Animation",
    items: [
      {
        title: "Targets",
        official: "https://animejs.com/documentation/animation",
        lessonSlug: "targets",
        note: "选择器、节点、对象",
      },
      {
        title: "Properties",
        official: "https://animejs.com/documentation/animation",
        lessonSlug: "properties",
        note: "CSS / transform / 颜色",
      },
      {
        title: "Duration & delay",
        official: "https://animejs.com/documentation/animation",
        lessonSlug: "timing",
        note: "节奏控制",
      },
      {
        title: "Keyframes",
        official: "https://animejs.com/documentation/animation",
        lessonSlug: "keyframes",
        note: "多段路径",
      },
      {
        title: "Playback controls",
        official: "https://animejs.com/documentation/animation",
        lessonSlug: "controls",
        note: "play / pause / seek",
      },
      {
        title: "Callbacks",
        official: "https://animejs.com/documentation/animation",
        lessonSlug: "callbacks",
        note: "onUpdate 等",
      },
    ],
  },
  {
    title: "Easings",
    items: [
      {
        title: "ease functions",
        official: "https://animejs.com/documentation/easings",
        lessonSlug: "easing",
        note: "linear / out / elastic",
      },
      {
        title: "Spring",
        official: "https://animejs.com/documentation/easings",
        lessonSlug: "spring",
        note: "物理弹簧",
      },
    ],
  },
  {
    title: "Timeline",
    items: [
      {
        title: "createTimeline",
        official: "https://animejs.com/documentation/timeline",
        lessonSlug: "timeline",
        note: "多幕编排",
      },
      {
        title: "Stagger",
        official: "https://animejs.com/documentation/utilities/stagger",
        lessonSlug: "stagger",
        note: "交错延迟",
      },
    ],
  },
  {
    title: "SVG & Text",
    items: [
      {
        title: "SVG drawable",
        official: "https://animejs.com/documentation/svg",
        lessonSlug: "svg-draw",
        note: "路径描边",
      },
      {
        title: "SVG morph",
        official: "https://animejs.com/documentation/svg",
        lessonSlug: "svg-morph",
        note: "形态过渡",
      },
      {
        title: "Text split",
        official: "https://animejs.com/documentation/text",
        lessonSlug: "text-split",
        note: "逐字动画",
      },
    ],
  },
  {
    title: "Interaction",
    items: [
      {
        title: "Scroll",
        official: "https://animejs.com/documentation/events/scroll",
        lessonSlug: "scroll",
        note: "滚动联动",
      },
      {
        title: "Draggable",
        official: "https://animejs.com/documentation/draggable",
        lessonSlug: "draggable",
        note: "拖拽",
      },
      {
        title: "Layout",
        official: "https://animejs.com/documentation/",
        lessonSlug: "layout-anim",
        note: "FLIP 重排",
      },
    ],
  },
  {
    title: "Advanced",
    items: [
      {
        title: "WAAPI",
        official: "https://animejs.com/documentation/waapi",
        lessonSlug: "waapi",
        note: "原生 API 对照",
      },
      {
        title: "Utilities",
        official: "https://animejs.com/documentation/utilities",
        lessonSlug: "utils",
        note: "random / clamp / lerp",
      },
    ],
  },
];

export function getDocsCoverage() {
  const items = DOC_SECTIONS.flatMap((s) => s.items);
  const total = items.length;
  const linked = items.filter((i) => i.lessonSlug).length;
  return {
    total,
    linked,
    percent: total ? Math.round((linked / total) * 100) : 0,
  };
}

export function getDocsBySection() {
  return DOC_SECTIONS.map((s) => [s.title, s.items] as const);
}
