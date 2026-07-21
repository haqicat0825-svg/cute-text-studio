'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/components/providers/LanguageProvider';
import LanguageToggle from '@/components/cute/LanguageToggle';

/**
 * Navbar - 顶部导航栏
 * 包含 Logo、导航链接（Explore / Create / Collection）和语言切换
 */

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useLanguage();

  // 不在 Welcome 页显示导航栏
  if (pathname === '/') return null;

  const navLinks = [
    { href: '/explore', label: t.nav.explore, icon: '✦' },
    { href: '/create', label: t.nav.create, icon: '✎' },
    { href: '/collection', label: t.nav.collection, icon: '♡' },
    { href: '/manager', label: t.manager.title, icon: '⚙' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#FFD1DC]/30 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-bold tracking-wide md:text-xl"
        >
          <span
            style={{
              background: 'linear-gradient(135deg, #FF8FAB 0%, #E8638A 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            ♡ Cute Text Studio ♡
          </span>
        </Link>

        {/* 右侧：导航链接 + 语言切换 */}
        <div className="flex items-center gap-2 md:gap-3">
          <nav className="flex items-center gap-1 md:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#FFD1DC] text-[#E8638A] shadow-sm'
                      : 'text-[#9b8585] hover:bg-[#FFF5F0] hover:text-[#E8638A]'
                  }`}
                >
                  <span className="text-base">{link.icon}</span>
                  <span className="hidden sm:inline">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* 语言切换 */}
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
