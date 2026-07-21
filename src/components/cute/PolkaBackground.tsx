/**
 * PolkaBackground - 波点背景层
 * 在页面底层叠加柔和的粉色波点图案
 */

interface PolkaBackgroundProps {
  className?: string;
}

export default function PolkaBackground({
  className = '',
}: PolkaBackgroundProps) {
  return (
    <div
      className={`ct-polka-dots pointer-events-none fixed inset-0 z-0 ${className}`}
      aria-hidden="true"
    />
  );
}
