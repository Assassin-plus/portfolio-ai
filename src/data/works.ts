// Shared data for the Works carousel and the per-project detail pages.
// All arrays are index-aligned with `text.works.items` in LanguageContext.

const BASE = 'https://assassin-plus.github.io/portfolio'

export const WORKS_IMAGES = [
  `${BASE}/project/offbalance/featured.gif`,
  `${BASE}/project/projecttitan/featured.gif`,
  `${import.meta.env.BASE_URL}carpaint.gif`,
  `${BASE}/project/offbeatreprise/featured.gif`,
  `${BASE}/project/livingstrokes/featured.gif`,
  `${import.meta.env.BASE_URL}flamegs.jpg`,
  `${import.meta.env.BASE_URL}micropt.gif`,
]

// Optional higher-fidelity video per work, lazy-loaded and faded in over the
// gif/image. `undefined` = image-only.
export const WORKS_VIDEOS: (string | undefined)[] = [
  undefined,
  undefined,
  `${import.meta.env.BASE_URL}carpaint.mp4`,
  undefined,
  undefined,
  undefined,
  undefined,
]

// URL slug per work, used for the internal /project/:slug detail route.
export const WORKS_SLUGS = [
  'offbalance',
  'projecttitan',
  'substrate-carpaint',
  'offbeat-reprise',
  'living-strokes',
  'flamegs',
  'micropt',
]

// Per-category accent color (keyed by the localized `category` string), used to
// tint the ambient background glow.
export const CATEGORY_COLORS: Record<string, string> = {
  'GAME DEV': '#1DC47D',
  'TECHNICAL ART': '#8DB800',
  'GAME DEV · VR': '#1DC47D',
  'GRAPHICS RESEARCH': '#7090FF',
  'GRAPHICS': '#7090FF',
  '游戏开发': '#1DC47D',
  '技术美术': '#8DB800',
  '游戏开发 · VR': '#1DC47D',
  '图形学研究': '#7090FF',
  '图形学': '#7090FF',
}

// Returns the index of a work by slug, or -1 if unknown.
export function slugToIndex(slug: string | undefined): number {
  if (!slug) return -1
  return WORKS_SLUGS.indexOf(slug)
}
