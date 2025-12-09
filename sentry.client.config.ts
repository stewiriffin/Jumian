import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // Adjust this value in production
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Capture Replay for 10% of all sessions,
  // plus 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  // Environment
  environment: process.env.NODE_ENV,

  // Integrations
  integrations: [
    new Sentry.Replay({
      maskAllText: true,
      blockAllMedia: true,
    }),
    new Sentry.BrowserTracing({
      // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
    }),
  ],

  // Filter out errors we don't want to track
  beforeSend(event, hint) {
    const error = hint.originalException

    // Don't send development errors
    if (process.env.NODE_ENV === 'development') {
      return null
    }

    // Filter out common browser errors
    if (error && typeof error === 'object' && 'message' in error) {
      const message = (error as Error).message
      if (
        message.includes('ResizeObserver') ||
        message.includes('Non-Error promise rejection')
      ) {
        return null
      }
    }

    return event
  },

  // Performance
  enabled: process.env.NODE_ENV === 'production',
})
