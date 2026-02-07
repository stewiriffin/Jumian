import 'next-auth';
import { DefaultSession } from 'next-auth';
import { UserRole } from '@prisma/client';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: 'user' | 'admin' | 'vendor';
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    role: 'user' | 'admin' | 'vendor';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: 'user' | 'admin' | 'vendor';
  }
}
