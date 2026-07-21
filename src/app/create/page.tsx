'use client';

import { useState, useCallback } from 'react';
import FloatingStars from '@/components/cute/FloatingStars';
import PolkaBackground from '@/components/cute/PolkaBackground';
import BowDecoration from '@/components/cute/BowDecoration';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { useFavorites } from '@/hooks/useFavorites';
import { decorateText, DECORATE_MODES } from '@/lib/aiGenerator';
import type { DecorateMode, DecorateOutput } from '@/lib/aiGenerator';

/**
 * Create 页面 — AI Text Decorator（AI 文字装饰器）
 *
 * 核心逻辑：用户输入一句文字 → AI 从素材库选择装饰元素 → 组合输出
 * 保留用户原始文字，只做装饰，不生成新文字。
 */
export default function CreatePage() {
  const { t, locale } = useLanguage();
  const { isFavorited, toggleFavorite } = useFavorites();
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<DecorateMode>('cute');
  const [generating, setGenerating] = useState(false);
  const [output, setOutput] = useState<DecorateOutput | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [genCount, setGenCount] = useState(0);

  const handleGenerate = useCallback(() => {
    if (!input.trim()) return;
    setGenerating(true);
    // 模拟 AI 装饰延迟
    setTimeout(() => {
      const result = decorateText(input, mode);
      setOutput(result);
      setGenCount((c) => c + 1);
      setGenerating(false);
    }, 700);
  }, [input, mode]);

  const handleCopy = useCallback((text: string, index: number) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  }, []);

  const handleFavorite = useCallback(
    (text: string, index: number) => {
      const fakeId = `deco-${Date.now()}-${index}`;
      toggleFavorite({
        id: fakeId,
        title: locale === 'zh' ? 'AI 装饰' : 'AI Decorated',
        content: text,
        category: 'cute',
        style: DECORATE_MODES.find((m) => m.id === mode)?.labelEn ?? 'Cute',
        tags: ['AI', 'decorated', mode],
        variant: 'pink',
        tagColor: 'pink',
        type: 'cute-text',
      });
    },
    [mode, locale, toggleFavorite],
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FFF9F5]">
      <PolkaBackground />
      <FloatingStars />

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-10 md:px-8 md:py-14">
        {/* 页面标题 */}
        <div className="ct-anim-fade-up mb-10 text-center">
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

        {/* 输入区 */}
        <div className="ct-anim-fade-up rounded-3xl border-2 border-[#FFD1DC]/60 bg-white/80 p-6 backdrop-blur-sm md:p-8" style={{ animationDelay: '0.1s' }}>
          <label className="mb-3 block font-display text-lg font-semibold tracking-wide text-[#9B6BB5]">
            {t.create.inputLabel}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.create.inputPlaceholder}
            rows={2}
            className="w-full resize-none rounded-2xl border-2 border-[#FFD1DC]/40 bg-[#FFF9F5] p-4 text-base text-[#5c4a4a] placeholder:text-[#c4a8a8] focus:border-[#FF8FAB] focus:outline-none focus:ring-2 focus:ring-[#FFD1DC]/30"
          />

          {/* 装饰模式选择 */}
          <div className="mt-5">
            <label className="mb-3 block font-display text-base font-semibold tracking-wide text-[#9B6BB5]">
              {t.create.modeLabel}
            </label>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {DECORATE_MODES.map((m) => {
                const isSelected = mode === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMode(m.id)}
                    className={`flex flex-col items-center gap-1.5 rounded-2xl border-2 p-3.5 text-sm font-medium transition-all ${
                      isSelected
                        ? 'border-[#FF8FAB] bg-[#FFF5F0] text-[#E8638A] shadow-md'
                        : 'border-[#FFD1DC]/30 bg-white/50 text-[#9b8585] hover:border-[#FF8FAB]/40 hover:bg-[#FFF5F0]'
                    }`}
                  >
                    <span className="text-xl">{m.icon}</span>
                    <span>{locale === 'zh' ? m.labelZh : m.labelEn}</span>
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
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#FF8FAB] bg-gradient-to-br from-[#FF8FAB] to-[#E8638A] px-8 py-4 text-base font-semibold text-white shadow-md transition-all hover:scale-[1.02] hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
          >
            <span className="text-lg">{generating ? '⏳' : '✨'}</span>
            <span>{generating ? t.create.generating : t.create.generateBtn}</span>
          </button>

          {!input.trim() && (
            <p className="mt-3 text-center text-sm text-[#c4a8a8]">
              {t.create.needInput}
            </p>
          )}
        </div>

        {/* 结果区 */}
        <div className="ct-anim-fade-up mt-8" style={{ animationDelay: '0.2s' }}>
          {generating ? (
            <div className="flex min-h-[240px] items-center justify-center rounded-3xl border-2 border-dashed border-[#FFD1DC]/40 bg-white/60 p-6">
              <div className="text-center">
                <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-[#FFD1DC] border-t-[#FF8FAB]" />
                <p className="text-sm text-[#c4a8a8]">{t.create.generating}</p>
                <p className="mt-1 text-xs text-[#d4b8b8]">
                  {locale === 'zh' ? '正在从素材库匹配装饰元素...' : 'Matching decorations from library...'}
                </p>
              </div>
            </div>
          ) : output ? (
            <div className="space-y-4">
              {/* 结果标题 */}
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold tracking-wide text-[#E8638A]">
                  {t.create.previewLabel}
                </h2>
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={generating}
                  className="flex items-center gap-1.5 rounded-full border-2 border-[#E8D5F2] bg-white/80 px-4 py-2 text-sm font-medium text-[#8B5AA6] transition-all hover:bg-[#F8F0FC] active:scale-95 disabled:opacity-50"
                >
                  <span>🔄</span>
                  <span>{t.create.regenBtn}</span>
                </button>
              </div>

              {/* 3 个装饰方案 */}
              {output.results.map((result, index) => {
                const decoId = `deco-${genCount}-${index}`;
                const fav = isFavorited(decoId);
                return (
                  <div
                    key={`${genCount}-${index}`}
                    className="ct-anim-fade-up rounded-3xl border-2 border-[#FFD1DC]/50 bg-white/80 p-5 backdrop-blur-sm transition-all hover:border-[#FF8FAB]/40 hover:shadow-md"
                    style={{ animationDelay: `${0.1 * index}s` }}
                  >
                    {/* 装饰文字内容 */}
                    <div className="rounded-2xl bg-[#FFF9F5] p-5">
                      <pre className="whitespace-pre-wrap break-words font-mono text-center text-base leading-relaxed text-[#5c4a4a]">
                        {result.text}
                      </pre>
                    </div>

                    {/* 排版信息 */}
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#FFF5F0] px-2.5 py-0.5 text-xs text-[#FF8FAB]">
                        {result.layout}
                      </span>
                      {result.sources.kaomoji && (
                        <span className="rounded-full bg-[#F8F0FC] px-2.5 py-0.5 text-xs text-[#8B5AA6]">
                          {locale === 'zh' ? '颜文字' : 'Kaomoji'} · {result.sources.kaomoji.title}
                        </span>
                      )}
                      {result.sources.unicode && (
                        <span className="rounded-full bg-[#F0FAF5] px-2.5 py-0.5 text-xs text-[#6BB595]">
                          {locale === 'zh' ? '符号' : 'Unicode'} · {result.sources.unicode.title}
                        </span>
                      )}
                      {result.sources.decoration && (
                        <span className="rounded-full bg-[#FFF5F0] px-2.5 py-0.5 text-xs text-[#E8638A]">
                          {locale === 'zh' ? '装饰线' : 'Decoration'} · {result.sources.decoration.title}
                        </span>
                      )}
                    </div>

                    {/* 操作按钮 */}
                    <div className="mt-4 flex gap-3">
                      <button
                        type="button"
                        onClick={() => handleCopy(result.text, index)}
                        className={`flex flex-1 items-center justify-center gap-2 rounded-full border-2 px-4 py-2.5 text-sm font-medium transition-all active:scale-95 ${
                          copiedIndex === index
                            ? 'border-[#6BB595] bg-[#C8E6D5] text-[#4A8A6A]'
                            : 'border-[#FFD1DC] bg-white/80 text-[#9b8585] hover:bg-[#FFF5F0] hover:text-[#E8638A]'
                        }`}
                      >
                        <span>{copiedIndex === index ? '✓' : '📋'}</span>
                        <span>{copiedIndex === index ? 'Copied ✨' : t.common.copy}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleFavorite(result.text, index)}
                        className={`flex flex-1 items-center justify-center gap-2 rounded-full border-2 px-4 py-2.5 text-sm font-medium transition-all active:scale-95 ${
                          fav
                            ? 'border-[#FF8FAB] bg-[#FFD1DC] text-[#E8638A]'
                            : 'border-[#FFD1DC] bg-white/80 text-[#9b8585] hover:bg-[#FFF5F0] hover:text-[#E8638A]'
                        }`}
                      >
                        <span>{fav ? '♥' : '♡'}</span>
                        <span>{fav ? t.common.removeFav : t.common.favorite}</span>
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* AI 说明 */}
              <div className="rounded-2xl border border-[#E8D5F2]/40 bg-[#F8F0FC]/60 p-4">
                <p className="flex items-start gap-1.5 text-xs leading-relaxed text-[#8B5AA6]">
                  <span className="shrink-0">💡</span>
                  <span>
                    {locale === 'zh'
                      ? `AI 保留了你的原始文字「${output.inputText}」，从素材库匹配了颜文字、Unicode 符号和装饰线进行组合。每次生成结果不同，点击再生成获取更多方案。`
                      : `AI preserved your original text "${output.inputText}" and decorated it with kaomoji, Unicode symbols, and dividers from the library. Click regenerate for more variations.`}
                  </span>
                </p>
              </div>
            </div>
          ) : (
            <div className="flex min-h-[240px] items-center justify-center rounded-3xl border-2 border-dashed border-[#FFD1DC]/40 bg-white/60 p-6">
              <div className="text-center">
                <p className="text-5xl text-[#c4a8a8]">✨</p>
                <p className="mt-4 text-sm leading-relaxed text-[#c4a8a8]">
                  {t.create.previewEmpty}
                </p>
                <p className="mt-1 text-xs text-[#d4b8b8]">
                  {t.create.previewEmptyHint}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 底部 */}
        <footer className="mt-16 text-center">
          <p className="text-sm tracking-wide text-[#c4a8a8]">
            {t.create.footer}
          </p>
        </footer>
      </div>
    </main>
  );
}
