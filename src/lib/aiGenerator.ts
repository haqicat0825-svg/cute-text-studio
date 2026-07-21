/**
 * AI Text Decorator Engine
 * AI 文字装饰引擎
 *
 * 核心逻辑：用户输入一句文字 → AI 从素材库选择装饰元素 → 组合输出
 * 不生成新文字，只装饰用户原有文字
 */

import { kaomojiLibrary } from '@/data/kaomojiLibrary';
import { unicodeLibrary } from '@/data/unicodeLibrary';
import { decorationLibrary } from '@/data/decorationLibrary';
import { cuteTextLibrary } from '@/data/cuteTextLibrary';
import type { TextItem } from '@/data/types';

/* ────────────────────────  类型定义  ──────────────────────── */

export type DecorateMode = 'simple' | 'cute' | 'korean' | 'dreamy';

export interface DecorateResult {
  /** 装饰后的完整文字 */
  text: string;
  /** 使用的模式 */
  mode: DecorateMode;
  /** 使用的素材来源 */
  sources: {
    kaomoji?: TextItem;
    unicode?: TextItem;
    decoration?: TextItem;
  };
  /** 排版结构描述 */
  layout: string;
}

export interface DecorateOutput {
  /** AI 分析的用户输入 */
  inputText: string;
  /** 选择的模式 */
  mode: DecorateMode;
  /** 生成的 3 个装饰方案 */
  results: DecorateResult[];
}

/* ────────────────────────  模式配置  ──────────────────────── */

interface ModeConfig {
  /** 优先分类 */
  preferredCategories: string[];
  /** 优先风格标签关键词 */
  preferredTags: string[];
  /** 排版偏好 */
  layoutPreference: ('top-bottom' | 'left-right' | 'frame' | 'center')[];
  /** 偏好颜色变体 */
  preferredVariants: string[];
}

const MODE_CONFIGS: Record<DecorateMode, ModeConfig> = {
  simple: {
    preferredCategories: ['minimal', 'cute'],
    preferredTags: ['minimal', 'simple', 'clean', '简约', '干净'],
    layoutPreference: ['left-right', 'frame'],
    preferredVariants: ['cream', 'mint'],
  },
  cute: {
    preferredCategories: ['cute', 'sweet', 'animal'],
    preferredTags: ['cute', 'sweet', 'kawaii', '可爱', '甜', '少女'],
    layoutPreference: ['top-bottom', 'frame', 'center'],
    preferredVariants: ['pink', 'rose', 'peach'],
  },
  korean: {
    preferredCategories: ['korean', 'soft', 'minimal'],
    preferredTags: ['korean', 'k-style', 'soft', '韩系', '柔软', '简约'],
    layoutPreference: ['left-right', 'top-bottom'],
    preferredVariants: ['lavender', 'cream', 'rose'],
  },
  dreamy: {
    preferredCategories: ['dreamy', 'soft', 'divider'],
    preferredTags: ['dreamy', 'moon', 'star', '梦幻', '月亮', '星星', '夜'],
    layoutPreference: ['center', 'top-bottom', 'frame'],
    preferredVariants: ['lavender', 'mint', 'pink'],
  },
};

/* ────────────────────────  工具函数  ──────────────────────── */

/** 随机打乱数组 */
function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** 从数组中随机取一个元素 */
function pickRandom<T>(arr: T[]): T | undefined {
  if (arr.length === 0) return undefined;
  return arr[Math.floor(Math.random() * arr.length)];
}

/** 计算素材与模式的匹配分数 */
function scoreItem(item: TextItem, config: ModeConfig): number {
  let score = 0;
  // 分类匹配
  if (config.preferredCategories.includes(item.category)) score += 30;
  // 标签匹配
  for (const tag of config.preferredTags) {
    if (item.tags.includes(tag)) score += 10;
  }
  // 颜色变体匹配
  if (config.preferredVariants.includes(item.variant)) score += 5;
  // 权重加分
  score += (item.popularity ?? 0) * 0.5;
  score += (item.favoriteCount ?? 0) * 0.3;
  score += (item.styleScore ?? 0) * 0.2;
  // 随机扰动避免每次结果完全一致
  score += Math.random() * 10;
  return score;
}

