/**
 * LanguageProvider - 语言切换 Context
 * 使用 localStorage 持久化语言偏好
 */

'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { translations, type Locale, type TranslationKeys } from '@/lib/i18n';

const STORAGE_KEY = 'cute-text-studio-lang';

interface LanguageContextValue {
  locale: Locale;
  t: TranslationKeys;
  toggle: () => void;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [hydrated, setHydrated] = useState(false);

  // 客户端挂载后读取 localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'zh' || saved === 'en') {
        setLocaleState(saved);
      }
    } catch {
      // 读取失败时默认使用英文
    }
    setHydrated(true);
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
    } catch {
      // 写入失败时静默处理
    }
  }, []);

  const toggle = useCallback(() => {
    setLocaleState((prev) => {
      const next = prev === 'en' ? 'zh' : 'en';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // 写入失败时静默处理
      }
      return next;
    });
  }, []);

  const value: LanguageContextValue = {
    locale,
    t: translations[locale],
    toggle,
    setLocale,
  };

  // 防止 hydration mismatch：未完成首次读取前不渲染内容
  if (!hydrated) {
    return (
      <LanguageContext.Provider value={value}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
}
