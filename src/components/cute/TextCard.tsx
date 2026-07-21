'use client';

import { useState, useCallback } from 'react';
import { useFavorites } from '@/hooks/useFavorites';
import { useLanguage } from '@/components/providers/LanguageProvider';
import type { TextItem } from '@/data/types';

/**
 * TextCard - 瀑布流中的单个文字卡片
 * 包含：标题、可爱文字内容、风格标签、收藏按钮、Copy按钮、复制成功动画
 * 收藏状态通过 localStorage 持久化
 */

interface TextCardProps {
  item: TextItem;
  /** 入场动画延迟（秒） */
  delay?: number;
}

const variantStyles: Record<TextItem['variant'], string> = {
  pink: 'bg-[#FFF5F0] border-[#FFD1DC]',
  cream: 'bg-[#FFFBF7] border-[#FFE4D6]',
  lavender: 'bg-[#F8F0FC] border-[#E8D5F2]',
  mint: 'bg-[#F2FAF5] border-[#C8E6D5]',
  rose: 'bg-[#FFF0F5] border-[#FFB6C9]',
  peach: 'bg-[#FFF7F0] border-[#FFD4B8]',
};

const tagColors: Record<TextItem['tagColor'], string> = {
  pink: 'bg-[#FFD1DC] text-[#C9506A]',
  rose: 'bg-[#FFB6C9] text-[#D94A6A]',
  lavender: 'bg-[#E8D5F2] text-[#8B5AA6]',
  mint: 'bg-[#C8E6D5] text-[#4A8A6A]',
  peach: 'bg-[#FFD4B8] text-[#C97A4A]',
  coral: 'bg-[#FFC4B8] text-[#D95A4A]',
};

const titleColors: Record<TextItem['variant'], string> = {
  pink: 'text-[#E8638A]',
  cream: 'text-[#C97B5E]',
  lavender: 'text-[#9B6BB5]',
  mint: 'text-[#5E9B7A]',
  rose: 'text-[#D94A6A]',
  peach: 'text-[#C97A4A]',
};

export default function TextCard({ item, delay = 0 }: TextCardProps) {
  const { t } = useLanguage();
  const { isFavorited, toggleFavorite } = useFavorites();
  const [copied, setCopied] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const favorited = isFavorited(item.id);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(item.content);
      setCopied(true);
      setToastVisible(true);
      setTimeout(() => {
        setCopied(false);
        setTimeout(() => setToastVisible(false), 200);
      }, 1200);
    } catch {
      // 剪贴板权限失败时静默处理
    }
  }, [item.content]);

  const handleFavorite = useCallback(() => {
    toggleFavorite(item);
  }, [item, toggleFavorite]);

  return (
    <div
      className={`ct-shadow-soft ct-shadow-soft-hover group relative break-inside-avoid rounded-3xl border-2 p-5 transition-all duration-300 hover:-translate-y-1 ${variantStyles[item.variant]}`}
      style={{
        animation: 'ct-fade-up 0.6s ease-out both',
        animationDelay: `${delay}s`,
      }}
    >
      {/* 复制成功 Toast */}
      {toastVisible && (
        <div
          className={`absolute -top-3 right-4 z-20 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-white shadow-lg ${
            copied ? 'ct-anim-toast-in' : 'ct-anim-toast-out'
          }`}
          style={{
            background: 'linear-gradient(135deg, #5E9B7A 0%, #4A8A6A 100%)',
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 13l4 4L19 7"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {t.common.copied}
        </div>
      )}

      {/* 卡片标题 - 杂志风格 */}
      <h3
        className={`mb-2 font-display text-lg font-semibold tracking-wide ${titleColors[item.variant]}`}
      >
        {item.title}
      </h3>

      {/* 分隔装饰 */}
      <div className="mb-3 flex items-center gap-2">
        <div className={`h-px flex-1 ${titleColors[item.variant]} opacity-30`} />
        <span className="text-xs opacity-40">✦</span>
        <div className={`h-px flex-1 ${titleColors[item.variant]} opacity-30`} />
      </div>

      {/* 卡片文字内容 - 艺术感展示 */}
      <div className="mb-4 rounded-2xl bg-white/50 p-4">
        <pre className="whitespace-pre-wrap break-words font-sans text-lg leading-relaxed text-[#5c4a4a]">
          {item.content}
        </pre>
      </div>

      {/* 标签 */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {item.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-white/60 px-2.5 py-1 text-xs text-[#9b8585]"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* 底部操作栏 */}
      <div className="flex items-center justify-between">
        {/* 风格标签 */}
        <span
          className={`rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide ${tagColors[item.tagColor]}`}
        >
          {item.style}
        </span>

        {/* 按钮组 */}
        <div className="flex items-center gap-2">
          {/* Copy 按钮 */}
          <button
            type="button"
            onClick={handleCopy}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-[#9b8585] shadow-sm transition-all hover:bg-white hover:text-[#FF8FAB] hover:shadow-md active:scale-90"
            aria-label={t.common.copy}
            title={t.common.copy}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="8"
                y="8"
                width="12"
                height="12"
                rx="3"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M16 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* 收藏按钮 */}
          <button
            type="button"
            onClick={handleFavorite}
            className={`flex h-9 w-9 items-center justify-center rounded-full shadow-sm transition-all active:scale-90 ${
              favorited
                ? 'bg-[#FFD1DC] text-[#E8638A] shadow-md'
                : 'bg-white/80 text-[#9b8585] hover:bg-white hover:text-[#FF8FAB] hover:shadow-md'
            }`}
            aria-label={favorited ? t.common.removeFav : t.common.favorite}
            aria-pressed={favorited}
            title={favorited ? t.common.removeFav : t.common.favorite}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill={favorited ? 'currentColor' : 'none'}
              xmlns="http://www.w3.org/2000/svg"
              className={favorited ? 'ct-anim-heart' : ''}
            >
              <path
                d="M12 21s-7-4.5-9.5-9C1 9 2.5 5 6 5c2 0 3.5 1 4.5 2.5C11.5 6 13 5 15 5c3.5 0 5 4 3.5 7-2.5 4.5-9.5 9-9.5 9z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
