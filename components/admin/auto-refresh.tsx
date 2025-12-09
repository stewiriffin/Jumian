'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface AutoRefreshProps {
  interval?: number; // in seconds
}

export function AutoRefresh({ interval = 30 }: AutoRefreshProps) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(interval);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.refresh();
          return interval;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router, interval, isPaused]);

  const handleRefreshNow = () => {
    router.refresh();
    setCountdown(interval);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
    if (isPaused) {
      setCountdown(interval);
    }
  };

  return (
    <div className="flex items-center gap-3 text-sm text-gray-600">
      <div className="flex items-center gap-2">
        <button
          onClick={handleRefreshNow}
          className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-md transition-colors font-medium"
          title="Refresh now"
        >
          🔄 Refresh
        </button>
        <button
          onClick={togglePause}
          className={`px-3 py-1.5 rounded-md transition-colors font-medium ${
            isPaused
              ? 'bg-green-50 text-green-600 hover:bg-green-100'
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          }`}
          title={isPaused ? 'Resume auto-refresh' : 'Pause auto-refresh'}
        >
          {isPaused ? '▶️ Resume' : '⏸️ Pause'}
        </button>
      </div>
      {!isPaused && (
        <span className="text-xs text-gray-500">
          Auto-refresh in {countdown}s
        </span>
      )}
      {isPaused && (
        <span className="text-xs text-orange-500 font-medium">
          Auto-refresh paused
        </span>
      )}
    </div>
  );
}
