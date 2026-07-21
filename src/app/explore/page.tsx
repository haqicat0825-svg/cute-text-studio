import FloatingStars from '@/components/cute/FloatingStars';
import PolkaBackground from '@/components/cute/PolkaBackground';
import Logo from '@/components/cute/Logo';
import SearchBar from '@/components/cute/SearchBar';
import CategoryBar from '@/components/cute/CategoryBar';
import TextCard from '@/components/cute/TextCard';
import { textItems, categories, searchExamples } from '@/data/textItems';

/**
 * Explore 探索页
 * 主要使用页面：搜索框 + 分类筛选 + Pinterest 风格瀑布流卡片
 */
export default function ExplorePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FFF9F5]">
      {/* 背景层 */}
      <PolkaBackground />
      <FloatingStars />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
        {/* 顶部 Logo */}
        <header className="ct-anim-fade-up mb-10 text-center">
          <Logo size="md" asLink />
        </header>

        {/* 搜索区域 */}
        <section
          className="ct-anim-fade-up mb-10"
          style={{ animationDelay: '0.15s' }}
        >
          <SearchBar examples={searchExamples} />
        </section>

        {/* 分类按钮 */}
        <section
          className="ct-anim-fade-up mb-10"
          style={{ animationDelay: '0.3s' }}
        >
          <CategoryBar categories={categories} />
        </section>

        {/* 分隔装饰线 */}
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#FFD1DC]" />
          <span className="text-sm text-[#c4a8a8]">✦ gallery ✦</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#FFD1DC]" />
        </div>

        {/* 瀑布流卡片区域 */}
        <section className="ct-masonry">
          {textItems.map((item, index) => (
            <TextCard
              key={item.id}
              content={item.content}
              tag={item.tag}
              variant={item.variant}
              delay={0.4 + index * 0.05}
            />
          ))}
        </section>

        {/* 底部装饰 */}
        <footer className="mt-16 text-center">
          <p className="text-sm text-[#c4a8a8]">
            ♡ Made with love for cute text lovers ♡
          </p>
        </footer>
      </div>
    </main>
  );
}
