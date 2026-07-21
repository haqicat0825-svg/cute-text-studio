'use client';

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import FloatingStars from '@/components/cute/FloatingStars';
import PolkaBackground from '@/components/cute/PolkaBackground';
import { useLanguage } from '@/components/providers/LanguageProvider';
import {
  allItems,
  brokenLibrary,
  pendingItems,
  getMaterialStats,
  categoryToZh,
} from '@/data';
import { validateText, statusToLabel, statusToLabelEn } from '@/lib/materialValidator';
import type { MaterialStatus, ItemType } from '@/data/types';

type FilterStatus = 'all' | MaterialStatus;

const STATUS_COLORS: Record<MaterialStatus, string> = {
  verified: 'bg-[#C8E6D5] text-[#4A8A6A]',
  pending: 'bg-[#FFD4B8] text-[#C97A4A]',
  broken: 'bg-[#FFC4B8] text-[#D95A4A]',
};

const TYPE_LABELS: Record<ItemType, string> = {
  kaomoji: 'Kaomoji',
  unicode: 'Unicode',
  decoration: 'Decoration',
  'cute-text': 'Cute Text',
  divider: 'Divider',
};

export default function ManagerPage() {
  const { t, locale } = useLanguage();
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const stats = useMemo(() => getMaterialStats(), []);

  // 验证每个素材
  const validatedItems = useMemo(() => {
    return allItems.map((item) => ({
      item,
      validation: validateText(item.content),
    }));
  }, []);

  // 过滤素材
  const filteredItems = useMemo(() => {
    let items = validatedItems;

    if (filter === 'verified') {
      items = items.filter((x) => x.item.status === 'verified');
    } else if (filter === 'pending') {
      items = items.filter((x) => x.item.status === 'pending');
    } else if (filter === 'broken') {
      return []; // broken items are shown separately
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter(
        (x) =>
          x.item.id.toLowerCase().includes(q) ||
          x.item.title.toLowerCase().includes(q) ||
          x.item.content.toLowerCase().includes(q)
      );
    }

    return items;
  }, [filter, searchQuery, validatedItems]);

  const statusLabel = useCallback(
    (status: MaterialStatus) => {
      return locale === 'zh' ? statusToLabel(status) : statusToLabelEn(status);
    },
    [locale]
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FFF9F5]">
      <PolkaBackground />
      <FloatingStars />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
        {/* 标题区 */}
        <section
          className="ct-anim-fade-up mb-8 text-center"
        >
          <h1 className="mb-1 font-display text-3xl font-bold tracking-wide md:text-4xl">
            <span
              style={{
                background: 'linear-gradient(135deg, #FF8FAB 0%, #E8638A 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              ⚙ {t.manager.title}
            </span>
          </h1>
          <p className="text-sm tracking-wide text-[#9b8585]">{t.manager.subtitle}</p>
        </section>

        {/* 统计卡片 */}
        <section
          className="ct-anim-fade-up mb-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
          style={{ animationDelay: '0.1s' }}
        >
          <StatCard
            label={t.manager.statsTotal}
            value={stats.total}
            color="bg-gradient-to-br from-[#FFD1DC] to-[#FF8FAB]"
            textColor="text-white"
            onClick={() => setFilter('all')}
            active={filter === 'all'}
          />
          <StatCard
            label={t.manager.statsVerified}
            value={stats.verified}
            color="bg-gradient-to-br from-[#C8E6D5] to-[#8ECDAE]"
            textColor="text-white"
            onClick={() => setFilter('verified')}
            active={filter === 'verified'}
          />
          <StatCard
            label={t.manager.statsPending}
            value={stats.pending}
            color="bg-gradient-to-br from-[#FFD4B8] to-[#FFB88A]"
            textColor="text-white"
            onClick={() => setFilter('pending')}
            active={filter === 'pending'}
          />
          <StatCard
            label={t.manager.statsBroken}
            value={stats.broken}
            color="bg-gradient-to-br from-[#FFC4B8] to-[#FF8A7A]"
            textColor="text-white"
            onClick={() => setFilter('broken')}
            active={filter === 'broken'}
          />
        </section>

        {/* 按类型统计 */}
        <section
          className="ct-anim-fade-up mb-8 flex flex-wrap items-center justify-center gap-2 md:gap-3"
          style={{ animationDelay: '0.15s' }}
        >
          {(Object.keys(stats.byType) as ItemType[]).map((type) => (
            <div
              key={type}
              className="flex items-center gap-2 rounded-full border border-[#FFD1DC]/40 bg-white/60 px-4 py-2"
            >
              <span className="text-sm font-medium text-[#9b8585]">{TYPE_LABELS[type]}</span>
              <span className="rounded-full bg-[#FFD1DC] px-2 py-0.5 text-xs font-bold text-[#E8638A]">
                {stats.byType[type]}
              </span>
            </div>
          ))}
        </section>

        {/* Broken 素材展示 */}
        {filter === 'broken' ? (
          <section className="ct-anim-fade-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-[#D95A4A]">
              <span>⚠</span> {t.manager.brokenItemsTitle}
              <span className="text-sm font-normal text-[#9b8585]">
                ({brokenLibrary.length} {t.manager.itemsCount})
              </span>
            </h2>
            {brokenLibrary.length > 0 ? (
              <div className="space-y-3">
                {brokenLibrary.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border-2 border-[#FFC4B8] bg-[#FFF5F0] p-5"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-[#9b8585]">{item.id}</span>
                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_COLORS.broken}`}>
                          {statusLabel('broken')}
                        </span>
                      </div>
                      <span className="text-xs text-[#9b8585]">{TYPE_LABELS[item.type]}</span>
                    </div>
                    <div className="mb-3 rounded-xl bg-white/50 p-3">
                      <pre className="whitespace-pre-wrap break-words font-mono text-sm text-[#5c4a4a]">
                        {item.originalText}
                      </pre>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="text-[#9b8585]">
                        {t.manager.brokenReason}:
                      </span>
                      <span className="text-[#D95A4A]">{item.errorReason}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="py-10 text-center text-[#9b8585]">{t.manager.noItems}</p>
            )}
          </section>
        ) : (
          <>
            {/* 搜索框 */}
            <section
              className="ct-anim-fade-up mb-6"
              style={{ animationDelay: '0.2s' }}
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.manager.searchPlaceholder}
                className="w-full max-w-md rounded-full border-2 border-[#FFD1DC]/50 bg-white/80 px-5 py-3 text-sm text-[#5c4a4a] outline-none transition-all placeholder:text-[#c4a8a8] focus:border-[#FF8FAB] focus:bg-white"
              />
            </section>

            {/* 筛选标签 */}
            <section
              className="ct-anim-fade-up mb-6 flex flex-wrap items-center gap-2"
              style={{ animationDelay: '0.25s' }}
            >
              {(['all', 'verified', 'pending'] as FilterStatus[]).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setFilter(status)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    filter === status
                      ? 'bg-[#FFD1DC] text-[#E8638A] shadow-sm'
                      : 'bg-white/60 text-[#9b8585] hover:bg-[#FFF5F0]'
                  }`}
                >
                  {status === 'all'
                    ? t.manager.filterAll
                    : status === 'verified'
                    ? t.manager.filterVerified
                    : t.manager.filterPending}
                </button>
              ))}
              <span className="ml-2 text-sm text-[#9b8585]">
                {filteredItems.length} {t.manager.itemsCount}
              </span>
            </section>

            {/* 素材列表 */}
            {filteredItems.length > 0 ? (
              <section className="ct-anim-fade-up space-y-3" style={{ animationDelay: '0.3s' }}>
                {filteredItems.map(({ item, validation }) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border-2 border-[#FFD1DC]/40 bg-white/60 p-5 transition-all hover:border-[#FFD1DC] hover:shadow-sm"
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      {/* 左侧：内容预览 */}
                      <div className="flex-1">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <span className="text-xs font-mono text-[#9b8585]">{item.id}</span>
                          <span className="rounded-full bg-[#FFF5F0] px-2.5 py-0.5 text-xs text-[#9b8585]">
                            {TYPE_LABELS[item.type]}
                          </span>
                          <span className="rounded-full bg-[#FFF5F0] px-2.5 py-0.5 text-xs text-[#9b8585]">
                            {locale === 'zh' ? categoryToZh[item.category] : item.category}
                          </span>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                              STATUS_COLORS[item.status ?? 'verified']
                            }`}
                          >
                            {statusLabel(item.status ?? 'verified')}
                          </span>
                        </div>
                        <h3 className="mb-1 font-display font-semibold text-[#E8638A]">
                          {item.title}
                        </h3>
                        <div className="rounded-xl bg-white/60 p-3">
                          <pre className="whitespace-pre-wrap break-words font-mono text-base leading-relaxed text-[#5c4a4a]">
                            {item.content}
                          </pre>
                        </div>
                        {/* 标签 */}
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-white/60 px-2 py-0.5 text-xs text-[#9b8585]"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* 右侧：测试结果 */}
                      <div className="flex shrink-0 flex-col gap-2 md:w-40">
                        <TestBadge
                          label={t.manager.displayTest}
                          passed={validation.isValid}
                          passLabel={t.manager.testPass}
                          failLabel={t.manager.testFail}
                        />
                        <TestBadge
                          label={t.manager.copyTest}
                          passed={validation.isValid}
                          passLabel={t.manager.testPass}
                          failLabel={t.manager.testFail}
                        />
                        <TestBadge
                          label={t.manager.mobileTest}
                          passed={validation.isValid}
                          passLabel={t.manager.testPass}
                          failLabel={t.manager.testFail}
                        />
                        {/* 验证警告 */}
                        {validation.warnings.length > 0 && (
                          <div className="rounded-lg bg-[#FFF5F0] p-2 text-xs text-[#C97A4A]">
                            {validation.warnings[0]}
                          </div>
                        )}
                        {/* 验证问题详情 */}
                        {validation.issues.length > 0 && (
                          <div className="rounded-lg bg-[#FFC4B8]/30 p-2 text-xs text-[#D95A4A]">
                            {validation.issues.length} issue(s) detected
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 待审核素材的操作按钮 */}
                    {item.status === 'pending' && (
                      <div className="mt-3 flex gap-2 border-t border-[#FFD1DC]/20 pt-3">
                        <button
                          type="button"
                          className="rounded-full bg-[#C8E6D5] px-4 py-2 text-sm font-medium text-[#4A8A6A] transition-all hover:bg-[#8ECDAE] hover:text-white active:scale-95"
                        >
                          ✓ {t.manager.approve}
                        </button>
                        <button
                          type="button"
                          className="rounded-full bg-[#FFC4B8] px-4 py-2 text-sm font-medium text-[#D95A4A] transition-all hover:bg-[#FF8A7A] hover:text-white active:scale-95"
                        >
                          ✗ {t.manager.reject}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </section>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="mb-4 text-5xl opacity-40">📭</div>
                <p className="text-lg text-[#9b8585]">{t.manager.noItems}</p>
              </div>
            )}
          </>
        )}

        {/* 返回按钮 */}
        <div className="mt-12 text-center">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#FFD1DC] bg-white/60 px-6 py-3 text-sm font-medium text-[#E8638A] transition-all hover:bg-[#FFD1DC] hover:text-white active:scale-95"
          >
            <span>←</span> {t.manager.backToExplore}
          </Link>
        </div>
      </div>
    </main>
  );
}

/** 统计卡片组件 */
function StatCard({
  label,
  value,
  color,
  textColor,
  onClick,
  active,
}: {
  label: string;
  value: number;
  color: string;
  textColor: string;
  onClick: () => void;
  active: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border-2 p-4 text-center transition-all ${
        active ? 'border-[#FF8FAB] shadow-md' : 'border-transparent'
      } ${color} ${textColor}`}
    >
      <div className="text-2xl font-bold md:text-3xl">{value}</div>
      <div className="mt-1 text-xs opacity-90">{label}</div>
    </button>
  );
}

/** 测试结果徽章 */
function TestBadge({
  label,
  passed,
  passLabel,
  failLabel,
}: {
  label: string;
  passed: boolean;
  passLabel: string;
  failLabel: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-white/40 px-3 py-1.5">
      <span className="text-xs text-[#9b8585]">{label}</span>
      <span
        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
          passed
            ? 'bg-[#C8E6D5] text-[#4A8A6A]'
            : 'bg-[#FFC4B8] text-[#D95A4A]'
        }`}
      >
        {passed ? `✓ ${passLabel}` : `✗ ${failLabel}`}
      </span>
    </div>
  );
}
