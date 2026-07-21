import Link from 'next/link';
import FloatingStars from '@/components/cute/FloatingStars';
import PolkaBackground from '@/components/cute/PolkaBackground';
import BowDecoration from '@/components/cute/BowDecoration';

/**
 * Welcome 首页
 * 用户第一次打开网站看到的入口页面
 * 包含：Logo、副标题、Enter 按钮、蝴蝶结和星星动画
 */
export default function WelcomePage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FFF9F5] px-6">
      {/* 背景层：波点 + 漂浮星星 */}
      <PolkaBackground />
      <FloatingStars />

      {/* 顶部装饰蝴蝶结 */}
      <div
        className="ct-anim-pop-in absolute top-16 left-1/2 hidden -translate-x-1/2 md:block"
        style={{ animationDelay: '0.2s' }}
      >
        <BowDecoration className="h-16 w-24" />
      </div>

      {/* 中央内容 */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* 小蝴蝶结装饰（移动端可见） */}
        <div
          className="ct-anim-pop-in mb-2 md:hidden"
          style={{ animationDelay: '0.2s' }}
        >
          <BowDecoration className="h-12 w-18" />
        </div>

        {/* Logo */}
        <h1
          className="ct-anim-fade-up font-bold tracking-wide text-4xl md:text-6xl"
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
          className="ct-anim-fade-up mt-4 text-lg text-[#9b8585] md:text-xl"
          style={{ animationDelay: '0.35s' }}
        >
          Create your cute style ✨
        </p>

        {/* Enter 按钮 */}
        <Link
          href="/explore"
          className="ct-anim-pop-in group mt-10 inline-flex items-center gap-2 rounded-full border-2 border-[#FF8FAB] bg-gradient-to-br from-[#FF8FAB] to-[#E8638A] px-10 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95"
          style={{ animationDelay: '0.5s' }}
        >
          <span className="transition-transform group-hover:rotate-12">♡</span>
          <span>Enter Studio</span>
          <span className="transition-transform group-hover:-rotate-12">♡</span>
        </Link>

        {/* 底部装饰小字 */}
        <p
          className="ct-anim-fade-in mt-16 text-sm text-[#c4a8a8]"
          style={{ animationDelay: '1s' }}
        >
          ˗ˏˋ Discover cute text, Unicode & emoji art ˎˊ˗
        </p>
      </div>

      {/* 底部装饰星星 */}
      <div className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 text-center">
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
