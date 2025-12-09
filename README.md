# 🛍️ Jumian - Modern E-Commerce Platform

A full-stack e-commerce platform built with Next.js 15, TypeScript, PostgreSQL, and modern best practices. Inspired by Jumia Kenya.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)](https://nextjs.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## ✨ Features

### Customer Features
- 🛒 **Shopping Cart** - Add products, manage quantities, apply promo codes
- 💳 **Multiple Payment Options** - M-Pesa, Credit Card, Cash on Delivery
- 👤 **User Authentication** - Secure sign-up and login with NextAuth.js
- ❤️ **Wishlist** - Save products for later
- 🔍 **Product Search & Filters** - Find products by category, price, ratings
- 📦 **Order Tracking** - View order history and status
- ⭐ **Product Reviews** - Rate and review purchased products
- 📱 **Responsive Design** - Optimized for all devices

### Admin Features
- 📊 **Analytics Dashboard** - Revenue, orders, products, users statistics
- 📦 **Product Management** - Full CRUD operations for products
- 🛍️ **Order Management** - View and update order statuses
- 👥 **User Management** - View and manage users
- 📉 **Low Stock Alerts** - Monitor inventory levels
- 🎯 **Promo Code Management** - Create and manage discount codes

### Technical Features
- ⚡ **Server-Side Rendering** - Fast page loads and SEO optimization
- 🔐 **Production-Grade Security** - Rate limiting, input sanitization, CSRF protection
- 📈 **Error Tracking** - Integrated with Sentry
- 🚀 **Redis Caching** - Optimized performance with caching
- 📧 **Email Notifications** - Order confirmations and updates
- 🧪 **Comprehensive Testing** - Unit, integration, and E2E tests
- 📝 **Structured Logging** - Winston for production-grade logging
- 🔄 **CI/CD Pipeline** - Automated testing and deployment

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3.4
- **State Management:** Zustand (cart/wishlist)
- **Icons:** Lucide React
- **Notifications:** React Hot Toast

### Backend
- **Runtime:** Node.js 20+
- **API:** Next.js API Routes
- **ORM:** Prisma 6
- **Database:** PostgreSQL 15+
- **Cache:** Redis 7+
- **Auth:** NextAuth.js 4

### Infrastructure
- **Payments:** M-Pesa, Stripe
- **Email:** Nodemailer (SMTP)
- **Monitoring:** Sentry
- **Logging:** Winston
- **Testing:** Jest, Playwright, React Testing Library

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 20 or higher
- PostgreSQL 15 or higher
- Redis 7 or higher (optional for local development)
- npm or yarn

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/jumian.git
cd jumian
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/jumian"

# Auth
NEXTAUTH_SECRET="your-secret-key-at-least-32-characters-long"
NEXTAUTH_URL="http://localhost:3000"

# Redis (optional for local dev)
REDIS_URL="redis://localhost:6379"

# Email
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
SMTP_FROM="noreply@jumian.com"

# M-Pesa
MPESA_CONSUMER_KEY="your-consumer-key"
MPESA_CONSUMER_SECRET="your-consumer-secret"
MPESA_SHORTCODE="174379"
MPESA_PASSKEY="your-passkey"
MPESA_ENVIRONMENT="sandbox"

# Sentry (optional)
SENTRY_DSN="https://your-sentry-dsn"
NEXT_PUBLIC_SENTRY_DSN="https://your-sentry-dsn"
```

4. **Set up the database:**
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed the database
npm run db:seed
```

5. **Start the development server:**
```bash
npm run dev
```

6. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

### Default Admin Credentials

After seeding, check the console output for admin credentials, or use:
- **Email:** `admin@jumian.com`
- **Password:** (displayed in console after seeding)

## 📚 Documentation

- **[Admin Dashboard Guide](./ADMIN_DASHBOARD_GUIDE.md)** - Complete guide for using the admin dashboard
- **[Implementation Guide](./IMPLEMENTATION_GUIDE.md)** - Detailed technical implementation guide
- **[Dependencies Guide](./DEPENDENCIES_TO_ADD.md)** - List of all dependencies and installation instructions

## 🧪 Testing

### Unit & Integration Tests

```bash
# Run tests in watch mode
npm test

# Run tests once (CI mode)
npm run test:ci

# Generate coverage report
npm run test:coverage
```

### End-to-End Tests

```bash
# Install Playwright browsers (first time only)
npx playwright install

# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui
```

### Test Coverage Goals
- Unit Tests: >70%
- Integration Tests: >60%
- E2E Tests: Critical user flows

## 📁 Project Structure

```
jumian/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   ├── auth/             # Authentication endpoints
│   │   ├── products/         # Product endpoints
│   │   ├── orders/           # Order endpoints
│   │   ├── mpesa/            # M-Pesa payment endpoints
│   │   └── admin/            # Admin endpoints
│   ├── admin/                # Admin dashboard pages
│   ├── auth/                 # Authentication pages
│   ├── cart/                 # Shopping cart
│   ├── checkout/             # Checkout flow
│   ├── category/             # Category pages
│   ├── product/              # Product detail pages
│   └── layout.tsx            # Root layout
├── components/               # React components
│   ├── admin/                # Admin-specific components
│   ├── Header.tsx            # Site header
│   ├── Footer.tsx            # Site footer
│   └── ProductCard.tsx       # Product card component
├── lib/                      # Utilities & services
│   ├── auth.ts               # NextAuth configuration
│   ├── prisma.ts             # Prisma client
│   ├── logger.ts             # Winston logger
│   ├── cache.ts              # Redis caching
│   ├── redis-rate-limit.ts   # Rate limiting
│   ├── mpesa.ts              # M-Pesa integration
│   ├── email.ts              # Email service
│   ├── validations.ts        # Zod schemas
│   ├── sanitize.ts           # Input sanitization
│   └── env.ts                # Environment validation
├── prisma/                   # Database
│   ├── schema.prisma         # Database schema
│   ├── seed.ts               # Seed script
│   └── migrations/           # Database migrations
├── tests/                    # Test suites
│   ├── unit/                 # Unit tests
│   ├── integration/          # Integration tests
│   └── e2e/                  # E2E tests
├── public/                   # Static assets
├── types/                    # TypeScript types
├── middleware.ts             # Next.js middleware
├── jest.config.js            # Jest configuration
├── playwright.config.ts      # Playwright configuration
└── tailwind.config.ts        # Tailwind configuration
```

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm test            # Run tests in watch mode
npm run test:ci     # Run tests once
npm run test:e2e    # Run E2E tests
npm run db:seed     # Seed database
npm run db:push     # Push schema changes
npm run db:studio   # Open Prisma Studio
```

### Code Quality

- **TypeScript Strict Mode** - Full type safety
- **ESLint** - Code linting with Next.js config
- **Prettier** - Code formatting (optional, add if needed)
- **Husky** - Pre-commit hooks (optional, add if needed)

### Environment-Specific Configuration

- **Development:** SQLite supported, Redis optional
- **Production:** PostgreSQL required, Redis required
- **Testing:** Separate test database, mocked services

## 🚀 Deployment

### Docker Deployment

1. **Build the image:**
```bash
docker-compose build
```

2. **Start the services:**
```bash
docker-compose up -d
```

3. **Run migrations:**
```bash
docker-compose exec app npx prisma migrate deploy
```

### Vercel Deployment

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Deploy:**
```bash
vercel deploy --prod
```

3. **Add environment variables** in Vercel dashboard

4. **Set up PostgreSQL** (Vercel Postgres or external)

5. **Set up Redis** (Upstash Redis or external)

### Manual Deployment

1. Build the application:
```bash
npm run build
```

2. Set up PostgreSQL and Redis

3. Run migrations:
```bash
npx prisma migrate deploy
```

4. Start the server:
```bash
npm start
```

## 🔐 Security

### Implemented Security Measures

- ✅ **Rate Limiting** - Redis-based sliding window algorithm
- ✅ **Input Validation** - Zod schemas for all user input
- ✅ **Input Sanitization** - XSS and SQL injection prevention
- ✅ **CSRF Protection** - NextAuth built-in protection
- ✅ **Security Headers** - CSP, HSTS, X-Frame-Options, etc.
- ✅ **Password Hashing** - bcryptjs with salt rounds
- ✅ **Session Management** - JWT-based with NextAuth
- ✅ **SQL Injection Prevention** - Prisma parameterized queries
- ✅ **Error Handling** - Sentry for tracking, sanitized error messages

### Security Checklist

- [ ] Change default admin password
- [ ] Use strong NEXTAUTH_SECRET (32+ characters)
- [ ] Enable HTTPS in production
- [ ] Configure CORS properly
- [ ] Set up firewall rules
- [ ] Regular dependency updates
- [ ] Enable Sentry in production
- [ ] Review security headers
- [ ] Implement API key rotation
- [ ] Set up backup strategy

## 📊 Performance

### Optimization Strategies

- **Server-Side Rendering** - Fast initial page loads
- **Redis Caching** - Cached product listings and frequent queries
- **Database Indexing** - Optimized queries with strategic indexes
- **Image Optimization** - Next.js Image component
- **Code Splitting** - Automatic with Next.js App Router
- **Lazy Loading** - Components loaded on demand

### Performance Targets

- **Time to First Byte (TTFB):** <200ms
- **First Contentful Paint (FCP):** <1.5s
- **Largest Contentful Paint (LCP):** <2.5s
- **Time to Interactive (TTI):** <3.5s
- **API Response Time:** <200ms (cached), <500ms (uncached)

## 🐛 Troubleshooting

### Common Issues

**Database Connection Failed:**
```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Test connection
psql -U your_user -d jumian
```

**Redis Connection Failed:**
```bash
# Check Redis is running
sudo systemctl status redis

# Test connection
redis-cli ping
```

**Prisma Client Error:**
```bash
# Regenerate Prisma client
npx prisma generate
```

**Port Already in Use:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for your changes
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Contribution Guidelines

- Write tests for new features
- Follow existing code style
- Update documentation
- Keep commits atomic and well-described
- Run `npm run lint` before committing
- Ensure all tests pass

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - Initial work - [YourGithub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Inspired by [Jumia Kenya](https://www.jumia.co.ke/)
- Built with [Next.js](https://nextjs.org/)
- Database powered by [Prisma](https://www.prisma.io/)
- Authentication by [NextAuth.js](https://next-auth.js.org/)

## 📞 Support

For support, email support@jumian.com or open an issue on GitHub.

## 🗺️ Roadmap

### Phase 1: Core Features (✅ Complete)
- [x] Product catalog
- [x] Shopping cart
- [x] User authentication
- [x] Order management
- [x] Admin dashboard

### Phase 2: Production Ready (🚧 In Progress)
- [ ] Comprehensive testing
- [ ] PostgreSQL migration
- [ ] Redis caching
- [ ] Error tracking
- [ ] Email notifications

### Phase 3: Advanced Features (📋 Planned)
- [ ] Real-time order tracking
- [ ] Live chat support
- [ ] Product recommendations
- [ ] Mobile app (React Native)
- [ ] Multi-vendor support
- [ ] Advanced analytics
- [ ] Internationalization (i18n)
- [ ] GraphQL API

---

Made with ❤️ in Kenya
