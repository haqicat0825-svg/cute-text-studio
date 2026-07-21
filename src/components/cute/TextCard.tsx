'use client';

import { useState } from 'react';

/**
 * TextCard - 瀑布流中的单个文字卡片
 * 包含：可爱文字内容、风格标签、收藏按钮、Copy按钮
 */

interface TextCardProps {
  content: string;
  tag: string;
  variant: 'pink' | 'cream' | 'lavender' | 'mint';
  /** 入场动画延迟（秒） */
  delay?: number;
}

const variantStyles: Record<TextCardProps['variant'], string> = {
  pink: 'bg-[#FFF5F0] border-[#FFD1DC]',
  cream: 'bg-[#FFFBF7] border-[#FFE4D6]',
  lavender: 'bg-[#F8F0FC] border-[#E8D5F2]',
  mint: 'bg-[#F2FAF5] border-[#C8E6D5]',
};

const tagColors: Record<TextCardProps['variant'], string> = {
  pink: 'bg-[#FFD1DC] text-[#E8638A]',
  cream: 'bg-[#FFE4D6] text-[#C97B5E]',
  lavender: 'bg-[#E8D5F2] text-[#9B6BB5]',
  mint: 'bg-[#C8E6D5] text-[#5E9B7A]',
};

export default function TextCard({
  content,
  tag,
  variant,
  delay = 0,
}: TextCardProps) {
  const [favorited, setFavorited] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // 剪贴板权限失败时静默处理
    }
  };

  const handleFavorite = () => {
    setFavorited((prev) => !prev);
  };

  return (
    <div
      className={`ct-shadow-soft ct-shadow-soft-hover group break-inside-avoid rounded-3xl border-2 p-5 transition-all duration-300 hover:-translate-y-1 ${variantStyles[variant]}`}
      style={{
        animation: 'ct-fade-up 0.6s ease-out both',
        animationDelay: `${delay}s`,
      }}
    >
      {/* 卡片内容 */}
      <pre className="mb-4 whitespace-pre-wrap break-words font-sans text-lg leading-relaxed text-[#5c4a4a]">
        {content}
      </pre>

      {/* 底部操作栏 */}
      <div className="flex items-center justify-between">
        {/* 风格标签 */}
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${tagColors[variant]}`}
        >
          {tag}
        </span>

        {/* 按钮组 */}
        <div className="flex items-center gap-2">
          {/* Copy 按钮 */}
          <button
            type="button"
            onClick={handleCopy}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-[#9b8585] transition-all hover:bg-white hover:text-[#FF8FAB] active:scale-90"
            aria-label="Copy text"
            title="Copy"
          >
            {copied ? (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 13l4 4L19 7"
                  stroke="#5E9B7A"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="14"
                height="14"
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
            )}
          </button>

          {/* 收藏按钮 */}
          <button
            type="button"
            onClick={handleFavorite}
            className={`flex h-8 w-8 items-center justify-center rounded-full transition-all active:scale-90 ${
              favorited
                ? 'bg-[#FFD1DC] text-[#E8638A]'
                : 'bg-white/80 text-[#9b8585] hover:bg-white hover:text-[#FF8FAB]'
            }`}
            aria-label="Favorite"
            aria-pressed={favorited}
            title="Favorite"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill={favorited ? 'currentColor' : 'none'}
              xmlns="http://www.w3.org/2000/svg"
              className={favorited ? 'ct-anim-heart' : ''}
            >
              <path
                d="M12 21s-7-4.5-9.5-9C1 9 2.5 5 6.5 5c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3 4 0 5.5 4 4 7-2.5 4.5-9.5 9-9.5 9z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
                fill={favorited ? 'currentColor' : 'none'}
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
