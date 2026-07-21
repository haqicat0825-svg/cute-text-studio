// ============================================================
// Cute Text Studio - AI 生成引擎
// 核心逻辑：从现有素材库中匹配 + 组合，不生成新素材
// ============================================================

import { cuteTextLibrary } from '@/data/cuteTextLibrary';
import { kaomojiLibrary } from '@/data/kaomojiLibrary';
import { unicodeLibrary } from '@/data/unicodeLibrary';
import { decorationLibrary } from '@/data/decorationLibrary';
import type { AIGenerationResult, TextItem, CategoryId } from '@/data/types';

// ===== 关键词映射表：用户输入 → 素材库标签匹配 =====
const KEYWORD_MAP: Record<string, string[]> = {
  // 场景类
  生日: ['birthday', 'happy', 'cake', '生日', '蛋糕', '庆祝'],
  birthday: ['birthday', 'happy', 'cake', '生日', '蛋糕'],
  咖啡: ['coffee', 'cafe', 'drink', '咖啡', '饮品'],
  coffee: ['coffee', 'cafe', 'drink', '咖啡'],
  旅行: ['travel', 'sea', 'summer', '旅行', '海', '夏天'],
  travel: ['travel', 'sea', 'summer', '旅行'],
  圣诞: ['christmas', 'snow', 'winter', '圣诞', '雪', '冬天'],
  christmas: ['christmas', 'snow', 'winter', '圣诞'],
  新年: ['new year', 'lucky', '新年', '幸运'],
  情人节: ['love', 'heart', 'valentine', '情人节', '爱心'],
  love: ['love', 'heart', '爱心', '心动', '恋'],
  恋爱: ['love', 'heart', 'sweet', '恋爱', '甜', '心动'],

  // 风格类
  甜妹: ['sweet', 'cute', 'pink', 'girl', '甜', '可爱', '少女'],
  sweet: ['sweet', 'cute', 'pink', 'girl', '甜', '可爱'],
  韩系: ['korean', 'korea', 'minimal', 'clean', '韩', '简约'],
  korean: ['korean', 'korea', 'minimal', '韩'],
  日系: ['japanese', 'japan', 'cute', '日', '可爱'],
  japanese: ['japanese', 'japan', 'cute', '日'],
  柔软: ['soft', 'gentle', 'dream', '柔', '梦', '温柔'],
  soft: ['soft', 'gentle', 'dream', '柔'],
  梦幻: ['dream', 'dreamy', 'moon', 'star', '梦', '月', '星', '幻'],
  dreamy: ['dream', 'dreamy', 'moon', 'star', '梦'],
  极简: ['minimal', 'simple', 'clean', '极简', '简单'],
  minimal: ['minimal', 'simple', 'clean', '极简'],
  可爱: ['cute', 'sweet', 'kawaii', '可爱', '萌'],
  cute: ['cute', 'sweet', 'kawaii', '可爱'],
  动物: ['animal', 'cat', 'bear', 'bunny', '动物', '猫', '熊', '兔'],
  animal: ['animal', 'cat', 'bear', 'bunny', '动物'],
  猫: ['cat', 'animal', '猫', '猫咪'],
  cat: ['cat', 'animal', '猫'],
  兔: ['bunny', 'rabbit', 'animal', '兔', '兔子'],
  bunny: ['bunny', 'rabbit', 'animal', '兔'],
  熊: ['bear', 'animal', '熊'],
  bear: ['bear', 'animal', '熊'],

  // 情绪类
  开心: ['happy', 'smile', 'giggle', '开心', '笑', '快乐'],
  happy: ['happy', 'smile', 'giggle', '开心'],
  害羞: ['shy', 'blush', '害羞', '脸红'],
  shy: ['shy', 'blush', '害羞'],
  困: ['sleep', 'tired', 'sleepy', '困', '累', '睡'],
  sleepy: ['sleep', 'tired', 'sleepy', '困', '睡'],
  哭: ['cry', 'sad', 'tear', '哭', '伤心'],
  sad: ['cry', 'sad', 'tear', '哭', '伤心'],

  // 颜色类
  粉色: ['pink', 'rose', '粉', '少女'],
  pink: ['pink', 'rose', '粉'],

  // 其他
  美食: ['food', 'cake', 'dessert', '美食', '甜点', '蛋糕'],
  food: ['food', 'cake', 'dessert', '美食'],
  海: ['sea', 'ocean', 'beach', 'shell', '海', '沙滩', '贝壳'],
  sea: ['sea', 'ocean', 'beach', 'shell', '海'],
  星星: ['star', 'sparkle', '星星', '闪'],
  star: ['star', 'sparkle', '星星'],
  月亮: ['moon', 'night', 'dream', '月亮', '夜晚'],
  moon: ['moon', 'night', 'dream', '月亮'],
  花朵: ['flower', 'bloom', '花', '花朵'],
  flower: ['flower', 'bloom', '花'],

  // 韩文关键词
  행복: ['happy', 'korean', '幸福', '开心'],
  좋아해요: ['love', 'korean', '喜欢', '爱'],
};

