'use client';

import { useState, useCallback } from 'react';

/**
 * SurpriseMeButton - 随机发现按钮
 * 点击后随机高亮/滚动到一张卡片，带 sparkle 动画
 */

interface SurpriseMeButtonProps {
  onSurprise?: () => void;
}

export default function SurpriseMeButton({ onSurprise }: SurpriseMeButtonProps) {
  const [isSparking, setIsSparking] = useState(false);

  const handleClick = useCallback(() => {
    setIsSparking(true);
    onSurprise?.();

    // 触发 sparkle 动画后重置
    setTimeout(() => setIsSparking(false), 800);
  }, [onSurprise]);

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isSparking}
      className="group relative inline-flex items-center gap-2 rounded-full border-2 border-[#E8D5F2] bg-gradient-to-br from-[#E8D5F2] to-[#D4B8E8] px-6 py-3 text-sm font-semibold text-[#8B5AA6] shadow-sm transition-all hover:scale-105 hover:shadow-md active:scale-95 disabled:cursor-wait"
    >
      {/* Sparkle 动画 */}
      {isSparking && (
        <span className="absolute -inset-1 overflow-hidden rounded-full">
          <span
            className="ct-anim-sparkle absolute -top-1 -left-1 text-lg"
            style={{ animationDelay: '0s' }}
          >
            ✨
          </span>
          <span
            className="ct-anim-sparkle absolute -top-1 -right-1 text-lg"
            style={{ animationDelay: '0.15s' }}
          >
            ✨
          </span>
          <span
            className="ct-anim-sparkle absolute -bottom-1 left-1/2 text-lg"
            style={{ animationDelay: '0.3s' }}
          >
            ✨
          </span>
        </span>
      )}

      <span className="text-lg transition-transform group-hover:rotate-12">
        🎲
      </span>
      <span>Surprise Me</span>
      <span className="text-lg opacity-60">✦</span>
    </button>
  );
}