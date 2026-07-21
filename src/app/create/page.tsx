import FloatingStars from '@/components/cute/FloatingStars';
import PolkaBackground from '@/components/cute/PolkaBackground';
import BowDecoration from '@/components/cute/BowDecoration';

/**
 * Create 页面 - 基础 UI
 * 为未来 AI 生成功能预留的页面框架
 * 包含：样式选择器、文字输入区、预览区
 */
export default function CreatePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FFF9F5]">
      {/* 背景层 */}
      <PolkaBackground />
      <FloatingStars />

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-10 md:px-8 md:py-14">
        {/* 页面标题 */}
        <div className="ct-anim-fade-up mb-12 text-center">
          <div className="mb-4 flex justify-center">
            <BowDecoration className="h-12 w-18 opacity-60" />
          </div>
          <h1 className="font-display text-3xl font-semibold tracking-wide text-[#E8638A] md:text-4xl">
            ✎ Create Your Style
          </h1>
          <p className="mt-3 text-base text-[#9b8585]">
            AI-powered cute text generator — coming soon
          </p>
        </div>

        {/* 主内容区：双栏布局 */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* 左侧 — 输入区 */}
          <div className="ct-anim-fade-up space-y-6" style={{ animationDelay: '0.15s' }}>
            {/* 文字输入框 */}
            <div className="rounded-3xl border-2 border-[#FFD1DC]/60 bg-white/80 p-6 backdrop-blur-sm">
              <label className="mb-3 block font-display text-lg font-semibold tracking-wide text-[#9B6BB5]">
                Your Text
              </label>
              <textarea
                placeholder="Type something cute..."
                rows={5}
                className="w-full resize-none rounded-2xl border-2 border-[#FFD1DC]/40 bg-[#FFF9F5] p-4 text-base text-[#5c4a4a] placeholder:text-[#c4a8a8] focus:border-[#FF8FAB] focus:outline-none focus:ring-2 focus:ring-[#FFD1DC]/30"
                readOnly
              />
              <p className="mt-2 flex items-center gap-1.5 text-sm text-[#c4a8a8]">
                <span>✨</span>
                <span>AI generation will be available soon</span>
              </p>
            </div>

            {/* 风格选择器 */}
            <div className="rounded-3xl border-2 border-[#FFD1DC]/60 bg-white/80 p-6 backdrop-blur-sm">
              <label className="mb-3 block font-display text-lg font-semibold tracking-wide text-[#9B6BB5]">
                Style
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: '🎀', label: 'Sweet Girl', color: 'from-[#FFD1DC] to-[#FF8FAB]' },
                  { icon: '🌸', label: 'Japanese Cute', color: 'from-[#E8D5F2] to-[#C8B5E8]' },
                  { icon: '🤍', label: 'Korean Style', color: 'from-[#C8E6D5] to-[#A8D4BA]' },
                  { icon: '☁', label: 'Soft Life', color: 'from-[#FFD4B8] to-[#FFB8A0]' },
                ].map((style) => (
                  <button
                    key={style.label}
                    type="button"
                    disabled
                    className="flex items-center gap-2 rounded-2xl border-2 border-[#FFD1DC]/30 bg-white/50 p-3.5 text-sm font-medium text-[#9b8585] opacity-60 transition-all hover:border-[#FF8FAB]/40 hover:bg-[#FFF5F0]"
                  >
                    <span className="text-lg">{style.icon}</span>
                    <span>{style.label}</span>
                  </button>
                ))}
              </div>
              <p className="mt-2 text-sm text-[#c4a8a8]">More styles coming with AI</p>
            </div>

            {/* 生成按钮 */}
            <button
              type="button"
              disabled
              className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#FFD1DC]/50 bg-gradient-to-br from-[#FFD1DC] to-[#FF8FAB]/50 px-8 py-4 text-base font-semibold text-white/70 shadow-sm backdrop-blur-sm"
            >
              <span>✨</span>
              <span>Generate with AI</span>
              <span className="rounded-full bg-white/30 px-2 py-0.5 text-xs">Soon</span>
            </button>
          </div>

          {/* 右侧 — 预览区 */}
          <div className="ct-anim-fade-up space-y-6" style={{ animationDelay: '0.3s' }}>
            <div className="rounded-3xl border-2 border-[#FFD1DC]/60 bg-white/80 p-6 backdrop-blur-sm">
              <label className="mb-3 block font-display text-lg font-semibold tracking-wide text-[#9B6BB5]">
                Preview
              </label>
              <div className="flex min-h-[200px] items-center justify-center rounded-2xl border-2 border-dashed border-[#FFD1DC]/40 bg-[#FFF9F5]/50 p-6">
                <div className="text-center">
                  <p className="text-4xl text-[#c4a8a8]">✨</p>
                  <p className="mt-3 text-sm leading-relaxed text-[#c4a8a8]">
                    Your cute text will appear here
                  </p>
                  <p className="mt-1 text-xs text-[#d4b8b8]">
                    Powered by AI
                  </p>
                </div>
              </div>
            </div>

            {/* 灵感示例 */}
            <div className="rounded-3xl border-2 border-[#FFD1DC]/60 bg-white/80 p-6 backdrop-blur-sm">
              <label className="mb-3 block font-display text-lg font-semibold tracking-wide text-[#9B6BB5]">
                Inspiration
              </label>
              <div className="space-y-3">
                {[
                  { text: '✧ ˚₊‧♡ ♡₊˚ 🦢・₊✧', label: 'Soft Sparkle' },
                  { text: '🎀 𝐬𝐰𝐞𝐞𝐭 𝐠𝐢𝐫𝐥 🎀', label: 'Sweet Girl' },
                  { text: '☁︎ little moments ☁︎', label: 'Soft Life' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-2xl border border-[#FFD1DC]/30 bg-[#FFF9F5] p-3.5"
                  >
                    <div className="truncate pr-2">
                      <p className="text-sm font-medium text-[#5c4a4a]">{item.text}</p>
                      <p className="mt-0.5 text-xs text-[#c4a8a8]">{item.label}</p>
                    </div>
                    <button
                      type="button"
                      className="shrink-0 rounded-full bg-white/80 px-3 py-1 text-xs text-[#FF8FAB] shadow-sm transition-all hover:bg-white"
                      aria-label={`Copy ${item.label}`}
                    >
                      Copy
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
            ♡ AI generation coming soon ♡
          </p>
        </footer>
      </div>
    </main>
  );
}