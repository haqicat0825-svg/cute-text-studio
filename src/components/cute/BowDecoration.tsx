/**
 * BowDecoration - 蝴蝶结装饰 SVG 组件
 * 用柔和的粉色线条绘制可爱蝴蝶结
 */

interface BowDecorationProps {
  className?: string;
}

export default function BowDecoration({ className = '' }: BowDecorationProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Left bow loop */}
      <path
        d="M60 40 C 40 15, 10 15, 8 35 C 6 55, 35 60, 60 40 Z"
        fill="#FFD1DC"
        stroke="#FF8FAB"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Right bow loop */}
      <path
        d="M60 40 C 80 15, 110 15, 112 35 C 114 55, 85 60, 60 40 Z"
        fill="#FFD1DC"
        stroke="#FF8FAB"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Center knot */}
      <rect
        x="52"
        y="32"
        width="16"
        height="18"
        rx="4"
        fill="#FF8FAB"
        stroke="#E8638A"
        strokeWidth="1.5"
      />
      {/* Left ribbon tail */}
      <path
        d="M54 50 C 48 58, 40 65, 35 72 L 42 70 L 48 74 C 50 66, 52 58, 56 52 Z"
        fill="#FFD1DC"
        stroke="#FF8FAB"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Right ribbon tail */}
      <path
        d="M66 50 C 72 58, 80 65, 85 72 L 78 70 L 72 74 C 70 66, 68 58, 64 52 Z"
        fill="#FFD1DC"
        stroke="#FF8FAB"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Highlight dots on bow loops */}
      <circle cx="25" cy="32" r="3" fill="#FFF" opacity="0.6" />
      <circle cx="95" cy="32" r="3" fill="#FFF" opacity="0.6" />
    </svg>
  );
}
