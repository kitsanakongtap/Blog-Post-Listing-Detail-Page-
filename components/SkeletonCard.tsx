export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="space-y-2 mb-6">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
      <div className="h-9 bg-gray-200 rounded w-24"></div>
    </div>
  );
}