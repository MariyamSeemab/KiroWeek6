import React from 'react';

interface SkeletonLoaderProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular' | 'gauge';
  width?: string | number;
  height?: string | number;
  lines?: number;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  className = '',
  variant = 'rectangular',
  width = '100%',
  height = '1rem',
  lines = 1
}) => {
  const baseClasses = 'animate-pulse bg-slate-700/50 rounded';
  
  const getVariantClasses = () => {
    switch (variant) {
      case 'text':
        return 'h-4 rounded';
      case 'circular':
        return 'rounded-full';
      case 'gauge':
        return 'rounded-full aspect-square';
      case 'rectangular':
      default:
        return 'rounded';
    }
  };

  const getStyle = () => ({
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  });

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`${baseClasses} ${getVariantClasses()}`}
            style={{
              width: index === lines - 1 ? '75%' : '100%',
              height: typeof height === 'number' ? `${height}px` : height,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${baseClasses} ${getVariantClasses()} ${className}`}
      style={getStyle()}
    />
  );
};

// Specialized skeleton components for common use cases
export const TextSkeleton: React.FC<{ lines?: number; className?: string }> = ({ 
  lines = 1, 
  className = '' 
}) => (
  <SkeletonLoader variant="text" lines={lines} className={className} />
);

export const GaugeSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex flex-col items-center space-y-4 ${className}`}>
    <SkeletonLoader variant="gauge" width={200} height={200} />
    <SkeletonLoader variant="text" width={120} height={16} />
    <SkeletonLoader variant="text" width={80} height={14} />
  </div>
);

export const CardSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`p-4 border border-slate-700 rounded-lg space-y-3 ${className}`}>
    <SkeletonLoader variant="text" width="60%" height={20} />
    <SkeletonLoader variant="text" lines={2} height={16} />
    <SkeletonLoader variant="rectangular" width="100%" height={40} />
  </div>
);

export const ComparisonSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}>
    <CardSkeleton />
    <div className="flex items-center justify-center">
      <div className="text-2xl font-bold text-slate-600">VS</div>
    </div>
    <CardSkeleton />
  </div>
);

export default SkeletonLoader;