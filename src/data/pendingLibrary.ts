// ============================================================
// Pending Library - 待审核素材库
// ------------------------------------------------------------
// 新导入的素材先放入此库，经 Material Manager 审核通过后
// 再移入对应的正式素材库（kaomojiLibrary / unicodeLibrary 等）
//
// 导入流程：
// 1. 将新素材添加到此文件的 pendingLibrary 数组中
// 2. 打开 /manager 页面进行预览检查
// 3. 点击 Approve 移入正式库，或点击 Reject 移入 brokenLibrary
//
// 示例格式：
// {
//   id: 'pending-001',
//   title: '新素材标题',
//   content: '素材内容',
//   category: 'cute',        // 参考 CategoryId 类型
//   style: 'Cute',
//   tags: ['cute', '可爱'],
//   variant: 'pink',
//   tagColor: 'pink',
//   type: 'kaomoji',         // kaomoji / unicode / decoration / cute-text
//   status: 'pending',
//   createdAt: new Date().toISOString(),
// }
// ============================================================

import type { TextItem } from './types';

export const pendingLibrary: TextItem[] = [
  // 新素材添加到这里，审核通过后会移入正式库
];
