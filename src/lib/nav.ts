import {
  Award,
  BookMarked,
  BookOpen,
  BookX,
  Code2,
  FlaskConical,
  LayoutDashboard,
  Library,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { Lesson } from "@/data/lessons";
import { LESSONS, TRACKS, getCourseLessons } from "@/data/lessons";

export const TRACK_META: Record<
  Lesson["track"],
  { order: number; label: string; blurb: string }
> = {
  基础: { order: 1, label: "① 基础", blurb: "目标 · 属性 · 缓动 · 变换" },
  时间线: { order: 2, label: "② 时间线", blurb: "Timeline · Stagger · 关键帧 · 控制" },
  视觉特效: { order: 3, label: "③ 视觉特效", blurb: "SVG · 文字 · Morph" },
  交互: { order: 4, label: "④ 交互", blurb: "滚动 · 弹簧 · 拖拽 · 布局" },
  实战: { order: 5, label: "⑤ 实战", blurb: "微交互 · 转场 · 性能 · 毕业" },
  进阶模式: { order: 6, label: "⑥ 进阶", blurb: "WAAPI · Utils · 可选加深" },
};

export function trackLabel(track: Lesson["track"]) {
  return TRACK_META[track]?.label ?? track;
}

export function orderedTracks(): Lesson["track"][] {
  return [...TRACKS].sort((a, b) => (TRACK_META[a]?.order ?? 99) - (TRACK_META[b]?.order ?? 99));
}

export function getValidCompleted(completed: string[]): string[] {
  const set = new Set(LESSONS.map((l) => l.slug));
  return completed.filter((s) => set.has(s));
}

export function completedCount(completed: string[]): number {
  const set = new Set(getValidCompleted(completed));
  return getCourseLessons().filter((l) => set.has(l.slug)).length;
}

export function progressPercent(completed: string[]): number {
  const core = getCourseLessons();
  if (core.length === 0) return 0;
  return Math.round((completedCount(completed) / core.length) * 100);
}

export function isAllComplete(completed: string[]): boolean {
  return getCourseLessons().every((l) => completed.includes(l.slug));
}

export function getContinueLesson(completed: string[]): Lesson {
  const coreNext = getCourseLessons().find((l) => !completed.includes(l.slug));
  if (coreNext) return coreNext;
  const next = LESSONS.find((l) => !completed.includes(l.slug));
  if (next) return next;
  return LESSONS[LESSONS.length - 1] ?? LESSONS[0]!;
}

export function getContinueHref(completed: string[]): {
  kind: "lesson" | "certificate";
  slug?: string;
} {
  if (isAllComplete(completed)) return { kind: "certificate" };
  return { kind: "lesson", slug: getContinueLesson(completed).slug };
}

export type NavItem = {
  to:
    | "/"
    | "/docs"
    | "/cheatsheet"
    | "/playground"
    | "/lab"
    | "/hub"
    | "/mistakes"
    | "/certificate"
    | "/showcase";
  label: string;
  hint?: string;
  icon: LucideIcon;
};

export const NAV_PRIMARY: NavItem[] = [
  { to: "/docs", label: "文档", hint: "查 · 官网对照地图", icon: Library },
  { to: "/showcase", label: "秀场", hint: "练 · 精选动效合集", icon: Sparkles },
  { to: "/hub", label: "进度", hint: "我 · 学习中心", icon: LayoutDashboard },
];

export const NAV_TOOLS: NavItem[] = [
  { to: "/cheatsheet", label: "速查表", hint: "写码时扫一眼", icon: BookMarked },
  { to: "/playground", label: "Playground", hint: "改代码看动画", icon: Code2 },
  { to: "/lab", label: "练习场", hint: "刷测验题", icon: FlaskConical },
  { to: "/mistakes", label: "错题本", hint: "错题重练", icon: BookX },
  { to: "/certificate", label: "结业证书", hint: "全部完成后解锁", icon: Award },
];

export const NAV_HOME: NavItem = {
  to: "/",
  label: "学 · 首页",
  hint: "路径与大纲",
  icon: BookOpen,
};
