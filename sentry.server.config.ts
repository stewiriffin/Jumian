import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // Adjust this value in production
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Environment
  environment: process.env.NODE_ENV,

  // Integrations
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Postgres(),
  ],

  // Filter out errors we don't want to track
  beforeSend(event, hint) {
    const error = hint.originalException

    // Don't send development errors
    if (process.env.NODE_ENV === 'development') {
      return null
    }

    // Filter out known/expected errors
    if (error && typeof error === 'object' && 'message' in error) {
      const message = (error as Error).message
      if (
        message.includes('ECONNREFUSED') ||
        message.includes('Module not found')
      ) {
        return null
      }
    }

    return event
  },

  // Performance
  enabled: process.env.NODE_ENV === 'production',
})
