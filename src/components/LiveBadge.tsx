'use client';

interface LiveBadgeProps {
  isLive: boolean;
  className?: string;
}

export default function LiveBadge({ isLive, className = '' }: LiveBadgeProps) {
  if (!isLive) return null;

  return (
    <div
      className={`absolute -top-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 bg-red-600 px-2 py-0.5 rounded-full shadow-lg animate-pulse ${className}`}
    >
      <span className='w-2 h-2 bg-white rounded-full animate-ping'></span>
      <span className='text-white text-[10px] md:text-xs font-bold uppercase tracking-wider'>
        LIVE
      </span>
    </div>
  );
}

interface LiveIndicatorWrapperProps {
  isLive: boolean;
  children: React.ReactNode;
  normalBorderClass?: string;
  className?: string;
}

export function LiveIndicatorWrapper({
  isLive,
  children,
  normalBorderClass = 'border-yellow-500',
  className = '',
}: LiveIndicatorWrapperProps) {
  const liveBorderClass = isLive
    ? 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.6),0_0_40px_rgba(239,68,68,0.3)]'
    : normalBorderClass;

  return (
    <div className={`relative ${className}`}>
      <LiveBadge isLive={isLive} />
      <div className={`${liveBorderClass} transition-all duration-500`}>
        {children}
      </div>
    </div>
  );
}
