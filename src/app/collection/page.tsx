'use client';

import FloatingStars from '@/components/cute/FloatingStars';
import PolkaBackground from '@/components/cute/PolkaBackground';
import BowDecoration from '@/components/cute/BowDecoration';
import TextCard from '@/components/cute/TextCard';
import Link from 'next/link';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { useFavorites } from '@/hooks/useFavorites';

/**
 * Collection 页面
 * 展示用户收藏的素材，数据来自 localStorage
 * 无收藏时显示空状态引导
 */
export default function CollectionPage() {
  const { t } = useLanguage();
  const { favorites, hydrated, removeFavorite, clearFavorites, count } = useFavorites();

  // 防止 hydration mismatch：客户端挂载前显示空状态骨架
  if (!hydrated) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[#FFF9F5]">
        <PolkaBackground />
        <FloatingStars />
        <div className="relative z-10 flex min-h-[calc(100vh-4rem)] items-center justify-center px-6">
          <div className="text-[#c4a8a8]">Loading...</div>
        </div>
      </main>
    );
  }

  // 空状态
  if (count === 0) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[#FFF9F5]">
        <PolkaBackground />
        <FloatingStars />

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-4xl flex-col items-center justify-center px-6 text-center">
          {/* 装饰蝴蝶结 */}
          <div className="ct-anim-pop-in mb-6">
            <BowDecoration className="h-14 w-20 opacity-60" />
          </div>

          {/* 空状态图标 */}
          <div className="ct-anim-fade-up mb-6 text-6xl" style={{ animationDelay: '0.1s' }}>
            <span className="inline-block opacity-60">♡</span>
          </div>

          {/* 标题 */}
          <h1
            className="ct-anim-fade-up font-display text-3xl font-semibold tracking-wide text-[#E8638A] md:text-4xl"
            style={{ animationDelay: '0.15s' }}
          >
            {t.collection.emptyTitle}
          </h1>

          {/* 描述 */}
          <p
            className="ct-anim-fade-up mt-4 max-w-md text-base leading-relaxed text-[#9b8585]"
            style={{ animationDelay: '0.25s' }}
          >
            {t.collection.emptyDesc}
          </p>

          {/* 装饰分隔 */}
          <div
            className="ct-anim-fade-up my-8 flex items-center gap-3"
            style={{ animationDelay: '0.35s' }}
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#FFD1DC]" />
            <span className="text-sm tracking-wide text-[#c4a8a8]">✦</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#FFD1DC]" />
          </div>

          {/* 行动按钮 */}
          <Link
            href="/explore"
            className="ct-anim-pop-in inline-flex items-center gap-2 rounded-full border-2 border-[#FF8FAB] bg-gradient-to-br from-[#FF8FAB] to-[#E8638A] px-8 py-3.5 text-base font-semibold text-white shadow-md transition-all hover:scale-105 hover:shadow-lg active:scale-95"
            style={{ animationDelay: '0.45s' }}
          >
            <span>✦</span>
            <span>{t.collection.exploreBtn}</span>
            <span>✦</span>
          </Link>

          {/* 提示卡片 */}
          <div
            className="ct-anim-fade-up mt-12 rounded-3xl border-2 border-[#FFD1DC]/40 bg-white/60 px-8 py-6 text-left backdrop-blur-sm"
            style={{ animationDelay: '0.55s' }}
          >
            <h3 className="mb-3 font-display text-lg font-semibold tracking-wide text-[#9B6BB5]">
              {t.collection.howToTitle}
            </h3>
            <ul className="space-y-2 text-sm leading-relaxed text-[#9b8585]">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 shrink-0">✦</span>
                <span>{t.collection.howTo1}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 shrink-0">✦</span>
                <span>{t.collection.howTo2}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 shrink-0">✦</span>
                <span>{t.collection.howTo3}</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    );
  }

  // 有收藏内容
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FFF9F5]">
      <PolkaBackground />
      <FloatingStars />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
        {/* 标题区域 */}
        <div className="ct-anim-fade-up mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">♡</span>
            <h1 className="font-display text-2xl font-semibold tracking-wide text-[#E8638A] md:text-3xl">
              {t.collection.title}
            </h1>
            <span className="rounded-full bg-[#FFD1DC] px-3 py-1 text-sm font-medium text-[#E8638A]">
              {count} {t.collection.countLabel}
            </span>
          </div>

          {/* 清空按钮 */}
          <button
            type="button"
            onClick={() => {
              if (window.confirm(t.collection.clearConfirm)) {
                clearFavorites();
              }
            }}
            className="rounded-full border-2 border-[#FFD1DC]/50 bg-white/60 px-4 py-2 text-sm text-[#9b8585] transition-all hover:border-[#FF8FAB] hover:bg-[#FFF5F0] hover:text-[#E8638A] active:scale-95"
          >
            {t.collection.clearAll}
          </button>
        </div>

        {/* 分隔装饰线 */}
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#FFD1DC]" />
          <span className="text-sm tracking-wide text-[#c4a8a8]">
            ✦ {t.collection.title} ✦
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#FFD1DC]" />
        </div>

        {/* 收藏内容瀑布流 */}
        <section className="ct-masonry">
          {favorites.map((item, index) => (
            <div key={item.id} data-card>
              <TextCard
                item={item}
                delay={Math.min(0.1 + index * 0.03, 0.6)}
              />
            </div>
          ))}
        </section>

        {/* 底部装饰 */}
        <footer className="mt-16 text-center">
          <p className="text-sm tracking-wide text-[#c4a8a8]">
            {t.explore.footer}
          </p>
        </footer>
      </div>
    </main>
  );
}
