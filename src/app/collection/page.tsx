import FloatingStars from '@/components/cute/FloatingStars';
import PolkaBackground from '@/components/cute/PolkaBackground';
import BowDecoration from '@/components/cute/BowDecoration';
import Link from 'next/link';

/**
 * Collection 页面 - 空状态
 * 用户收藏的文本样式列表，暂无内容时的空状态展示
 */
export default function CollectionPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FFF9F5]">
      {/* 背景层 */}
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
          Your Collection is Empty
        </h1>

        {/* 描述 */}
        <p
          className="ct-anim-fade-up mt-4 max-w-md text-base leading-relaxed text-[#9b8585]"
          style={{ animationDelay: '0.25s' }}
        >
          Start exploring and save your favorite cute text styles here.
          Tap the heart on any text card to add it to your collection.
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
          <span>Explore Text Styles</span>
          <span>✦</span>
        </Link>

        {/* 提示卡片 */}
        <div
          className="ct-anim-fade-up mt-12 rounded-3xl border-2 border-[#FFD1DC]/40 bg-white/60 px-8 py-6 text-left backdrop-blur-sm"
          style={{ animationDelay: '0.55s' }}
        >
          <h3 className="mb-3 font-display text-lg font-semibold tracking-wide text-[#9B6BB5]">
            How to collect
          </h3>
          <ul className="space-y-2 text-sm leading-relaxed text-[#9b8585]">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 shrink-0">✦</span>
              <span>Browse the <Link href="/explore" className="text-[#E8638A] underline decoration-dotted underline-offset-2 hover:decoration-solid">Explore</Link> gallery to discover cute text styles</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 shrink-0">✦</span>
              <span>Tap the <strong>♡ heart</strong> icon on any card to save it</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 shrink-0">✦</span>
              <span>Come back here to see all your favorites</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}