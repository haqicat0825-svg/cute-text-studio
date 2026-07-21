'use client';

import { useState } from 'react';

/**
 * SearchBar - 大型搜索/AI 输入框
 * 带有可爱样式的搜索输入框和示例提示
 */

interface SearchBarProps {
  /** 示例提示文本列表 */
  examples?: string[];
}

export default function SearchBar({
  examples = ['pink birthday style', 'soft korean aesthetic', 'summer diary'],
}: SearchBarProps) {
  const [value, setValue] = useState('');
  const [activeExample, setActiveExample] = useState(0);

  const handleExampleClick = (text: string) => {
    setValue(text);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* 搜索框 */}
      <div className="relative group">
        {/* 输入框外层光晕 */}
        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-pink-200 via-rose-200 to-pink-200 opacity-60 blur-sm transition-opacity group-focus-within:opacity-100" />

        {/* 输入框本体 */}
        <div className="relative flex items-center rounded-full border-2 border-pink-200 bg-white/90 px-6 py-4 shadow-sm transition-shadow group-focus-within:shadow-md">
          <span className="mr-3 text-2xl">✨</span>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Tell me your cute style..."
            className="flex-1 bg-transparent text-base text-[#5c4a4a] placeholder:text-[#9b8585] focus:outline-none"
          />
          <button
            type="button"
            className="ml-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FF8FAB] to-[#E8638A] text-white shadow-sm transition-transform hover:scale-105 active:scale-95"
            aria-label="Search"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* 示例提示 */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <span className="text-sm text-[#9b8585]">Try:</span>
        {examples.map((example, index) => (
          <button
            key={example}
            type="button"
            onClick={() => {
              setActiveExample(index);
              handleExampleClick(example);
            }}
            className={`rounded-full border px-4 py-1.5 text-sm transition-all ${
              activeExample === index && value === example
                ? 'border-[#FF8FAB] bg-[#FFD1DC] text-[#E8638A]'
                : 'border-pink-200 bg-white/60 text-[#9b8585] hover:border-[#FF8FAB] hover:text-[#E8638A]'
            }`}
          >
            {example}
          </button>
        ))}
      </div>
    </div>
  );
}
