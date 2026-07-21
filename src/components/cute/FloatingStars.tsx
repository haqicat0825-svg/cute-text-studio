'use client';

/**
 * FloatingStars - 轻微漂浮的小星星装饰
 * 在页面背景中随机散布星星，带浮动动画
 */

interface StarConfig {
  left: string;
  top: string;
  size: string;
  delay: string;
  duration: string;
}

interface FloatingStarsProps {
  /** 星星配置数组，如果不传则使用默认配置 */
  stars?: StarConfig[];
}

const defaultStars: StarConfig[] = [
  { left: '8%', top: '12%', size: 'text-2xl', delay: '0s', duration: '3s' },
  { left: '85%', top: '18%', size: 'text-xl', delay: '0.5s', duration: '3.5s' },
  { left: '15%', top: '70%', size: 'text-3xl', delay: '1s', duration: '4s' },
  { left: '90%', top: '65%', size: 'text-xl', delay: '0.3s', duration: '3.2s' },
  { left: '50%', top: '8%', size: 'text-lg', delay: '0.8s', duration: '2.8s' },
  { left: '75%', top: '85%', size: 'text-2xl', delay: '1.2s', duration: '3.8s' },
  { left: '25%', top: '40%', size: 'text-lg', delay: '0.6s', duration: '3s' },
  { left: '60%', top: '50%', size: 'text-xl', delay: '1.5s', duration: '3.5s' },
];

export default function FloatingStars({ stars = defaultStars }: FloatingStarsProps) {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {stars.map((star, index) => (
        <span
          key={index}
          className={`ct-anim-float absolute ${star.size} opacity-50`}
          style={{
            left: star.left,
            top: star.top,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        >
          ✨
        </span>
      ))}
    </div>
  );
}
