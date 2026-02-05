import { env } from './env';

// Simple client-side logger that doesn't use fs
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 4,
};

const level = () => {
  const isDevelopment = env.NODE_ENV === 'development';
  return isDevelopment ? 'debug' : 'info';
};

type LogMessage = string;
type LogMeta = Record<string, unknown>;

interface LogErrorOptions {
  error?: string;
  stack?: string;
  [key: string]: unknown;
}

class SimpleLogger {
  private _level: string;

  constructor() {
    this._level = level();
  }

  private formatMessage(level: string, message: string, meta?: LogMeta): string {
    const timestamp = new Date().toISOString();
    const metaStr = meta ? ` ${JSON.stringify(meta)}` : '';
    return `${timestamp} [${level}] ${message}${metaStr}`;
  }

  error(message: LogMessage, meta?: LogMeta): void;
  error(message: LogMessage, error?: Error, meta?: LogMeta): void;
  error(message: LogMessage, errorOrMeta?: Error | LogMeta, meta?: LogMeta): void {
    if (levels.error > levels[this._level as keyof typeof levels]) return;
    
    let logMeta: LogMeta = {};
    if (errorOrMeta instanceof Error) {
      logMeta = { error: errorOrMeta.message, stack: errorOrMeta.stack, ...meta };
    } else {
      logMeta = errorOrMeta || {};
    }
    console.error(this.formatMessage('ERROR', message, logMeta));
  }

  warn(message: LogMessage, meta?: LogMeta): void {
    if (levels.warn > levels[this._level as keyof typeof levels]) return;
    console.warn(this.formatMessage('WARN', message, meta));
  }

  info(message: LogMessage, meta?: LogMeta): void {
    if (levels.info > levels[this._level as keyof typeof levels]) return;
    console.log(this.formatMessage('INFO', message, meta));
  }

  http(message: LogMessage, meta?: LogMeta): void {
    console.log(this.formatMessage('HTTP', message, meta));
  }

  debug(message: LogMessage, meta?: LogMeta): void {
    if (levels.debug > levels[this._level as keyof typeof levels]) return;
    console.debug(this.formatMessage('DEBUG', message, meta));
  }
}

// Export a singleton logger for client-side use
const logger = new SimpleLogger();

export default logger;

// Helper functions for common logging patterns
export const logError = (message: string, error?: Error, meta?: Record<string, unknown>) => {
  logger.error(message, error, meta);
};

export const logInfo = (message: string, meta?: Record<string, unknown>) => {
  logger.info(message, meta);
};

export const logWarn = (message: string, meta?: Record<string, unknown>) => {
  logger.warn(message, meta);
};

export const logHttp = (message: string, meta?: Record<string, unknown>) => {
  logger.http(message, meta);
};

export const logDebug = (message: string, meta?: Record<string, unknown>) => {
  logger.debug(message, meta);
};
