import SkeletonCard from '@/components/SkeletonCard';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-10 animate-pulse"></div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}