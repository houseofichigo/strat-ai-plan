import React, { Suspense } from 'react';
import { GridSkeleton } from '@/components/ui/loading-skeleton';

interface LazyComponentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function LazyWrapper({ children, fallback }: LazyComponentProps) {
  return (
    <Suspense fallback={fallback || <GridSkeleton items={6} />}>
      {children}
    </Suspense>
  );
}

// HOC for lazy loading components
export function withLazyLoading<T extends Record<string, any>>(
  Component: React.ComponentType<T>,
  fallback?: React.ReactNode
) {
  const LazyComponent = React.lazy(() => Promise.resolve({ default: Component }));
  
  return function WrappedComponent(props: T) {
    return (
      <LazyWrapper fallback={fallback}>
        <LazyComponent {...(props as any)} />
      </LazyWrapper>
    );
  };
}