// ===== 分类偏好映射：用户输入风格 → 优先分类 =====
const STYLE_CATEGORY_MAP: Record<string, CategoryId[]> = {
  sweet: ['sweet', 'cute'],
  cute: ['cute', 'sweet'],
  korean: ['korean', 'minimal'],
  japanese: ['japanese', 'cute'],
  soft: ['soft', 'dreamy'],
  dreamy: ['dreamy', 'soft'],
  minimal: ['minimal', 'soft'],
  animal: ['animal', 'cute'],
  food: ['food', 'cute'],
};

/** 从用户输入中提取匹配关键词 */
function extractKeywords(input: string): string[] {
  const lower = input.toLowerCase().trim();
  const matched = new Set<string>();

  // 逐个检查关键词映射
  for (const [key, tags] of Object.entries(KEYWORD_MAP)) {
    if (lower.includes(key.toLowerCase())) {
      tags.forEach((t) => matched.add(t));
    }
  }

  // 如果没有匹配到任何关键词，使用通用可爱关键词
  if (matched.size === 0) {
    return ['cute', 'sweet', '可爱'];
  }

  return Array.from(matched);
}

/** 计算单个素材的匹配分数 */
function scoreItem(item: TextItem, keywords: string[]): number {
  let score = 0;

  // 1. 标签匹配分（权重最高）
  for (const tag of item.tags) {
    const lowerTag = tag.toLowerCase();
    for (const kw of keywords) {
      const lowerKw = kw.toLowerCase();
      if (lowerTag === lowerKw) {
        score += 10; // 精确匹配
      } else if (lowerTag.includes(lowerKw) || lowerKw.includes(lowerTag)) {
        score += 5; // 模糊匹配
      }
    }
  }

  // 2. 分类匹配分
  for (const kw of keywords) {
    if (item.category.includes(kw.toLowerCase())) {
      score += 3;
    }
  }

  // 3. mood 匹配分
  if (item.mood) {
    for (const kw of keywords) {
      if (item.mood.includes(kw)) {
        score += 4;
      }
    }
  }

  // 4. 权重加分（popularity + favoriteCount + styleScore）
  const popularity = item.popularity ?? 50;
  const favoriteCount = item.favoriteCount ?? 0;
  const styleScore = item.styleScore ?? 50;
  score += popularity * 0.1 + favoriteCount * 0.05 + styleScore * 0.05;

  return score;
}

