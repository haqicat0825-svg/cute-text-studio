// ============================================================
// Cute Text Studio - 素材类型定义
// ============================================================

/** 素材分类 ID */
export type CategoryId =
  | 'sweet' // 🎀 Sweet Girl
  | 'japanese' // 🌸 Japanese Cute
  | 'korean' // 🤍 Korean Style
  | 'soft' // ☁ Soft Life
  | 'minimal' // ✨ Minimal
  | 'animal' // 🐰 Animal
  | 'divider' // ✦ Divider
  | 'cute' // 🎀 Cute（可爱颜文字）
  | 'dreamy' // 🌙 Dreamy（梦幻氛围）
  | 'food'; // 🍰 Food（日常生活）

/** 素材类型 */
export type ItemType = 'kaomoji' | 'cute-text' | 'unicode' | 'divider' | 'decoration';

/** 卡片颜色变体 */
export type Variant = 'pink' | 'cream' | 'lavender' | 'mint' | 'rose' | 'peach';

/** 标签颜色 */
export type TagColor = 'pink' | 'rose' | 'lavender' | 'mint' | 'peach' | 'coral';

/**
 * 素材数据结构
 * 每个素材必须包含以下字段
 */
export interface TextItem {
  /** 唯一 ID，格式：前缀-编号（如 km-001） */
  id: string;
  /** 卡片标题 */
  title: string;
  /** 素材内容（保持原字符，不做修改） */
  content: string;
  /** 分类 ID */
  category: CategoryId;
  /** 显示风格名 */
  style: string;
  /** 搜索关键词（中英文混合） */
  tags: string[];
  /** 卡片颜色变体 */
  variant: Variant;
  /** 标签颜色 */
  tagColor: TagColor;
  /** 素材类型 */
  type: ItemType;
  /** 情绪关键词（可选） */
  mood?: string;

  // ===== 权重系统（AI 生成优先级参考） =====
  /** 人气值（0-100，越高越优先被 AI 选中） */
  popularity?: number;
  /** 收藏数（模拟值，用于排序权重） */
  favoriteCount?: number;
  /** 风格匹配分（0-100，越高风格越突出） */
  styleScore?: number;
}

/** 分类信息 */
export interface Category {
  id: CategoryId;
  label: string;
  labelZh: string;
  icon: string;
}

/** AI 生成结果 */
export interface AIGenerationResult {
  /** 生成结果的唯一 ID */
  id: string;
  /** 生成标题 */
  title: string;
  /** 组合后的完整内容 */
  content: string;
  /** 使用的素材 ID 列表 */
  sourceIds: string[];
  /** 分类 */
  category: CategoryId;
  /** 风格 */
  style: string;
  /** 标签 */
  tags: string[];
  /** 卡片颜色 */
  variant: Variant;
  /** 标签颜色 */
  tagColor: TagColor;
  /** 类型 */
  type: ItemType;
  /** 生成依据说明 */
  reason: string;
}
