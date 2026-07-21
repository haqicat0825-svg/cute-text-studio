/**
 * 素材数据通用类型定义
 * 所有素材库共用此类型结构
 */

export type VariantColor =
  | 'pink'
  | 'cream'
  | 'lavender'
  | 'mint'
  | 'rose'
  | 'peach';

export type TagColor =
  | 'pink'
  | 'rose'
  | 'lavender'
  | 'mint'
  | 'peach'
  | 'coral';

export type CategoryId =
  | 'sweet'
  | 'japanese'
  | 'korean'
  | 'soft'
  | 'minimal'
  | 'animal'
  | 'divider'
  | 'cute'
  | 'dreamy'
  | 'food';

export type ContentType = 'cute-text' | 'kaomoji' | 'unicode' | 'divider' | 'decoration';

/**
 * 单个素材项的统一结构
 */
export interface TextItem {
  /** 唯一标识 */
  id: string;
  /** 标题 */
  title: string;
  /** 文字内容 */
  content: string;
  /** 分类 ID（用于筛选） */
  category: CategoryId;
  /** 风格标签（显示用） */
  style: string;
  /** 标签数组（用于搜索匹配） */
  tags: string[];
  /** 卡片背景色变体 */
  variant: VariantColor;
  /** 标签文字颜色变体 */
  tagColor: TagColor;
  /** 内容类型 */
  type: ContentType;
  /** 氛围/情绪标签（可选） */
  mood?: string;
}
