/**
 * 素材库统一入口
 * 合并所有素材库，提供统一的查询接口
 */

import type { TextItem, CategoryId } from './types';
import { cuteTextLibrary } from './cuteTextLibrary';
import { kaomojiLibrary } from './kaomojiLibrary';
import { unicodeLibrary } from './unicodeLibrary';

/** 所有素材合集 */
export const allItems: TextItem[] = [
  ...cuteTextLibrary,
  ...kaomojiLibrary,
  ...unicodeLibrary,
];

/** 分类配置 */
export const categories = [
  { id: 'all' as const, label: 'All', icon: '💕' },
  { id: 'sweet' as const, label: 'Sweet Girl', icon: '🎀' },
  { id: 'japanese' as const, label: 'Japanese Cute', icon: '🌸' },
  { id: 'korean' as const, label: 'Korean Style', icon: '🤍' },
  { id: 'soft' as const, label: 'Soft Life', icon: '☁' },
  { id: 'minimal' as const, label: 'Minimal', icon: '✨' },
  { id: 'animal' as const, label: 'Animal', icon: '🐰' },
  { id: 'divider' as const, label: 'Divider', icon: '✦' },
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
  sweet: 'Sweet Girl',
  japanese: 'Japanese Cute',
  korean: 'Korean Style',
  soft: 'Soft Life',
  minimal: 'Minimal',
  animal: 'Animal',
  divider: 'Divider',
};

/** 分类 ID 到中文名的映射 */
export const categoryToZh: Record<CategoryId, string> = {
  sweet: '甜妹风',
  japanese: '日系可爱',
  korean: '韩系风格',
  soft: '柔软生活',
  minimal: '极简',
  animal: '小动物',
  divider: '装饰线',
};

/**
 * 搜索素材：按关键词匹配 category / style / tags / content / title
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
    // 搜索 category 中文名
    if (categoryToZh[item.category].includes(q)) return true;
    // 搜索 category 英文名
    if (item.category.toLowerCase().includes(q)) return true;
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
