/**
 * 素材库统一入口
 * 合并所有素材库，提供统一的查询接口
 */

import type { TextItem, CategoryId } from './types';
import { cuteTextLibrary } from './cuteTextLibrary';
import { kaomojiLibrary } from './kaomojiLibrary';
import { unicodeLibrary } from './unicodeLibrary';
import { decorationLibrary } from './decorationLibrary';

/** 所有素材合集 */
export const allItems: TextItem[] = [
  ...cuteTextLibrary,
  ...kaomojiLibrary,
  ...unicodeLibrary,
  ...decorationLibrary,
];

/** 分类配置 */
export const categories = [
  { id: 'all' as const, label: 'All', labelZh: '全部', icon: '💕' },
  { id: 'cute' as const, label: 'Cute', labelZh: '可爱颜文字', icon: '🎀' },
  { id: 'dreamy' as const, label: 'Dreamy', labelZh: '梦幻氛围', icon: '🌙' },
  { id: 'animal' as const, label: 'Animal', labelZh: '动物系', icon: '🐰' },
  { id: 'food' as const, label: 'Food', labelZh: '日常生活', icon: '🍰' },
  { id: 'sweet' as const, label: 'Sweet Girl', labelZh: '甜妹风', icon: '💗' },
  { id: 'japanese' as const, label: 'Japanese Cute', labelZh: '日系可爱', icon: '🌸' },
  { id: 'korean' as const, label: 'Korean Style', labelZh: '韩系风格', icon: '🤍' },
  { id: 'soft' as const, label: 'Soft Life', labelZh: '柔软生活', icon: '☁' },
  { id: 'minimal' as const, label: 'Minimal', labelZh: '极简', icon: '✨' },
  { id: 'divider' as const, label: 'Divider', labelZh: '装饰线', icon: '✦' },
];

/** 搜索示例（中英文混合） */
export const searchExamples = [
  'pink birthday style',
  'soft korean aesthetic',
  'summer diary',
];

/** 中文搜索示例 */
export const searchExamplesZh = [
  '生日甜妹风',
  '韩系柔软',
  '夏天日记',
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
  cute: '可爱颜文字',
  dreamy: '梦幻氛围',
  animal: '动物系',
  food: '日常生活',
  sweet: '甜妹风',
  japanese: '日系可爱',
  korean: '韩系风格',
  soft: '柔软生活',
  minimal: '极简',
  divider: '装饰线',
};

/**
 * 搜索素材：按关键词匹配 category / style / tags / content / title / mood
 * 支持中英文混合搜索
 */
export function searchItems(query: string): TextItem[] {
  if (!query.trim()) return allItems;

  const q = query.toLowerCase().trim();
  return allItems.filter((item) => {
    // 搜索 style
    if (item.style.toLowerCase().includes(q)) return true;
    // 搜索 tags
    if (item.tags.some((tag) => tag.toLowerCase().includes(q))) return true;
    // 搜索 content
    if (item.content.toLowerCase().includes(q)) return true;
    // 搜索 title
    if (item.title.toLowerCase().includes(q)) return true;
    // 搜索 mood
    if (item.mood && item.mood.toLowerCase().includes(q)) return true;
    // 搜索 category 中文名
    if (categoryToZh[item.category].includes(q)) return true;
    // 搜索 category 英文名
    if (item.category.toLowerCase().includes(q)) return true;
    // 搜索分类 label
    const cat = categories.find((c) => c.id === item.category);
    if (cat && cat.label.toLowerCase().includes(q)) return true;
    return false;
  });
}

/**
 * 按分类筛选素材
 */
export function filterByCategory(categoryId: string): TextItem[] {
  if (categoryId === 'all') return allItems;
  return allItems.filter((item) => item.category === categoryId);
}

/**
 * 搜索 + 分类筛选组合
 */
export function searchAndFilter(query: string, categoryId: string): TextItem[] {
  const searched = query.trim() ? searchItems(query) : allItems;
  if (categoryId === 'all') return searched;
  return searched.filter((item) => item.category === categoryId);
}

/** 向后兼容：旧的 textItems 导出 */
export { cuteTextLibrary as textItems };

/** 类型导出 */
export type { TextItem, CategoryId } from './types';
