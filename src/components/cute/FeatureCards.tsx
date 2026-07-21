'use client';

import Link from 'next/link';
import { useLanguage } from '@/components/providers/LanguageProvider';

/**
 * FeatureCards - 首页功能入口卡片
 * 展示三个核心功能：Explore / Create / Collection
 * 桌面端为卡片形式，移动端为紧凑按钮形式
 */

export default function FeatureCards() {
  const { t } = useLanguage();

  const features = [
    {
      icon: '✦',
      title: t.home.featureExplore.title,
      desc: t.home.featureExplore.desc,
      cta: t.home.featureExplore.cta,
      href: '/explore',
      gradient: 'from-[#FFD1DC] to-[#FF8FAB]',
      accent: 'text-[#E8638A]',
    },
    {
      icon: '✎',
      title: t.home.featureCreate.title,
      desc: t.home.featureCreate.desc,
      cta: t.home.featureCreate.cta,
      href: '/create',
      gradient: 'from-[#E8D5F2] to-[#C8B5E8]',
      accent: 'text-[#9B6BB5]',
    },
    {
      icon: '♡',
      title: t.home.featureCollection.title,
      desc: t.home.featureCollection.desc,
      cta: t.home.featureCollection.cta,
      href: '/collection',
      gradient: 'from-[#C8E6D5] to-[#A8D4BA]',
      accent: 'text-[#5E9B7A]',
    },
  ];

  return (
    <>
      {/* 移动端：紧凑按钮形式 */}
      <div className="grid grid-cols-3 gap-3 px-2 sm:hidden">
        {features.map((feature, index) => (
          <Link
            key={feature.title}
            href={feature.href}
            className="ct-anim-fade-up flex flex-col items-center gap-1.5 rounded-2xl border-2 border-[#FFD1DC]/40 bg-white/70 p-3 text-center backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-[#FF8FAB]/60 hover:shadow-md"
            style={{
              animationDelay: `${0.55 + index * 0.1}s`,
            }}
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} text-base text-white shadow-sm`}
            >
              {feature.icon}
            </div>
            <span className={`text-xs font-semibold ${feature.accent}`}>
              {feature.title}
            </span>
          </Link>
        ))}
      </div>

      {/* 桌面端：完整卡片形式 */}
      <div className="hidden gap-5 px-4 sm:mx-auto sm:grid sm:max-w-4xl sm:grid-cols-3">
        {features.map((feature, index) => (
          <Link
            key={feature.title}
            href={feature.href}
            className="ct-anim-fade-up group block rounded-3xl border-2 border-[#FFD1DC]/40 bg-white/70 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FF8FAB]/60 hover:shadow-lg"
            style={{
              boxShadow:
                '0 4px 20px rgba(255, 143, 171, 0.08), 0 1px 4px rgba(232, 99, 138, 0.04)',
              animationDelay: `${0.65 + index * 0.12}s`,
            }}
          >
            {/* 图标 */}
            <div
              className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} text-2xl text-white shadow-md transition-transform group-hover:scale-110`}
            >
              {feature.icon}
            </div>

            {/* 标题 */}
            <h3
              className={`mb-2 font-display text-xl font-semibold tracking-wide ${feature.accent}`}
            >
              {feature.title}
            </h3>

            {/* 描述 */}
            <p className="text-sm leading-relaxed text-[#9b8585]">
              {feature.desc}
            </p>

            {/* 箭头提示 */}
            <div className="mt-4 text-sm font-medium text-[#FF8FAB] opacity-0 transition-all group-hover:opacity-100">
              {feature.cta} →
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
