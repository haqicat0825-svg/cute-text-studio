'use client';

import Link from 'next/link';
import FloatingStars from '@/components/cute/FloatingStars';
import PolkaBackground from '@/components/cute/PolkaBackground';
import BowDecoration from '@/components/cute/BowDecoration';
import FeatureCards from '@/components/cute/FeatureCards';
import LanguageToggle from '@/components/cute/LanguageToggle';
import { useLanguage } from '@/components/providers/LanguageProvider';

/**
 * Welcome 首页
 * 用户第一次打开网站看到的入口页面
 * 移动端第一屏可见：Logo、副标题、Enter 按钮
 * 第二屏：三个功能入口卡片
 */
export default function WelcomePage() {
  const { t } = useLanguage();

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FFF9F5] px-6">
      {/* 背景层：波点 + 漂浮星星 */}
      <PolkaBackground />
      <FloatingStars />

      {/* 右上角语言切换 */}
      <div className="absolute right-4 top-4 z-20">
        <LanguageToggle />
      </div>

      {/* 顶部装饰蝴蝶结 */}
      <div
        className="ct-anim-pop-in absolute top-10 left-1/2 hidden -translate-x-1/2 md:block"
        style={{ animationDelay: '0.2s' }}
      >
        <BowDecoration className="h-16 w-24" />
      </div>

      {/* 内容区域 */}
      <div className="relative z-10 flex flex-col items-center">
        {/* 小蝴蝶结装饰（移动端可见） */}
        <div
          className="ct-anim-pop-in mb-2 md:hidden"
          style={{ animationDelay: '0.2s' }}
        >
          <BowDecoration className="h-10 w-14" />
        </div>

        {/* Logo */}
        <h1
          className="ct-anim-fade-up font-display text-3xl font-bold tracking-wider md:text-6xl"
          style={{ animationDelay: '0.1s' }}
        >
          <span
            style={{
              background: 'linear-gradient(135deg, #FF8FAB 0%, #E8638A 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Cute Text Studio
          </span>
        </h1>

        {/* 副标题 */}
        <p
          className="ct-anim-fade-up mt-3 text-base text-[#9b8585] md:mt-4 md:text-xl"
          style={{ animationDelay: '0.3s' }}
        >
          {t.home.subtitle}
        </p>

        {/* Enter 按钮 */}
        <Link
          href="/explore"
          className="ct-anim-pop-in group mt-6 inline-flex items-center gap-2 rounded-full border-2 border-[#FF8FAB] bg-gradient-to-br from-[#FF8FAB] to-[#E8638A] px-8 py-3 text-base font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95 md:mt-8 md:px-10 md:py-4 md:text-lg"
          style={{ animationDelay: '0.45s' }}
        >
          <span className="transition-transform group-hover:rotate-12">♡</span>
          <span>{t.home.enterBtn}</span>
          <span className="transition-transform group-hover:-rotate-12">♡</span>
        </Link>

        {/* 功能卡片区域 */}
        <div className="mt-10 w-full md:mt-16">
          <FeatureCards />
        </div>

        {/* 底部装饰小字 */}
        <p
          className="ct-anim-fade-in mt-8 text-center text-xs text-[#c4a8a8] md:mt-12 md:text-sm"
          style={{ animationDelay: '1s' }}
        >
          {t.home.tagline}
        </p>
      </div>

      {/* 底部装饰星星 */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
        <div className="ct-anim-twinkle text-2xl text-[#FF8FAB]">✦</div>
      </div>

      {/* 左右装饰蝴蝶结 */}
      <div
        className="ct-anim-fade-in absolute bottom-20 left-8 hidden lg:block"
        style={{ animationDelay: '0.8s' }}
      >
        <BowDecoration className="h-10 w-16 rotate-12 opacity-70" />
      </div>
      <div
        className="ct-anim-fade-in absolute bottom-20 right-8 hidden lg:block"
        style={{ animationDelay: '0.9s' }}
      >
        <BowDecoration className="h-10 w-16 -rotate-12 opacity-70" />
      </div>
    </main>
  );
}
