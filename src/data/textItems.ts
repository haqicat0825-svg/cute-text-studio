/**
 * 示例数据 - 可爱文字内容
 * 包含不同长度和风格的文本，用于 Explore 页面瀑布流展示
 */

export interface TextItem {
  id: number;
  content: string;
  tag: string;
  /** 卡片背景色变体 */
  variant: 'pink' | 'cream' | 'lavender' | 'mint';
}

export const textItems: TextItem[] = [
  {
    id: 1,
    content: '✧ ˚₊‧♡ ♡₊˚ 🦢・₊✧',
    tag: 'Japanese Cute',
    variant: 'pink',
  },
  {
    id: 2,
    content: '☁︎ little moments ☁︎\nsoft life ♡',
    tag: 'Soft Life',
    variant: 'cream',
  },
  {
    id: 3,
    content: '˗ˏˋ ꒰ ♡ ꒱ ˎˊ˗\n𝓼𝓱𝓲𝓷𝔂 𝓭𝓪𝔂𝓼',
    tag: 'Korean Style',
    variant: 'lavender',
  },
  {
    id: 4,
    content: '🎀 𝐬𝐰𝐞𝐞𝐭 𝐠𝐢𝐫𝐥 🎀',
    tag: 'Sweet Girl',
    variant: 'pink',
  },
  {
    id: 5,
    content: '✦ ⋆ ˚｡⋆ ୨୧ ⋆ ˚｡⋆ ✦\nmagic hours',
    tag: 'Minimal',
    variant: 'mint',
  },
  {
    id: 6,
    content: '♡⸝⸝⸝•˖•˖•⸝⸝⸝♡\nbubble tea lover',
    tag: 'Sweet Girl',
    variant: 'cream',
  },
  {
    id: 7,
    content: '🤍 𝓶𝓲𝓷𝓲𝓶𝓪𝓵 𝓪𝓮𝓼𝓽𝓱𝓮𝓽𝓲𝓬 🤍',
    tag: 'Minimal',
    variant: 'lavender',
  },
  {
    id: 8,
    content: '✨ ˚₊· ͟͞͞\n➳ good vibes only',
    tag: 'Soft Life',
    variant: 'pink',
  },
  {
    id: 9,
    content: '🌸 ねむい 🌸\nsleepy cat hours',
    tag: 'Japanese Cute',
    variant: 'mint',
  },
  {
    id: 10,
    content: '˗ˏ ✿ ˎˊ˗\n𝐝𝐚𝐢𝐬𝐲 𝐝𝐚𝐲𝐬 ˚✿',
    tag: 'Korean Style',
    variant: 'cream',
  },
  {
    id: 11,
    content: '🧸♡˚₊·\ncozy & warm',
    tag: 'Soft Life',
    variant: 'lavender',
  },
  {
    id: 12,
    content: '✧˖°🌷 ohayo 🌷°˖✧',
    tag: 'Japanese Cute',
    variant: 'pink',
  },
  {
    id: 13,
    content: 'ˏˋ°•*⁀➷\nstrawberry fields',
    tag: 'Sweet Girl',
    variant: 'mint',
  },
  {
    id: 14,
    content: '🤍 ˚ · .\nsimple things',
    tag: 'Minimal',
    variant: 'cream',
  },
  {
    id: 15,
    content: '✿ ♡ ˖ ✺\n𝒷𝓁𝑜𝓈𝓈𝑜𝓂 𝓉𝒾𝓂𝑒',
    tag: 'Korean Style',
    variant: 'pink',
  },
  {
    id: 16,
    content: '☁︎˚✧₊·\ncloud nine ♡',
    tag: 'Soft Life',
    variant: 'lavender',
  },
];

export const categories = [
  { id: 'all', label: 'All', icon: '💕' },
  { id: 'sweet', label: 'Sweet Girl', icon: '🎀' },
  { id: 'japanese', label: 'Japanese Cute', icon: '🌸' },
  { id: 'korean', label: 'Korean Style', icon: '🤍' },
  { id: 'soft', label: 'Soft Life', icon: '☁' },
  { id: 'minimal', label: 'Minimal', icon: '✨' },
] as const;

export const searchExamples = [
  'pink birthday style',
  'soft korean aesthetic',
  'summer diary',
];
