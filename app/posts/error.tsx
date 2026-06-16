'use strict';
'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="text-center p-8 bg-white rounded-xl shadow-md max-w-md">
        <h2 className="text-2xl font-bold text-red-600 mb-2">Something went wrong!</h2>
        <p className="text-gray-600 mb-6">Could not load the blog posts. Please try again.</p>
        <button
          onClick={() => reset()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}