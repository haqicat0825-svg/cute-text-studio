/**
 * LanguageToggle - 语言切换按钮
 * 中文 / English 切换
 */

'use client';

import { useLanguage } from '@/components/providers/LanguageProvider';

export default function LanguageToggle() {
  const { locale, toggle } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggle}
      className="flex items-center gap-1.5 rounded-full border-2 border-[#FFD1DC]/50 bg-white/60 px-3 py-1.5 text-xs font-medium text-[#9b8585] transition-all hover:border-[#FF8FAB] hover:bg-[#FFF5F0] hover:text-[#E8638A] active:scale-95"
      aria-label="Toggle language"
    >
      <span className={locale === 'zh' ? 'text-[#E8638A] font-semibold' : ''}>
        中文
      </span>
      <span className="text-[#c4a8a8]">/</span>
      <span className={locale === 'en' ? 'text-[#E8638A] font-semibold' : ''}>
        EN
      </span>
    </button>
  );
}
