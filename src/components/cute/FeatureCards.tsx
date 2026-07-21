import Link from 'next/link';

/**
 * FeatureCards - 首页功能介绍卡片
 * 展示三个核心功能：Explore / Create / Collection
 */

const features = [
  {
    icon: '✦',
    title: 'Explore',
    description:
      'Discover beautiful Unicode art fonts, emoji combinations, and decorative typography in a Pinterest-style gallery.',
    href: '/explore',
    gradient: 'from-[#FFD1DC] to-[#FF8FAB]',
    accent: 'text-[#E8638A]',
  },
  {
    icon: '✎',
    title: 'Create',
    description:
      'Generate your own cute text styles with AI. Mix emojis, symbols, and fonts to create your unique aesthetic.',
    href: '/create',
    gradient: 'from-[#E8D5F2] to-[#C8B5E8]',
    accent: 'text-[#9B6BB5]',
  },
  {
    icon: '♡',
    title: 'Collection',
    description:
      'Save your favorite text styles to your personal collection. Build your own gallery of cute aesthetics.',
    href: '/collection',
    gradient: 'from-[#C8E6D5] to-[#A8D4BA]',
    accent: 'text-[#5E9B7A]',
  },
];

export default function FeatureCards() {
  return (
    <div className="mx-auto grid max-w-4xl gap-5 px-4 sm:grid-cols-3">
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
            {feature.description}
          </p>

          {/* 箭头提示 */}
          <div className="mt-4 text-sm font-medium text-[#FF8FAB] opacity-0 transition-all group-hover:opacity-100">
            Explore {feature.title} →
          </div>
        </Link>
      ))}
    </div>
  );
}