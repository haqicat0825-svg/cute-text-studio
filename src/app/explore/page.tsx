'use client';

import { useRef, useState, useCallback, useMemo } from 'react';
import FloatingStars from '@/components/cute/FloatingStars';
import PolkaBackground from '@/components/cute/PolkaBackground';
import SearchBar from '@/components/cute/SearchBar';
import CategoryBar from '@/components/cute/CategoryBar';
import TextCard from '@/components/cute/TextCard';
import SurpriseMeButton from '@/components/cute/SurpriseMeButton';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { allItems, categories, searchAndFilter } from '@/data';

/**
 * Explore 探索页
 * 主要使用页面：搜索框 + 分类筛选 + Surprise Me 按钮 + Pinterest 风格瀑布流卡片
 * 支持中英文搜索、分类筛选
 */
export default function ExplorePage() {
  const { t } = useLanguage();
  const gridRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // 搜索 + 分类筛选组合
  const filteredItems = useMemo(
    () => searchAndFilter(searchQuery, activeCategory),
    [searchQuery, activeCategory],
  );

  const handleCategoryChange = useCallback((id: string) => {
    setActiveCategory(id);
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Surprise Me - 随机滚动到某张卡片
  const handleSurprise = useCallback(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('[data-card]');
    if (cards.length === 0) return;
    const randomIndex = Math.floor(Math.random() * cards.length);
    const target = cards[randomIndex] as HTMLElement;
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
          <SearchBar onSearch={handleSearch} />
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
          <span className="text-sm tracking-wide text-[#c4a8a8]">
            ✦ {t.explore.galleryLabel} ✦
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#FFD1DC]" />
        </div>

        {/* 搜索结果计数 */}
        {searchQuery && (
          <p className="mb-4 text-center text-sm text-[#9b8585]">
            {filteredItems.length} / {allItems.length}
          </p>
        )}

        {/* 瀑布流卡片区域 */}
        {filteredItems.length > 0 ? (
          <section className="ct-masonry" ref={gridRef}>
            {filteredItems.map((item, index) => (
              <div key={item.id} data-card>
                <TextCard item={item} delay={Math.min(0.3 + index * 0.03, 0.9)} />
              </div>
            ))}
          </section>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 text-5xl opacity-40">🔍</div>
            <p className="text-lg text-[#9b8585]">{t.explore.noResults}</p>
          </div>
        )}

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
