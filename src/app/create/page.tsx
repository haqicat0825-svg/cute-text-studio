'use client';

import { useState, useCallback } from 'react';
import FloatingStars from '@/components/cute/FloatingStars';
import PolkaBackground from '@/components/cute/PolkaBackground';
import BowDecoration from '@/components/cute/BowDecoration';
import TextCard from '@/components/cute/TextCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { useFavorites } from '@/hooks/useFavorites';
import { allItems } from '@/data';
import type { TextItem } from '@/data/types';

/**
 * Create 页面 - AI 文字生成器（模拟）
 * 用户输入关键词 + 选择风格 → 生成模拟 AI 结果
 * 结果支持 Copy、收藏、再生成
 */

// 风格装饰模板
const styleDecorations: Record<string, { prefix: string; suffix: string }> = {
  sweet: { prefix: '🎀 ', suffix: ' 🎀' },
  japanese: { prefix: '✧˖°', suffix: '°˖✧' },
  korean: { prefix: '˗ˏˋ', suffix: 'ˎˊ˗' },
  soft: { prefix: '☁︎', suffix: '☁︎ ♡' },
};

// 随机装饰符
const randomDecorations = ['✨', '♡', '✦', '✿', '🌸', '🤍', '⸝⸝⸝', '˚₊‧⁺˖⋆'];

function generateResult(input: string, style: string): TextItem {
  const decor = styleDecorations[style] ?? styleDecorations.sweet;
  const randomDecor1 = randomDecorations[Math.floor(Math.random() * randomDecorations.length)];
  const randomDecor2 = randomDecorations[Math.floor(Math.random() * randomDecorations.length)];

  // 根据输入生成内容
  const baseText = input.trim() || 'cute style';
  const content = `${decor.prefix} ${randomDecor1} ${baseText} ${randomDecor2} ${decor.suffix}`;

  const styleMap: Record<string, { style: string; category: TextItem['category']; variant: TextItem['variant']; tagColor: TextItem['tagColor'] }> = {
    sweet: { style: 'Sweet Girl', category: 'sweet', variant: 'pink', tagColor: 'pink' },
    japanese: { style: 'Japanese Cute', category: 'japanese', variant: 'rose', tagColor: 'rose' },
    korean: { style: 'Korean Style', category: 'korean', variant: 'lavender', tagColor: 'lavender' },
    soft: { style: 'Soft Life', category: 'soft', variant: 'cream', tagColor: 'peach' },
  };

  const styleInfo = styleMap[style] ?? styleMap.sweet;

  return {
    id: `ai-${Date.now()}`,
    title: 'AI Generated',
    content,
    category: styleInfo.category,
    style: styleInfo.style,
    tags: [input.trim() || 'cute', 'ai', 'generated'],
    variant: styleInfo.variant,
    tagColor: styleInfo.tagColor,
    type: 'cute-text',
  };
}

// 从现有素材库随机选一个作为"灵感推荐"
function getRandomInspiration(): TextItem {
  return allItems[Math.floor(Math.random() * allItems.length)];
}

