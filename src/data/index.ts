/**
 * 素材库统一入口
 * 合并所有素材库，提供统一的查询接口
 * 包含状态过滤、验证素材导出、统计等功能
 */

import type { TextItem, CategoryId, MaterialStats, ItemType } from './types';
import { cuteTextLibrary } from './cuteTextLibrary';
import { kaomojiLibrary } from './kaomojiLibrary';
import { unicodeLibrary } from './unicodeLibrary';
import { decorationLibrary } from './decorationLibrary';
import { brokenLibrary } from './brokenLibrary';
import { pendingLibrary } from './pendingLibrary';

/** 确保素材有 status 字段，默认为 verified */
function withDefaultStatus(items: TextItem[]): TextItem[] {
  return items.map((item) => ({
    ...item,
    status: item.status ?? 'verified',
  }));
}

/** 所有正式库素材合集（含 status 字段） */
export const allItems: TextItem[] = withDefaultStatus([
  ...cuteTextLibrary,
  ...kaomojiLibrary,
  ...unicodeLibrary,
  ...decorationLibrary,
]);

/** 仅已验证的素材（AI 生成器唯一可用数据源） */
export const verifiedItems: TextItem[] = allItems.filter(
  (item) => item.status === 'verified'
);

/** 待审核素材 */
export const pendingItems: TextItem[] = pendingLibrary;

/** 异常素材（BrokenItem 格式，非 TextItem） */
export { brokenLibrary };

/** 分类配置 */
export const categories = [
  { id: 'all' as const, label: 'All', labelZh: '\u5168\u90e8', icon: '\u{1F495}' },
  { id: 'cute' as const, label: 'Cute', labelZh: '\u53ef\u7231\u989c\u6587\u5b57', icon: '\u{1F380}' },
  { id: 'dreamy' as const, label: 'Dreamy', labelZh: '\u68a6\u5e7b\u6c1b\u56f4', icon: '\u{1F319}' },
  { id: 'animal' as const, label: 'Animal', labelZh: '\u52a8\u7269\u7cfb', icon: '\u{1F430}' },
  { id: 'food' as const, label: 'Food', labelZh: '\u65e5\u5e38\u751f\u6d3b', icon: '\u{1F370}' },
  { id: 'sweet' as const, label: 'Sweet Girl', labelZh: '\u751c\u59b9\u98ce', icon: '\u{1F497}' },
  { id: 'japanese' as const, label: 'Japanese Cute', labelZh: '\u65e5\u7cfb\u53ef\u7231', icon: '\u{1F338}' },
  { id: 'korean' as const, label: 'Korean Style', labelZh: '\u97e9\u7cfb\u98ce\u683c', icon: '\u{1F90D}' },
  { id: 'soft' as const, label: 'Soft Life', labelZh: '\u67d4\u8f6f\u751f\u6d3b', icon: '\u2601' },
  { id: 'minimal' as const, label: 'Minimal', labelZh: '\u6781\u7b80', icon: '\u2728' },
  { id: 'divider' as const, label: 'Divider', labelZh: '\u88c5\u9970\u7ebf', icon: '\u2726' },
];

/** 搜索示例（中英文混合） */
export const searchExamples = [
  'pink birthday style',
  'soft korean aesthetic',
  'summer diary',
];

/** 中文搜索示例 */
export const searchExamplesZh = [
  '\u751f\u65e5\u751c\u59b9\u98ce',
  '\u97e9\u7cfb\u67d4\u8f6f',
  '\u590f\u5929\u65e5\u8bb0',
];

/** 分类 ID 到 style 标签的映射 */
export const categoryToStyle: Record<CategoryId, string> = {
  cute: 'Cute',
  dreamy: 'Dreamy',
  animal: 'Animal',
  food: 'Food',
  sweet: 'Sweet Girl',
  japanese: 'Japanese Cute',
  korean: 'Korean Style',
  soft: 'Soft Life',
  minimal: 'Minimal',
  divider: 'Divider',
};

/** 分类 ID 到中文名的映射 */
export const categoryToZh: Record<CategoryId, string> = {
  cute: '\u53ef\u7231\u989c\u6587\u5b57',
  dreamy: '\u68a6\u5e7b\u6c1b\u56f4',
  animal: '\u52a8\u7269\u7cfb',
  food: '\u65e5\u5e38\u751f\u6d3b',
  sweet: '\u751c\u59b9\u98ce',
  japanese: '\u65e5\u7cfb\u53ef\u7231',
  korean: '\u97e9\u7cfb\u98ce\u683c',
  soft: '\u67d4\u8f6f\u751f\u6d3b',
  minimal: '\u6781\u7b80',
  divider: '\u88c5\u9970\u7ebf',
};

/**
 * 搜索素材：按关键词匹配 category / style / tags / content / title / mood
 * 仅在 verified 素材中搜索
 * 支持中英文混合搜索
 */
export function searchItems(query: string): TextItem[] {
  if (!query.trim()) return verifiedItems;

  const q = query.toLowerCase().trim();
  return verifiedItems.filter((item) => {
    if (item.style.toLowerCase().includes(q)) return true;
    if (item.tags.some((tag) => tag.toLowerCase().includes(q))) return true;
    if (item.content.toLowerCase().includes(q)) return true;
    if (item.title.toLowerCase().includes(q)) return true;
    if (item.mood && item.mood.toLowerCase().includes(q)) return true;
    if (categoryToZh[item.category].includes(q)) return true;
    if (item.category.toLowerCase().includes(q)) return true;
    const cat = categories.find((c) => c.id === item.category);
    if (cat && cat.label.toLowerCase().includes(q)) return true;
    return false;
  });
}

/**
 * 按分类筛选素材（仅 verified）
 */
export function filterByCategory(categoryId: string): TextItem[] {
  if (categoryId === 'all') return verifiedItems;
  return verifiedItems.filter((item) => item.category === categoryId);
}

/**
 * 搜索 + 分类筛选组合（仅 verified）
 */
export function searchAndFilter(query: string, categoryId: string): TextItem[] {
  const searched = query.trim() ? searchItems(query) : verifiedItems;
  if (categoryId === 'all') return searched;
  return searched.filter((item) => item.category === categoryId);
}

/**
 * 获取素材统计信息
 */
export function getMaterialStats(): MaterialStats {
  const byType: Record<ItemType, number> = {
    kaomoji: 0,
    'cute-text': 0,
    unicode: 0,
    divider: 0,
    decoration: 0,
  };

  const byCategory: Record<string, number> = {};

  for (const item of allItems) {
    byType[item.type] = (byType[item.type] || 0) + 1;
    byCategory[item.category] = (byCategory[item.category] || 0) + 1;
  }

  return {
    total: allItems.length,
    verified: allItems.filter((i) => i.status === 'verified').length,
    pending: pendingItems.length,
    broken: brokenLibrary.length,
    byType,
    byCategory,
  };
}

/** 向后兼容：旧的 textItems 导出 */
export { cuteTextLibrary as textItems };

/** 类型导出 */
export type { TextItem, CategoryId, MaterialStats, ItemType } from './types';
