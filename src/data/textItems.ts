/**
 * 示例数据 - 可爱文字内容
 * 包含不同长度和风格的文本，用于 Explore 页面瀑布流展示
 */

export interface TextItem {
  id: number;
  title: string;
  content: string;
  tag: string;
  /** 卡片背景色变体 */
  variant: 'pink' | 'cream' | 'lavender' | 'mint' | 'rose' | 'peach';
  /** 标签文字颜色变体 */
  tagColor: 'pink' | 'rose' | 'lavender' | 'mint' | 'peach' | 'coral';
}

export const textItems: TextItem[] = [
  {
    id: 1,
    title: 'Soft Sparkle',
    content: '✧ ˚₊‧♡ ♡₊˚ 🦢・₊✧',
    tag: 'Japanese Cute',
    variant: 'pink',
    tagColor: 'pink',
  },
  {
    id: 2,
    title: 'Little Moments',
    content: '☁︎ little moments ☁︎\nsoft life ♡',
    tag: 'Soft Life',
    variant: 'cream',
    tagColor: 'peach',
  },
  {
    id: 3,
    title: 'Shiny Days',
    content: '˗ˏˋ ꒰ ♡ ꒱ ˎˊ˗\n𝓼𝓱𝓲𝓷𝔂 𝓭𝓪𝔂𝓼',
    tag: 'Korean Style',
    variant: 'lavender',
    tagColor: 'lavender',
  },
  {
    id: 4,
    title: 'Sweet Girl',
    content: '🎀 𝐬𝐰𝐞𝐞𝐭 𝐠𝐢𝐫𝐥 🎀',
    tag: 'Sweet Girl',
    variant: 'rose',
    tagColor: 'rose',
  },
  {
    id: 5,
    title: 'Magic Hours',
    content: '✦ ⋆ ˚｡⋆ ୨୧ ⋆ ˚｡⋆ ✦\nmagic hours',
    tag: 'Minimal',
    variant: 'mint',
    tagColor: 'mint',
  },
  {
    id: 6,
    title: 'Bubble Tea Love',
    content: '♡⸝⸝⸝•˖•˖•⸝⸝⸝♡\nbubble tea lover',
    tag: 'Sweet Girl',
    variant: 'peach',
    tagColor: 'peach',
  },
  {
    id: 7,
    title: 'Minimal Aesthetic',
    content: '🤍 𝓶𝓲𝓷𝓲𝓶𝓪𝓵 𝓪𝓮𝓼𝓽𝓱𝓮𝓽𝓲𝓬 🤍',
    tag: 'Minimal',
    variant: 'lavender',
    tagColor: 'lavender',
  },
  {
    id: 8,
    title: 'Good Vibes',
    content: '✨ ˚₊· ͟͞͞\n➳ good vibes only',
    tag: 'Soft Life',
    variant: 'pink',
    tagColor: 'pink',
  },
  {
    id: 9,
    title: 'Sleepy Cat',
    content: '🌸 ねむい 🌸\nsleepy cat hours',
    tag: 'Japanese Cute',
    variant: 'mint',
    tagColor: 'mint',
  },
  {
    id: 10,
    title: 'Daisy Days',
    content: '˗ˏ ✿ ˎˊ˗\n𝐝𝐚𝐢𝐬𝐲 𝐝𝐚𝐲𝐬 ˚✿',
    tag: 'Korean Style',
    variant: 'cream',
    tagColor: 'peach',
  },
  {
    id: 11,
    title: 'Cozy & Warm',
    content: '🧸♡˚₊·\ncozy & warm',
    tag: 'Soft Life',
    variant: 'rose',
    tagColor: 'rose',
  },
  {
    id: 12,
    title: 'Ohayo',
    content: '✧˖°🌷 ohayo 🌷°˖✧',
    tag: 'Japanese Cute',
    variant: 'pink',
    tagColor: 'pink',
  },
  {
    id: 13,
    title: 'Strawberry Fields',
    content: 'ˏˋ°•*⁀➷\nstrawberry fields',
    tag: 'Sweet Girl',
    variant: 'peach',
    tagColor: 'coral',
  },
  {
    id: 14,
    title: 'Simple Things',
    content: '🤍 ˚ · .\nsimple things',
    tag: 'Minimal',
    variant: 'cream',
    tagColor: 'peach',
  },
  {
    id: 15,
    title: 'Blossom Time',
    content: '✿ ♡ ˖ ✺\n𝒷𝓁𝑜𝓈𝓈𝑜𝓂 𝓉𝒾𝓂𝑒',
    tag: 'Korean Style',
    variant: 'rose',
    tagColor: 'rose',
  },
  {
    id: 16,
    title: 'Cloud Nine',
    content: '☁︎˚✧₊·\ncloud nine ♡',
    tag: 'Soft Life',
    variant: 'lavender',
    tagColor: 'lavender',
  },
  {
    id: 17,
    title: 'Pink Dream',
    content: '♡ ˚₊‧⁺˖⋆\npink dream ˖⋆⁺‧₊˚ ♡',
    tag: 'Sweet Girl',
    variant: 'pink',
    tagColor: 'pink',
  },
  {
    id: 18,
    title: 'Star Light',
    content: '⋆｡°✩\nwish upon a star ✩°｡⋆',
    tag: 'Minimal',
    variant: 'mint',
    tagColor: 'mint',
  },
  {
    id: 19,
    title: 'Kawaii Desu',
    content: '₊˚ʚ ᗢ₊˚✧ ﾟ.\nkawaii overload ♡',
    tag: 'Japanese Cute',
    variant: 'rose',
    tagColor: 'coral',
  },
  {
    id: 20,
    title: 'Milk & Honey',
    content: '🥛 ˚ ༘ ೀ ⋆｡˚\nmilk & honey dreams',
    tag: 'Soft Life',
    variant: 'cream',
    tagColor: 'peach',
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