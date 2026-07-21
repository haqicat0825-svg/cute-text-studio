'use client';

import { useState } from 'react';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { categoryToZh } from '@/data';

/**
 * CategoryBar - 分类按钮组
 * 横向排列的分类筛选按钮，点击切换激活状态
 * 支持中英文显示
 */

interface Category {
  id: string;
  label: string;
  icon: string;
}

interface CategoryBarProps {
  categories: readonly Category[];
  /** 选中分类变化时的回调 */
  onCategoryChange?: (id: string) => void;
}

export default function CategoryBar({
  categories,
  onCategoryChange,
}: CategoryBarProps) {
  const { t } = useLanguage();
  const [activeId, setActiveId] = useState(categories[0]?.id ?? 'all');

  const handleClick = (id: string) => {
    setActiveId(id);
    onCategoryChange?.(id);
  };

  // 获取分类显示名（中英文切换）
  const getLabel = (cat: Category) => {
    if (cat.id === 'all') return t.categories.all;
    const zh = categoryToZh[cat.id as keyof typeof categoryToZh];
    return zh ?? cat.label;
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
      {categories.map((cat) => {
        const isActive = activeId === cat.id;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => handleClick(cat.id)}
            className={`flex items-center gap-1.5 rounded-full border-2 px-4 py-2 text-sm font-medium transition-all md:px-5 ${
              isActive
                ? 'border-[#FF8FAB] bg-gradient-to-br from-[#FF8FAB] to-[#E8638A] text-white shadow-md'
                : 'border-pink-200 bg-white/70 text-[#7d6b6b] hover:border-[#FF8FAB] hover:bg-[#FFF5F0]'
            }`}
          >
            <span className="text-base">{cat.icon}</span>
            <span>{getLabel(cat)}</span>
          </button>
        );
      })}
    </div>
  );
}
