# Jumian E-Commerce Platform

A **full-stack** modern e-commerce platform built with Next.js 15, inspired by Jumia.com. This project features a complete backend with database, authentication, real-time cart management, order processing, and admin dashboard.

## 🚀 Features

### Frontend Features
- **Modern UI/UX**: Clean and responsive design inspired by Jumia.com
- **Product Catalog**: Browse 12+ pre-loaded products across 8 categories
- **Advanced Filtering**: Filter by price, rating, availability, and discount percentage
- **Real-time Search**: Search products with instant API results
- **Product Details**: Image galleries, specifications, reviews, and related products
- **Shopping Cart**: Persistent cart with Zustand state management
- **Wishlist System**: Save favorite products (requires login)
- **Responsive Design**: Mobile-first design, fully responsive
- **Flash Sales Section**: Highlighted deals and discounts
- **Toast Notifications**: Real-time user feedback

### Backend Features
- **Database**: SQLite database with Prisma ORM (easily switchable to PostgreSQL/MySQL)
- **Authentication**: NextAuth.js with credential-based login + JWT sessions
- **User Management**: Registration, login, profile, role-based access
- **Role System**: User, Admin, and Vendor roles with different permissions
- **Order Management**: Complete order lifecycle with status tracking
- **Product Reviews**: Users can rate and review products
- **Cart Sync**: Server-side cart synchronization for logged-in users
- **RESTful API**: Clean API routes for all CRUD operations
- **Admin Dashboard**: Product, order, and user management (admin only)
- **Secure**: Password hashing with bcrypt, protected routes

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand (cart & wishlist)
- **Icons**: Lucide React
- **Notifications**: react-hot-toast
- **Forms**: React Hook Form with Zod validation

### Backend
- **Database**: SQLite (via Prisma ORM)
- **ORM**: Prisma Client
- **Authentication**: NextAuth.js v4
- **API**: Next.js API Routes
- **Password Hashing**: bcryptjs
- **Session**: JWT-based sessions
- **Runtime**: Node.js

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Quick Start

1. **Clone the repository**:
```bash
git clone <your-repo-url>
cd jumian
```

2. **Install dependencies**:
```bash
npm install
```

3. **Set up environment variables**:
The `.env` file is already created with defaults. For production, update these values:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key-change-this-in-production"
NEXTAUTH_URL="http://localhost:3000"
```

4. **Initialize the database**:
```bash
npx prisma migrate dev
npm run db:seed
```

5. **Run the development server**:
```bash
npm run dev
```

6. **Open [http://localhost:3000](http://localhost:3000)**

### Default Admin Account
- **Email**: `admin@jumian.com`
- **Password**: `admin123`

## 📁 Project Structure

```
jumian/
├── app/                      # Next.js app directory
│   ├── api/                  # API routes
│   │   ├── auth/            # NextAuth endpoints
│   │   ├── products/        # Product CRUD
│   │   ├── categories/      # Category endpoints
│   │   ├── orders/          # Order management
│   │   ├── reviews/         # Review system
│   │   ├── wishlist/        # Wishlist endpoints
│   │   └── register/        # User registration
│   ├── auth/                # Authentication pages
│   │   ├── signin/          # Login page
│   │   └── signup/          # Registration page
│   ├── category/[slug]/     # Category listing pages
│   ├── product/[id]/        # Product detail pages
│   ├── cart/                # Shopping cart
│   ├── orders/              # User orders
│   ├── profile/             # User profile
│   ├── admin/               # Admin dashboard
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Homepage
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── Header.tsx           # Navigation with auth
│   ├── Footer.tsx           # Footer
│   ├── CategoryNav.tsx      # Category bar
│   ├── ProductCard.tsx      # Product card
│   └── Providers.tsx        # Context providers
├── lib/                     # Utilities
│   ├── prisma.ts            # Prisma client
│   ├── auth.ts              # NextAuth config
│   ├── types.ts             # TypeScript types
│   ├── data.ts              # Legacy mock data
│   ├── store/               # Zustand stores
│   │   ├── cart-store.ts    # Cart state
│   │   └── wishlist-store.ts # Wishlist state
│   └── generated/           # Prisma generated client
├── prisma/                  # Database
│   ├── schema.prisma        # Database schema
│   ├── seed.ts              # Seed script
│   ├── migrations/          # Migration history
│   └── dev.db               # SQLite database
├── next.config.ts           # Next.js config
├── tailwind.config.ts       # Tailwind config
└── package.json             # Dependencies
```

## 🎯 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint

# Database commands
npm run db:seed      # Seed database with sample data
npm run db:push      # Push schema changes to database
npm run db:studio    # Open Prisma Studio (database GUI)
```

