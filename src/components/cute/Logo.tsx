import Link from 'next/link';

/**
 * Logo - Cute Text Studio 品牌标识
 * 带蝴蝶结符号的可爱 Logo
 */

interface LogoProps {
  /** 尺寸变体 */
  size?: 'sm' | 'md' | 'lg';
  /** 是否可点击跳转到首页 */
  asLink?: boolean;
}

const sizeMap = {
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-4xl md:text-5xl',
};

export default function Logo({ size = 'md', asLink = false }: LogoProps) {
  const content = (
    <span
      className={`font-bold tracking-wide ${sizeMap[size]}`}
      style={{
        background: 'linear-gradient(135deg, #FF8FAB 0%, #E8638A 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      ♡ Cute Text Studio ♡
    </span>
  );

  if (asLink) {
    return (
      <Link href="/" className="inline-block transition-opacity hover:opacity-80">
        {content}
      </Link>
    );
  }

  return content;
}