export default function CreatePage() {
  const { t } = useLanguage();
  const { isFavorited, toggleFavorite } = useFavorites();
  const [input, setInput] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('sweet');
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<TextItem | null>(null);
  const [inspiration, setInspiration] = useState<TextItem | null>(null);

  const handleGenerate = useCallback(() => {
    if (!input.trim()) return;
    setGenerating(true);
    // 模拟 AI 生成延迟
    setTimeout(() => {
      const generated = generateResult(input, selectedStyle);
      setResult(generated);
      setInspiration(getRandomInspiration());
      setGenerating(false);
    }, 800);
  }, [input, selectedStyle]);

  const handleRegenerate = useCallback(() => {
    if (!input.trim()) return;
    setGenerating(true);
    setTimeout(() => {
      const generated = generateResult(input, selectedStyle);
      setResult(generated);
      setInspiration(getRandomInspiration());
      setGenerating(false);
    }, 800);
  }, [input, selectedStyle]);

  const styleOptions = [
    { id: 'sweet', icon: '🎀', label: t.create.styleOptions.sweet, color: 'from-[#FFD1DC] to-[#FF8FAB]' },
    { id: 'japanese', icon: '🌸', label: t.create.styleOptions.japanese, color: 'from-[#E8D5F2] to-[#C8B5E8]' },
    { id: 'korean', icon: '🤍', label: t.create.styleOptions.korean, color: 'from-[#C8E6D5] to-[#A8D4BA]' },
    { id: 'soft', icon: '☁', label: t.create.styleOptions.soft, color: 'from-[#FFD4B8] to-[#FFB8A0]' },
  ];

  const isResultFavorited = result ? isFavorited(result.id) : false;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FFF9F5]">
      <PolkaBackground />
      <FloatingStars />

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-10 md:px-8 md:py-14">
        {/* 页面标题 */}
        <div className="ct-anim-fade-up mb-12 text-center">
          <div className="mb-4 flex justify-center">
            <BowDecoration className="h-12 w-18 opacity-60" />
          </div>
          <h1 className="font-display text-3xl font-semibold tracking-wide text-[#E8638A] md:text-4xl">
            {t.create.title}
          </h1>
          <p className="mt-3 text-base text-[#9b8585]">
            {t.create.subtitle}
          </p>
        </div>

        {/* 主内容区：双栏布局 */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* 左侧 — 输入区 */}
          <div className="ct-anim-fade-up space-y-6" style={{ animationDelay: '0.15s' }}>
            {/* 文字输入框 */}
            <div className="rounded-3xl border-2 border-[#FFD1DC]/60 bg-white/80 p-6 backdrop-blur-sm">
              <label className="mb-3 block font-display text-lg font-semibold tracking-wide text-[#9B6BB5]">
                {t.create.inputLabel}
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.create.inputPlaceholder}
                rows={3}
                className="w-full resize-none rounded-2xl border-2 border-[#FFD1DC]/40 bg-[#FFF9F5] p-4 text-base text-[#5c4a4a] placeholder:text-[#c4a8a8] focus:border-[#FF8FAB] focus:outline-none focus:ring-2 focus:ring-[#FFD1DC]/30"
              />
              <p className="mt-2 flex items-center gap-1.5 text-sm text-[#c4a8a8]">
                <span>✨</span>
                <span>{t.create.inputHint}</span>
              </p>
            </div>

            {/* 风格选择器 */}
            <div className="rounded-3xl border-2 border-[#FFD1DC]/60 bg-white/80 p-6 backdrop-blur-sm">
              <label className="mb-3 block font-display text-lg font-semibold tracking-wide text-[#9B6BB5]">
                {t.create.styleLabel}
              </label>
              <div className="grid grid-cols-2 gap-3">
                {styleOptions.map((style) => {
                  const isSelected = selectedStyle === style.id;
                  return (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => setSelectedStyle(style.id)}
                      className={`flex items-center gap-2 rounded-2xl border-2 p-3.5 text-sm font-medium transition-all ${
                        isSelected
                          ? 'border-[#FF8FAB] bg-[#FFF5F0] text-[#E8638A] shadow-md'
                          : 'border-[#FFD1DC]/30 bg-white/50 text-[#9b8585] hover:border-[#FF8FAB]/40 hover:bg-[#FFF5F0]'
                      }`}
                    >
                      <span className="text-lg">{style.icon}</span>
                      <span>{style.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 生成按钮 */}
            <button
              type="button"
              onClick={handleGenerate}
              disabled={!input.trim() || generating}
              className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#FF8FAB] bg-gradient-to-br from-[#FF8FAB] to-[#E8638A] px-8 py-4 text-base font-semibold text-white shadow-md transition-all hover:scale-[1.02] hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
            >
              <span className="text-lg">{generating ? '⏳' : '✨'}</span>
              <span>{generating ? t.create.generating : t.create.generateBtn}</span>
            </button>

            {!input.trim() && (
              <p className="text-center text-sm text-[#c4a8a8]">
                {t.create.needInput}
              </p>
            )}
          </div>

          {/* 右侧 — 预览/结果区 */}
          <div className="ct-anim-fade-up space-y-6" style={{ animationDelay: '0.3s' }}>
            {/* 生成结果 */}
            <div className="rounded-3xl border-2 border-[#FFD1DC]/60 bg-white/80 p-6 backdrop-blur-sm">
              <label className="mb-3 block font-display text-lg font-semibold tracking-wide text-[#9B6BB5]">
                {t.create.previewLabel}
              </label>

              {generating ? (
                <div className="flex min-h-[200px] items-center justify-center rounded-2xl border-2 border-dashed border-[#FFD1DC]/40 bg-[#FFF9F5]/50 p-6">
                  <div className="text-center">
                    <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-[#FFD1DC] border-t-[#FF8FAB]" />
                    <p className="text-sm text-[#c4a8a8]">{t.create.generating}</p>
                  </div>
                </div>
              ) : result ? (
                <div className="space-y-4">
                  {/* 生成的结果卡片 */}
                  <TextCard item={result} delay={0} />

                  {/* 操作按钮 */}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handleRegenerate}
                      disabled={generating}
                      className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-[#E8D5F2] bg-white/80 px-4 py-2.5 text-sm font-medium text-[#8B5AA6] transition-all hover:bg-[#F8F0FC] active:scale-95 disabled:opacity-50"
                    >
                      <span>🔄</span>
                      <span>{t.create.regenBtn}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => result && toggleFavorite(result)}
                      className={`flex flex-1 items-center justify-center gap-2 rounded-full border-2 px-4 py-2.5 text-sm font-medium transition-all active:scale-95 ${
                        isResultFavorited
                          ? 'border-[#FF8FAB] bg-[#FFD1DC] text-[#E8638A]'
                          : 'border-[#FFD1DC] bg-white/80 text-[#9b8585] hover:bg-[#FFF5F0] hover:text-[#E8638A]'
                      }`}
                    >
                      <span>{isResultFavorited ? '♥' : '♡'}</span>
                      <span>{isResultFavorited ? t.common.removeFav : t.common.favorite}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex min-h-[200px] items-center justify-center rounded-2xl border-2 border-dashed border-[#FFD1DC]/40 bg-[#FFF9F5]/50 p-6">
                  <div className="text-center">
                    <p className="text-4xl text-[#c4a8a8]">✨</p>
                    <p className="mt-3 text-sm leading-relaxed text-[#c4a8a8]">
                      {t.create.previewEmpty}
                    </p>
                    <p className="mt-1 text-xs text-[#d4b8b8]">
                      {t.create.previewEmptyHint}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* 灵感示例 */}
            <div className="rounded-3xl border-2 border-[#FFD1DC]/60 bg-white/80 p-6 backdrop-blur-sm">
              <label className="mb-3 block font-display text-lg font-semibold tracking-wide text-[#9B6BB5]">
                {t.create.inspirationLabel}
              </label>
              <div className="space-y-3">
                {(inspiration ? [inspiration] : allItems.slice(0, 3)).map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-2xl border border-[#FFD1DC]/30 bg-[#FFF9F5] p-3.5"
                  >
                    <div className="truncate pr-2">
                      <p className="text-sm font-medium text-[#5c4a4a]">{item.content.split('\n')[0]}</p>
                      <p className="mt-0.5 text-xs text-[#c4a8a8]">{item.style}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigator.clipboard.writeText(item.content).catch(() => {})}
                      className="shrink-0 rounded-full bg-white/80 px-3 py-1 text-xs text-[#FF8FAB] shadow-sm transition-all hover:bg-white active:scale-95"
                      aria-label={t.common.copy}
                    >
                      {t.create.copyBtn}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 底部装饰 */}
        <footer className="mt-16 text-center">
          <p className="text-sm tracking-wide text-[#c4a8a8]">
            {t.create.footer}
          </p>
        </footer>
      </div>
    </main>
  );
}
