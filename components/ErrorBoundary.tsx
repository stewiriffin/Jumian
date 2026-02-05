'use client';

import { Component, ReactNode } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by ErrorBoundary:', error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="text-red-500" size={32} />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Something went wrong
            </h2>
            
            <p className="text-gray-600 mb-6">
              We encountered an unexpected error. Please try again or return to the homepage.
            </p>

            {this.state.error && process.env.NODE_ENV === 'development' && (
              <div className="mb-6 p-4 bg-red-50 rounded-lg text-left">
                <p className="text-sm text-red-800 font-medium">Error:</p>
                <p className="text-xs text-red-600 font-mono mt-1">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleRetry}
                className="inline-flex items-center justify-center px-6 py-3 bg-jumia-orange text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                <RefreshCw className="mr-2" size={18} />
                Try Again
              </button>
              
              <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-colors"
              >
                <Home className="mr-2" size={18} />
                Go Home
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