/** 按分数排序并取 top N */
function topNByScore(items: TextItem[], config: ModeConfig, n: number): TextItem[] {
  return items
    .map(item => ({ item, score: scoreItem(item, config) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map(x => x.item);
}

/* ────────────────────────  装饰排版引擎  ──────────────────────── */

/**
 * 排版方案 1：左右装饰
 * 示例：♡ 今天很开心 ♡
 */
function layoutLeftRight(
  userText: string,
  unicode: string,
  kaomoji?: string,
): string {
  if (kaomoji) {
    return `${unicode} ${userText} ${kaomoji}`;
  }
  return `${unicode} ${userText} ${unicode}`;
}

/**
 * 排版方案 2：上下结构
 * 示例：
 * ₊˚⊹ 今天很开心 ૮ ˶ᵔ ᵕ ᵔ˶ ა
 */
function layoutTopBottom(
  userText: string,
  unicode: string,
  kaomoji?: string,
  decoration?: string,
): string {
  const parts: string[] = [];
  if (decoration) parts.push(decoration);
  parts.push(`${unicode} ${userText}${kaomoji ? ` ${kaomoji}` : ''}`);
  if (decoration) parts.push(decoration);
  return parts.join('\n');
}

/**
 * 排版方案 3：边框装饰
 * 示例：
 * ˖⁺‧₊⟡
 * 今天很开心
 * ૮ ˶ᵔ ᵕ ᵔ˶ ა
 */
function layoutFrame(
  userText: string,
  unicode: string,
  kaomoji?: string,
  decoration?: string,
): string {
  const lines: string[] = [];
  if (decoration) {
    lines.push(decoration);
  } else {
    lines.push(unicode);
  }
  lines.push(userText);
  if (kaomoji) lines.push(kaomoji);
  if (decoration) lines.push(decoration);
  return lines.join('\n');
}

/**
 * 排版方案 4：居中点缀
 * 示例：
 * ⋆౨ৎ˚⟡˖࣪ 今天很开心
 */
function layoutCenter(
  userText: string,
  unicode: string,
  kaomoji?: string,
): string {
  if (kaomoji) {
    return `${unicode} ${userText}\n${kaomoji}`;
  }
  return `${unicode} ${userText}`;
}

/* ────────────────────────  核心生成函数  ──────────────────────── */

/**
 * AI 文字装饰主函数
 * @param inputText 用户输入的原始文字
 * @param mode 装饰模式
 * @returns 3 个装饰方案
 */
export function decorateText(inputText: string, mode: DecorateMode): DecorateOutput {
  const config = MODE_CONFIGS[mode];
  const trimmedText = inputText.trim();

  // 从素材库筛选候选素材
  const kaomojiPool = topNByScore(kaomojiLibrary, config, 12);
  const unicodePool = topNByScore(unicodeLibrary, config, 10);
  const decoPool = topNByScore(decorationLibrary, config, 8);

  // 3 个方案使用不同排版
  const layouts = shuffle([...config.layoutPreference]).slice(0, 3);
  // 补全到 3 个
  while (layouts.length < 3) {
    layouts.push(config.layoutPreference[layouts.length % config.layoutPreference.length]);
  }

  const results: DecorateResult[] = [];

  for (let i = 0; i < 3; i++) {
    const layout = layouts[i];

    // 每个方案选不同素材，避免重复
    const km = pickRandom(kaomojiPool.slice(i * 3, i * 3 + 4));
    const uc = pickRandom(unicodePool.slice(i * 2, i * 2 + 4));
    const dc = pickRandom(decoPool.slice(i * 2, i * 2 + 3));

    const kaomojiStr = km?.content;
    const unicodeStr = uc?.content;
    const decoStr = dc?.content;

    let text = '';
    let layoutDesc = '';

    switch (layout) {
      case 'left-right':
        text = layoutLeftRight(trimmedText, unicodeStr ?? '♡', kaomojiStr);
        layoutDesc = '左右装饰';
        break;
      case 'top-bottom':
        text = layoutTopBottom(trimmedText, unicodeStr ?? '♡', kaomojiStr, decoStr);
        layoutDesc = '上下结构';
        break;
      case 'frame':
        text = layoutFrame(trimmedText, unicodeStr ?? '♡', kaomojiStr, decoStr);
        layoutDesc = '边框装饰';
        break;
      case 'center':
        text = layoutCenter(trimmedText, unicodeStr ?? '♡', kaomojiStr);
        layoutDesc = '居中点缀';
        break;
    }

    results.push({
      text,
      mode,
      sources: {
        kaomoji: km,
        unicode: uc,
        decoration: dc,
      },
      layout: layoutDesc,
    });
  }

  return {
    inputText: trimmedText,
    mode,
    results,
  };
}

/* ────────────────────────  模式元信息  ──────────────────────── */

export const DECORATE_MODES: {
  id: DecorateMode;
  icon: string;
  labelEn: string;
  labelZh: string;
  descEn: string;
  descZh: string;
}[] = [
  {
    id: 'simple',
    icon: '✨',
    labelEn: 'Simple Decorate',
    labelZh: '简单装饰',
    descEn: 'Clean minimal accents',
    descZh: '干净简约的点缀',
  },
  {
    id: 'cute',
    icon: '🎀',
    labelEn: 'Cute Style',
    labelZh: '可爱风',
    descEn: 'Sweet kawaii decorations',
    descZh: '甜美可爱的装饰',
  },
  {
    id: 'korean',
    icon: '🤍',
    labelEn: 'Korean Style',
    labelZh: '韩系风',
    descEn: 'Soft K-style aesthetics',
    descZh: '柔软韩系美学',
  },
  {
    id: 'dreamy',
    icon: '🌙',
    labelEn: 'Dreamy Style',
    labelZh: '梦幻风',
    descEn: 'Dreamy moon & star vibes',
    descZh: '梦幻星辰氛围',
  },
];
