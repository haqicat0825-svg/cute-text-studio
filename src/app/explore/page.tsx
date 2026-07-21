'use client';

import { useRef, useState, useCallback } from 'react';
import FloatingStars from '@/components/cute/FloatingStars';
import PolkaBackground from '@/components/cute/PolkaBackground';
import SearchBar from '@/components/cute/SearchBar';
import CategoryBar from '@/components/cute/CategoryBar';
import TextCard from '@/components/cute/TextCard';
import SurpriseMeButton from '@/components/cute/SurpriseMeButton';
import { textItems, categories, searchExamples } from '@/data/textItems';

/**
 * Explore 探索页
 * 主要使用页面：搜索框 + 分类筛选 + Surprise Me 按钮 + Pinterest 风格瀑布流卡片
 */
export default function ExplorePage() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [filteredItems, setFilteredItems] = useState(textItems);

  // 分类筛选
  const handleCategoryChange = useCallback((id: string) => {
    if (id === 'all') {
      setFilteredItems(textItems);
    } else {
      const tagMap: Record<string, string> = {
        sweet: 'Sweet Girl',
        japanese: 'Japanese Cute',
        korean: 'Korean Style',
        soft: 'Soft Life',
        minimal: 'Minimal',
      };
      const tag = tagMap[id];
      setFilteredItems(tag ? textItems.filter((item) => item.tag === tag) : textItems);
    }
  }, []);

  // Surprise Me - 随机滚动到某张卡片
  const handleSurprise = useCallback(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('[data-card]');
    if (cards.length === 0) return;
    const randomIndex = Math.floor(Math.random() * cards.length);
    const target = cards[randomIndex] as HTMLElement;
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // 添加高亮效果
    target.style.transition = 'box-shadow 0.3s ease';
    target.style.boxShadow = '0 0 0 3px #FF8FAB, 0 8px 30px rgba(255, 143, 171, 0.3)';
    setTimeout(() => {
      target.style.boxShadow = '';
    }, 1500);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FFF9F5]">
      {/* 背景层 */}
      <PolkaBackground />
      <FloatingStars />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
        {/* 搜索区域 */}
        <section
          className="ct-anim-fade-up mb-8"
          style={{ animationDelay: '0.05s' }}
        >
          <SearchBar examples={searchExamples} />
        </section>

        {/* 分类按钮 + Surprise Me */}
        <section
          className="ct-anim-fade-up mb-8 flex flex-col items-center gap-4 md:flex-row md:justify-center"
          style={{ animationDelay: '0.15s' }}
        >
          <CategoryBar categories={categories} onCategoryChange={handleCategoryChange} />
          <div className="hidden md:block">
            <SurpriseMeButton onSurprise={handleSurprise} />
          </div>
        </section>

        {/* 移动端 Surprise Me */}
        <div className="ct-anim-fade-up mb-8 text-center md:hidden" style={{ animationDelay: '0.2s' }}>
          <SurpriseMeButton onSurprise={handleSurprise} />
        </div>

        {/* 分隔装饰线 */}
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#FFD1DC]" />
          <span className="text-sm tracking-wide text-[#c4a8a8]">✦ gallery ✦</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#FFD1DC]" />
        </div>

        {/* 瀑布流卡片区域 */}
        <section className="ct-masonry" ref={gridRef}>
          {filteredItems.map((item, index) => (
            <div key={item.id} data-card>
              <TextCard
                title={item.title}
                content={item.content}
                tag={item.tag}
                variant={item.variant}
                tagColor={item.tagColor}
                delay={0.3 + index * 0.04}
              />
            </div>
          ))}
        </section>

        {/* 底部装饰 */}
        <footer className="mt-16 text-center">
          <p className="text-sm tracking-wide text-[#c4a8a8]">
            ♡ Made with love for cute text lovers ♡
          </p>
        </footer>
      </div>
    </main>
  );
}