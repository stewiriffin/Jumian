'use client';

import { useEffect } from 'react';

export default function APIError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('API error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4">API Error</h2>
        <button
          onClick={reset}
          className="bg-jumia-orange text-white px-6 py-2 rounded-lg hover:bg-orange-600"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
