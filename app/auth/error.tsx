'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const [errorMessage, setErrorMessage] = useState('An error occurred');

  useEffect(() => {
    switch (error) {
      case 'Configuration':
        setErrorMessage('There is a problem with the server configuration.');
        break;
      case 'AccessDenied':
        setErrorMessage('Access was denied. You may not have permission to sign in.');
        break;
      case 'Verification':
        setErrorMessage('The verification link may have expired or already been used.');
        break;
      case 'OAuthSignin':
      case 'OAuthCallback':
      case 'OAuthCreateAccount':
      case 'EmailCreateAccount':
      case 'Callback':
        setErrorMessage('There was a problem with the OAuth or authentication process.');
        break;
      case 'OAuthAccountNotLinked':
        setErrorMessage('This email is already associated with another account.');
        break;
      case 'SessionRequired':
        setErrorMessage('Please sign in to access this page.');
        break;
      default:
        setErrorMessage(error || 'An unknown error occurred');
    }
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold mb-4">Authentication Error</h1>
        <p className="text-gray-600 mb-6">{errorMessage}</p>
        
        <div className="space-y-3">
          <Link
            href="/auth/signin"
            className="block w-full bg-jumia-orange text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors"
          >
            Try Signing In Again
          </Link>
          <Link
            href="/auth/signup"
            className="block w-full border-2 border-jumia-orange text-jumia-orange py-3 rounded-lg font-bold hover:bg-orange-50 transition-colors"
          >
            Create New Account
          </Link>
          <Link
            href="/"
            className="block text-gray-600 hover:text-jumia-orange"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