## 🔐 Authentication & Authorization

### User Roles
- **User**: Browse, purchase, review products
- **Admin**: Full access to dashboard, manage products/orders
- **Vendor**: Manage own products (future feature)

### Protected Routes
- `/profile` - User profile (requires login)
- `/orders` - Order history (requires login)
- `/admin` - Admin dashboard (requires admin role)
- `/api/wishlist` - Wishlist API (requires login)
- `/api/orders` - Order API (requires login)

## 📊 Database Schema

### Main Models
- **User**: Authentication, profile, role
- **Product**: Name, price, images, stock, specifications
- **Category**: Product categorization
- **Order**: Purchase records with items
- **OrderItem**: Individual order line items
- **Review**: Product ratings and comments
- **CartItem**: User shopping carts
- **WishlistItem**: Saved products
- **Session/Account**: NextAuth tables

## 🌐 API Endpoints

### Public Endpoints
- `GET /api/products` - List products (with filters)
- `GET /api/products/[id]` - Get product details
- `GET /api/categories` - List categories
- `POST /api/register` - Create new user account

### Protected Endpoints (require authentication)
- `GET /api/orders` - User's orders
- `POST /api/orders` - Create new order
- `GET /api/wishlist` - User's wishlist
- `POST /api/wishlist` - Add to wishlist
- `DELETE /api/wishlist` - Remove from wishlist
- `POST /api/reviews` - Submit product review

## ✨ Key Features Explained

### Shopping Cart
- Persistent across sessions using Zustand + localStorage
- Real-time updates
- Quantity management
- Free shipping threshold ($50+)

### Product Search & Filters
- Filter by: price range, category, rating, stock status
- Sort by: featured, price, rating, discount
- Grid/List view toggle

### Order System
- Order creation from cart
- Order status tracking (pending → processing → shipped → delivered)
- Payment status (pending → paid → failed → refunded)
- Order history for users

### Review System
- 5-star rating system
- Comment section
- Automatic product rating calculation
- Review count tracking

## 🎨 Customization

### Brand Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  jumia: {
    orange: "#F68B1E",  // Primary color
    dark: "#313133",     // Dark text
    light: "#F5F5F5",    // Background
  },
}
```

### Database
Currently using SQLite. To switch to PostgreSQL:
1. Update `DATABASE_URL` in `.env`
2. Change provider in `prisma/schema.prisma`
3. Run `npx prisma migrate dev`

### Sample Data
Modify `prisma/seed.ts` to add/change products and categories

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

**Note**: For production, switch from SQLite to PostgreSQL or another cloud database.

### Environment Variables (Production)
```env
DATABASE_URL="your-production-database-url"
NEXTAUTH_SECRET="generate-a-strong-secret"
NEXTAUTH_URL="https://your-domain.com"
```

## 🔜 Future Enhancements

- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Email notifications (order confirmations)
- [ ] Advanced admin analytics dashboard
- [ ] Vendor portal for multi-vendor marketplace
- [ ] Product variants (sizes, colors)
- [ ] Inventory management
- [ ] Coupon/discount code system
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Social media login (Google, Facebook)
- [ ] Advanced search with Elasticsearch
- [ ] Product comparison feature
- [ ] Live chat support

## 🐛 Troubleshooting

### Database Issues
```bash
# Reset database
rm prisma/dev.db
npx prisma migrate dev
npm run db:seed
```

### Authentication Issues
- Clear cookies and localStorage
- Check `NEXTAUTH_SECRET` is set
- Verify `NEXTAUTH_URL` matches your domain

### Build Errors
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Design inspired by [Jumia.com](https://www.jumia.com)
- Built with [Next.js](https://nextjs.org)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Icons from [Lucide React](https://lucide.dev)
- Images from [Unsplash](https://unsplash.com)
- ORM by [Prisma](https://www.prisma.io)
- Auth by [NextAuth.js](https://next-auth.js.org)

---

**Made with ❤️ using Next.js 15, TypeScript, Prisma, and Tailwind CSS**
