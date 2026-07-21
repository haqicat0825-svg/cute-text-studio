/**
 * useFavorites - 收藏管理 Hook
 * 使用 localStorage 持久化收藏数据
 * 收藏格式：存储完整 TextItem 对象，便于 Collection 页面直接渲染
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import type { TextItem } from '@/data/types';

const STORAGE_KEY = 'cute-text-studio-favorites';

export interface FavoriteItem extends TextItem {
  /** 收藏时间戳，用于排序 */
  savedAt: number;
}

function readFromStorage(): FavoriteItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeToStorage(items: FavoriteItem[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // localStorage 写入失败时静默处理
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // 客户端挂载后读取 localStorage
  useEffect(() => {
    setFavorites(readFromStorage());
    setHydrated(true);
  }, []);

  // 监听其他标签页的收藏变化
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setFavorites(readFromStorage());
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  /** 检查某素材是否已收藏 */
  const isFavorited = useCallback(
    (id: string) => favorites.some((item) => item.id === id),
    [favorites],
  );

  /** 切换收藏状态 */
  const toggleFavorite = useCallback((item: TextItem) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === item.id);
      let next: FavoriteItem[];
      if (exists) {
        next = prev.filter((f) => f.id !== item.id);
      } else {
        next = [{ ...item, savedAt: Date.now() }, ...prev];
      }
      writeToStorage(next);
      return next;
    });
  }, []);

  /** 移除收藏 */
  const removeFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = prev.filter((f) => f.id !== id);
      writeToStorage(next);
      return next;
    });
  }, []);

  /** 清空所有收藏 */
  const clearFavorites = useCallback(() => {
    writeToStorage([]);
    setFavorites([]);
  }, []);

  return {
    favorites,
    isFavorited,
    toggleFavorite,
    removeFavorite,
    clearFavorites,
    hydrated,
    count: favorites.length,
  };
}