/** 从数组中按分数选取 top N，加入随机性避免每次结果相同 */
function pickTopN(items: TextItem[], keywords: string[], n: number, excludeIds: Set<string>): TextItem[] {
  const scored = items
    .filter((item) => !excludeIds.has(item.id))
    .map((item) => ({ item, score: scoreItem(item, keywords) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  // 从 top 10 中随机选取，增加多样性
  const pool = scored.slice(0, Math.min(scored.length, 10));
  const result: TextItem[] = [];
  const used = new Set<number>();

  while (result.length < n && used.size < pool.length) {
    // 加权随机：分数越高被选中概率越大
    const idx = Math.floor(Math.random() * Math.random() * pool.length);
    if (!used.has(idx)) {
      used.add(idx);
      result.push(pool[idx].item);
    }
  }

  // 如果不够，从池中按顺序补
  for (let i = 0; i < pool.length && result.length < n; i++) {
    if (!used.has(i)) {
      result.push(pool[i].item);
    }
  }

  return result;
}

/** 从素材库中选取装饰线 */
function pickDecoration(keywords: string[], excludeIds: Set<string>): TextItem | null {
  const pool = [...decorationLibrary, ...unicodeLibrary.filter((u) => u.type === 'divider' || u.type === 'decoration')];
  const picked = pickTopN(pool, keywords, 1, excludeIds);
  return picked[0] ?? null;
}

/** 从颜文字库中选取 */
function pickKaomoji(keywords: string[], excludeIds: Set<string>, count: number): TextItem[] {
  return pickTopN(kaomojiLibrary, keywords, count, excludeIds);
}

/** 从可爱文字库中选取 */
function pickCuteText(keywords: string[], excludeIds: Set<string>, count: number): TextItem[] {
  return pickTopN(cuteTextLibrary, keywords, count, excludeIds);
}

/** 从 Unicode 库中选取装饰符号 */
function pickUnicode(keywords: string[], excludeIds: Set<string>, count: number): TextItem[] {
  return pickTopN(unicodeLibrary, keywords, count, excludeIds);
}

/** 生成结果标题 */
function generateTitle(input: string, keywords: string[]): string {
  const lower = input.toLowerCase();

  // 根据关键词生成标题
  if (lower.includes('生日') || lower.includes('birthday')) {
    return 'Birthday Sweet Style';
  }
  if (lower.includes('韩') || lower.includes('korean')) {
    return 'Korean Aesthetic';
  }
  if (lower.includes('梦') || lower.includes('dream')) {
    return 'Dreamy Vibes';
  }
  if (lower.includes('动物') || lower.includes('animal') || lower.includes('cat') || lower.includes('猫')) {
    return 'Cute Animal Style';
  }
  if (lower.includes('甜') || lower.includes('sweet') || lower.includes('cute')) {
    return 'Sweet Girl Style';
  }
  if (lower.includes('soft') || lower.includes('柔')) {
    return 'Soft Life Aesthetic';
  }
  if (lower.includes('minimal') || lower.includes('极简')) {
    return 'Minimal Clean Style';
  }

  // 默认标题
  return keywords.slice(0, 2).map((k) => k.charAt(0).toUpperCase() + k.slice(1)).join(' ') + ' Style';
}

/** 推断分类 */
function inferCategory(input: string, keywords: string[]): CategoryId {
  const lower = input.toLowerCase();
  if (lower.includes('动物') || lower.includes('animal') || lower.includes('cat') || lower.includes('猫') || lower.includes('bear') || lower.includes('熊')) return 'animal';
  if (lower.includes('梦') || lower.includes('dream') || lower.includes('moon') || lower.includes('月')) return 'dreamy';
  if (lower.includes('韩') || lower.includes('korean')) return 'korean';
  if (lower.includes('日') || lower.includes('japanese')) return 'japanese';
  if (lower.includes('食物') || lower.includes('美食') || lower.includes('food') || lower.includes('cake') || lower.includes('蛋糕')) return 'food';
  if (lower.includes('极简') || lower.includes('minimal')) return 'minimal';
  if (lower.includes('柔') || lower.includes('soft')) return 'soft';
  if (lower.includes('甜') || lower.includes('sweet') || lower.includes('cute') || lower.includes('可爱')) return 'sweet';
  // 从关键词推断
  for (const kw of keywords) {
    if (STYLE_CATEGORY_MAP[kw]) return STYLE_CATEGORY_MAP[kw][0] as CategoryId;
  }
  return 'cute';
}

/** 推断卡片颜色 */
function inferVariant(category: CategoryId): { variant: TextItem['variant']; tagColor: TextItem['tagColor'] } {
  const map: Record<CategoryId, { variant: TextItem['variant']; tagColor: TextItem['tagColor'] }> = {
    sweet: { variant: 'pink', tagColor: 'pink' },
    cute: { variant: 'rose', tagColor: 'rose' },
    korean: { variant: 'cream', tagColor: 'peach' },
    japanese: { variant: 'pink', tagColor: 'coral' },
    soft: { variant: 'lavender', tagColor: 'lavender' },
    minimal: { variant: 'mint', tagColor: 'mint' },
    animal: { variant: 'cream', tagColor: 'mint' },
    food: { variant: 'peach', tagColor: 'peach' },
    dreamy: { variant: 'lavender', tagColor: 'lavender' },
    divider: { variant: 'cream', tagColor: 'peach' },
  };
  return map[category] ?? { variant: 'pink', tagColor: 'pink' };
}

/**
 * AI 生成核心函数
 * 从素材库中匹配素材，组合成新的排版
 *
 * @param input 用户输入的需求描述
 * @returns 生成结果
 */
export function generateFromLibrary(input: string): AIGenerationResult {
  const keywords = extractKeywords(input);
  const category = inferCategory(input, keywords);
  const { variant, tagColor } = inferVariant(category);

  const usedIds = new Set<string>();
  const sourceItems: TextItem[] = [];
  const contentParts: string[] = [];
  const reasonParts: string[] = [];

  // 第一步：选取标题文字（cuteText）
  const cuteTexts = pickCuteText(keywords, usedIds, 1);
  if (cuteTexts[0]) {
    usedIds.add(cuteTexts[0].id);
    sourceItems.push(cuteTexts[0]);
    contentParts.push(cuteTexts[0].content);
    reasonParts.push(`文字：${cuteTexts[0].title}`);
  }

  // 第二步：选取装饰符号（unicode）
  const unicodes = pickUnicode(keywords, usedIds, 1);
  if (unicodes[0]) {
    usedIds.add(unicodes[0].id);
    sourceItems.push(unicodes[0]);
    contentParts.push(unicodes[0].content);
    reasonParts.push(`符号：${unicodes[0].title}`);
  }

  // 第三步：选取颜文字
  const kaomojis = pickKaomoji(keywords, usedIds, 1);
  if (kaomojis[0]) {
    usedIds.add(kaomojis[0].id);
    sourceItems.push(kaomojis[0]);
    contentParts.push(kaomojis[0].content);
    reasonParts.push(`颜文字：${kaomojis[0].title}`);
  }

  // 第四步：选取装饰线/边框
  const decoration = pickDecoration(keywords, usedIds);
  if (decoration) {
    usedIds.add(decoration.id);
    sourceItems.push(decoration);
    contentParts.push(decoration.content);
    reasonParts.push(`装饰：${decoration.title}`);
  }

  // 如果素材不足，用通用可爱素材补充
  if (sourceItems.length < 3) {
    const fallback = pickTopN([...kaomojiLibrary, ...unicodeLibrary], ['cute', 'sweet', '可爱'], 3 - sourceItems.length, usedIds);
    for (const item of fallback) {
      usedIds.add(item.id);
      sourceItems.push(item);
      contentParts.push(item.content);
    }
  }

  const title = generateTitle(input, keywords);
  const allTags = Array.from(new Set(sourceItems.flatMap((item) => item.tags))).slice(0, 6);

  return {
    id: `ai-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title,
    content: contentParts.join('\n\n'),
    sourceIds: sourceItems.map((item) => item.id),
    category,
    style: sourceItems[0]?.style ?? 'Cute',
    tags: allTags,
    variant,
    tagColor,
    type: 'cute-text',
    reason: `根据"${input}"匹配到 ${sourceItems.length} 个素材：${reasonParts.join('、')}`,
  };
}

/**
 * 批量生成多个结果（用于"再生成"功能）
 */
export function generateMultiple(input: string, count: number = 3): AIGenerationResult[] {
  const results: AIGenerationResult[] = [];
  for (let i = 0; i < count; i++) {
    results.push(generateFromLibrary(input));
  }
  return results;
}

/**
 * 获取素材库统计信息（用于显示"参考素材库"信息）
 */
export function getLibraryStats() {
  return {
    kaomoji: kaomojiLibrary.length,
    unicode: unicodeLibrary.length,
    cuteText: cuteTextLibrary.length,
    decoration: decorationLibrary.length,
    total: kaomojiLibrary.length + unicodeLibrary.length + cuteTextLibrary.length + decorationLibrary.length,
  };
}
