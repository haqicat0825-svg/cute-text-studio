'use client';

import { useState, useCallback, useMemo } from 'react';
import FloatingStars from '@/components/cute/FloatingStars';
import PolkaBackground from '@/components/cute/PolkaBackground';
import BowDecoration from '@/components/cute/BowDecoration';
import TextCard from '@/components/cute/TextCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { useFavorites } from '@/hooks/useFavorites';
import { generateFromLibrary, getLibraryStats } from '@/lib/aiGenerator';
import type { AIGenerationResult } from '@/data/types';

/**
 * Create 页面 - AI 文字生成器
 * 核心逻辑：从素材库匹配素材 → 组合成新排版
 * 不生成新颜文字/Unicode，100% 使用现有素材库
 */

export default function CreatePage() {
  const { t } = useLanguage();
  const { isFavorited, toggleFavorite } = useFavorites();
  const [input, setInput] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('sweet');
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<AIGenerationResult | null>(null);
  const [history, setHistory] = useState<AIGenerationResult[]>([]);

  const stats = useMemo(() => getLibraryStats(), []);

  const handleGenerate = useCallback(() => {
    if (!input.trim()) return;
    setGenerating(true);
    // 模拟 AI 生成延迟（实际是素材匹配计算）
    setTimeout(() => {
      const generated = generateFromLibrary(input);
      setResult(generated);
      setHistory((prev) => [generated, ...prev].slice(0, 5));
      setGenerating(false);
    }, 600);
  }, [input]);

  const handleRegenerate = useCallback(() => {
    if (!input.trim()) return;
    setGenerating(true);
    setTimeout(() => {
      const generated = generateFromLibrary(input);
      setResult(generated);
      setHistory((prev) => [generated, ...prev].slice(0, 5));
      setGenerating(false);
    }, 600);
  }, [input]);

  // 将 AIGenerationResult 转为 TextItem 格式，以便复用 TextCard 组件
  const resultAsTextItem = useMemo(() => {
    if (!result) return null;
    return {
      id: result.id,
      title: result.title,
      content: result.content,
      category: result.category,
      style: result.style,
      tags: result.tags,
      variant: result.variant,
      tagColor: result.tagColor,
      type: 'cute-text' as const,
    };
  }, [result]);

  const isResultFavorited = resultAsTextItem ? isFavorited(resultAsTextItem.id) : false;

  const styleOptions = [
    { id: 'sweet', icon: '🎀', label: t.create.styleOptions.sweet, color: 'from-[#FFD1DC] to-[#FF8FAB]' },
    { id: 'japanese', icon: '🌸', label: t.create.styleOptions.japanese, color: 'from-[#E8D5F2] to-[#C8B5E8]' },
    { id: 'korean', icon: '🤍', label: t.create.styleOptions.korean, color: 'from-[#C8E6D5] to-[#A8D4BA]' },
    { id: 'soft', icon: '☁', label: t.create.styleOptions.soft, color: 'from-[#FFD4B8] to-[#FFB8A0]' },
  ];

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

            {/* 素材库统计 */}
            <div className="rounded-3xl border-2 border-[#E8D5F2]/50 bg-white/60 p-5 backdrop-blur-sm">
              <p className="mb-3 flex items-center gap-1.5 text-sm font-medium text-[#8B5AA6]">
                <span>📚</span>
                <span>参考素材库 · Library Stats</span>
              </p>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="rounded-xl bg-[#FFF5F0] p-2">
                  <p className="font-display text-lg font-semibold text-[#FF8FAB]">{stats.kaomoji}</p>
                  <p className="text-xs text-[#9b8585]">Kaomoji</p>
                </div>
                <div className="rounded-xl bg-[#FFF5F0] p-2">
                  <p className="font-display text-lg font-semibold text-[#E8638A]">{stats.unicode}</p>
                  <p className="text-xs text-[#9b8585]">Unicode</p>
                </div>
                <div className="rounded-xl bg-[#FFF5F0] p-2">
                  <p className="font-display text-lg font-semibold text-[#8B5AA6]">{stats.cuteText}</p>
                  <p className="text-xs text-[#9b8585]">Cute Text</p>
                </div>
                <div className="rounded-xl bg-[#FFF5F0] p-2">
                  <p className="font-display text-lg font-semibold text-[#6BB595]">{stats.decoration}</p>
                  <p className="text-xs text-[#9b8585]">Decoration</p>
                </div>
              </div>
              <p className="mt-2 text-center text-xs text-[#c4a8a8]">
                总计 {stats.total} 条精选素材 · AI 优先从中匹配
              </p>
            </div>
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
                    <p className="mt-1 text-xs text-[#d4b8b8]">正在从素材库匹配中...</p>
                  </div>
                </div>
              ) : result && resultAsTextItem ? (
                <div className="space-y-4">
                  {/* 生成的结果卡片 */}
                  <TextCard item={resultAsTextItem} delay={0} />

                  {/* AI 匹配说明 */}
                  {result.reason && (
                    <div className="rounded-2xl border border-[#E8D5F2]/40 bg-[#F8F0FC]/60 p-3.5">
                      <p className="flex items-start gap-1.5 text-xs leading-relaxed text-[#8B5AA6]">
                        <span className="shrink-0">💡</span>
                        <span>{result.reason}</span>
                      </p>
                      {result.sourceIds.length > 0 && (
                        <p className="mt-1.5 text-xs text-[#c4a8a8]">
                          来源素材：{result.sourceIds.length} 个（来自精选素材库）
                        </p>
                      )}
                    </div>
                  )}

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
                      onClick={() => resultAsTextItem && toggleFavorite(resultAsTextItem)}
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

            {/* 生成历史 */}
            {history.length > 1 && (
              <div className="rounded-3xl border-2 border-[#FFD1DC]/60 bg-white/80 p-6 backdrop-blur-sm">
                <label className="mb-3 block font-display text-lg font-semibold tracking-wide text-[#9B6BB5]">
                  生成历史 · History
                </label>
                <div className="space-y-3">
                  {history.slice(1, 4).map((item) => {
                    const histAsTextItem = {
                      id: item.id,
                      title: item.title,
                      content: item.content,
                      category: item.category,
                      style: item.style,
                      tags: item.tags,
                      variant: item.variant,
                      tagColor: item.tagColor,
                      type: 'cute-text' as const,
                    };
                    return (
                      <div
                        key={item.id}
                        className="flex items-center justify-between rounded-2xl border border-[#FFD1DC]/30 bg-[#FFF9F5] p-3.5"
                      >
                        <div className="truncate pr-2">
                          <p className="text-sm font-medium text-[#5c4a4a]">{item.content.split('\n')[0]}</p>
                          <p className="mt-0.5 text-xs text-[#c4a8a8]">{item.style} · {item.sourceIds.length} 素材</p>
                        </div>
                        <div className="flex shrink-0 gap-2">
                          <button
                            type="button"
                            onClick={() => navigator.clipboard.writeText(item.content).catch(() => {})}
                            className="rounded-full bg-white/80 px-3 py-1 text-xs text-[#FF8FAB] shadow-sm transition-all hover:bg-white active:scale-95"
                            aria-label={t.common.copy}
                          >
                            {t.create.copyBtn}
                          </button>
                          <button
                            type="button"
                            onClick={() => histAsTextItem && toggleFavorite(histAsTextItem)}
                            className={`rounded-full px-3 py-1 text-xs shadow-sm transition-all active:scale-95 ${
                              isFavorited(item.id)
                                ? 'bg-[#FFD1DC] text-[#E8638A]'
                                : 'bg-white/80 text-[#9b8585] hover:bg-[#FFF5F0]'
                            }`}
                          >
                            {isFavorited(item.id) ? '♥' : '♡'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
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
