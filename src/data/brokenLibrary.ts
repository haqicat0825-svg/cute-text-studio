// ============================================================
// Broken Library - 异常素材库
// ------------------------------------------------------------
// 存放从正式素材库中移出的无法正常显示的素材
// 每条记录保留原始内容和异常原因，便于排查和修复
// ============================================================

import type { BrokenItem } from './types';

export const brokenLibrary: BrokenItem[] = [
  {
    id: 'km-broken-001',
    originalText: 'ᐟ.ᐟ\u202a ₊⁺♡̶₊⁺',
    errorReason: '包含 LRE (Left-to-Right Embedding, U+202A) 双向控制字符，浏览器可能渲染异常',
    category: 'cute',
    type: 'kaomoji',
    title: 'Sparkle Heart',
    movedAt: '2025-07-21T20:30:00.000Z',
  },
  {
    id: 'km-broken-002',
    originalText: '𓅿𓅹\u202c𓅿𓅹\u202c𓅿𓅹\u202c𓅿𓅹 \u202cෆ⃛',
    errorReason: '包含多个 PDF (Pop Directional Formatting, U+202C) 双向控制字符，导致文字方向混乱',
    category: 'dreamy',
    type: 'kaomoji',
    title: 'Bird Dreamy',
    movedAt: '2025-07-21T20:30:00.000Z',
  },
  {
    id: 'km-broken-003',
    originalText: '𖤣𖥧𖥣｡𖤣𖥧𖥣｡𓎩𓌉𓇋 \u200e❁⃘𖤣𖥧*ﾟ',
    errorReason: '包含 LRM (Left-to-Right Mark, U+200E) 不可见控制字符，影响复制和显示',
    category: 'cute',
    type: 'kaomoji',
    title: 'Cute Food Set',
    movedAt: '2025-07-21T20:30:00.000Z',
  },
  {
    id: 'uc-broken-001',
    originalText: '🌨 ꪔ̤̫\u202cꪔ̤̱ꪔ̤̮ꪔ̤̥',
    errorReason: '包含 PDF (Pop Directional Formatting, U+202C) 双向控制字符，导致字符顺序错乱',
    category: 'cute',
    type: 'unicode',
    title: 'Snow Cute',
    movedAt: '2025-07-21T20:30:00.000Z',
  },
  {
    id: 'uc-broken-002',
    originalText: '\u200e🥞・・ 🥞',
    errorReason: '包含 LRM (Left-to-Right Mark, U+200E) 不可见控制字符，影响复制',
    category: 'food',
    type: 'unicode',
    title: 'Pancake',
    movedAt: '2025-07-21T20:30:00.000Z',
  },
  {
    id: 'dv-broken-001',
    originalText: 'ᐟ.ᐟ\u202a ₊⁺♡̶₊⁺',
    errorReason: '包含 LRE (Left-to-Right Embedding, U+202A) 双向控制字符，浏览器可能渲染异常',
    category: 'cute',
    type: 'decoration',
    title: 'Sparkle Heart Deco',
    movedAt: '2025-07-21T20:30:00.000Z',
  },
  {
    id: 'dv-broken-002',
    originalText: '𓅿𓅹\u202c𓅿𓅹\u202c𓅿𓅹\u202c𓅿𓅹 \u202cෆ⃛',
    errorReason: '包含多个 PDF (Pop Directional Formatting, U+202C) 双向控制字符，导致文字方向混乱',
    category: 'dreamy',
    type: 'decoration',
    title: 'Bird Dreamy Deco',
    movedAt: '2025-07-21T20:30:00.000Z',
  },
];
