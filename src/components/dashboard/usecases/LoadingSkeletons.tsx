import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

export function UseCaseCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        {/* Thumbnail skeleton */}
        <Skeleton className="h-48 w-full" />
        
        {/* Content skeleton */}
        <div className="p-4">
          {/* Title */}
          <Skeleton className="h-6 w-3/4 mb-2" />
          
          {/* Summary */}
          <Skeleton className="h-4 w-full mb-3" />
          
          {/* Tags */}
          <div className="flex gap-2 mb-3">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-12" />
          </div>
          
          {/* Metrics */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
          
          {/* Bottom badges */}
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-14" />
            </div>
            <Skeleton className="h-5 w-12" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function CategoryRowSkeleton() {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 w-20" />
      </div>
      
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex-none w-80">
            <UseCaseCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroBannerSkeleton() {
  return (
    <Card className="border-0 overflow-hidden mb-8">
      <CardContent className="p-0">
        <div className="flex flex-col lg:flex-row min-h-[400px]">
          <div className="flex-1 p-8 lg:p-12">
            <div className="max-w-2xl">
              <div className="flex gap-2 mb-4">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-16" />
              </div>
              
              <Skeleton className="h-12 w-full mb-4" />
              <Skeleton className="h-12 w-3/4 mb-4" />
              
              <Skeleton className="h-20 w-full mb-6" />
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
              
              <div className="flex gap-4">
                <Skeleton className="h-12 w-32" />
                <Skeleton className="h-12 w-40" />
              </div>
            </div>
          </div>
          
          <div className="flex-1 p-8 lg:p-12">
            <Skeleton className="h-full w-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}