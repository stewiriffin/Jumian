# User Authentication & Registration Guide - Jumian E-Commerce

This guide explains how users can create accounts and sign in to purchase products on the Jumian platform.

---

## 🔐 **Authentication System Overview**

The Jumian platform uses **NextAuth.js** for secure authentication with the following features:

✅ Email/Password authentication
✅ Secure password hashing with bcrypt
✅ JWT session management
✅ Protected routes for checkout and orders
✅ Automatic redirect after login
✅ Role-based access (user, admin, vendor)

---

## 👤 **Creating a New User Account**

### **Step 1: Access the Sign Up Page**

**Option A: From Homepage**
1. Visit `http://localhost:3002`
2. Click **"Sign In"** button in the header (top right)
3. On the sign-in page, click **"Don't have an account? Sign up"**

**Option B: Direct URL**
- Navigate directly to: `http://localhost:3002/auth/signup`

### **Step 2: Fill Registration Form**

**File:** [app/auth/signup/page.tsx](app/auth/signup/page.tsx)

The registration form requires:

| Field | Type | Requirements |
|-------|------|--------------|
| **Full Name** | Text | Required |
| **Email** | Email | Valid email format, must be unique |
| **Password** | Password | Minimum 6 characters |
| **Confirm Password** | Password | Must match password |

**Example Registration:**
```
Full Name: John Doe
Email: john.doe@example.com
Password: mypassword123
Confirm Password: mypassword123
```

### **Step 3: Submit Registration**

1. Click **"Sign Up"** button
2. System validates:
   - All fields are filled
   - Email format is valid
   - Password meets minimum length (6 characters)
   - Passwords match
   - Email is not already registered

3. **Backend Processing:**
   **File:** [app/api/register/route.ts](app/api/register/route.ts)

   ```typescript
   // Password is hashed with bcrypt
   const hashedPassword = await bcrypt.hash(password, 10);

   // User created in database
   const user = await prisma.user.create({
     data: {
       name,
       email,
       password: hashedPassword,
       role: 'user', // Default role
     },
   });
   ```

4. **Success:**
   - Toast notification: "Account created successfully!"
   - Automatic redirect to sign-in page
   - Ready to sign in immediately

### **Common Registration Errors:**

| Error Message | Cause | Solution |
|--------------|-------|----------|
| "Passwords do not match" | Confirm password doesn't match | Re-enter matching passwords |
| "Password must be at least 6 characters" | Password too short | Use longer password |
| "Email already exists" | Email already registered | Use different email or sign in |
| "Invalid email format" | Email format incorrect | Enter valid email address |

---

## 🔑 **Signing In to Your Account**

### **Step 1: Access Sign In Page**

**Option A: From Homepage**
1. Click **"Sign In"** button in header
2. Route: `/auth/signin`

**Option B: Automatic Redirect**
- When trying to access protected pages (checkout, orders, profile)
- System automatically redirects to sign-in
- After login, returns to original page

**Option C: Direct URL**
- Navigate to: `http://localhost:3002/auth/signin`

### **Step 2: Enter Credentials**

**File:** [app/auth/signin/page.tsx](app/auth/signin/page.tsx)

| Field | Type | Example |
|-------|------|---------|
| **Email** | Email | john.doe@example.com |
| **Password** | Password | mypassword123 |

### **Step 3: Sign In**

1. Click **"Sign In"** button
2. **Authentication Process:**

   ```typescript
   const result = await signIn('credentials', {
     email: formData.email,
     password: formData.password,
     redirect: false,
   });

   if (result?.error) {
     toast.error('Invalid email or password');
   } else {
     toast.success('Signed in successfully!');
     router.push(callbackUrl); // Redirect to intended page
   }
   ```

3. **Backend Validation:**
   **File:** [lib/auth.ts](lib/auth.ts)

   ```typescript
   // Find user by email
   const user = await prisma.user.findUnique({
     where: { email: credentials.email }
   });

   // Verify password with bcrypt
   const isPasswordValid = await bcrypt.compare(
     credentials.password,
     user.password
   );

   // Create JWT session
   if (isPasswordValid) {
     return {
       id: user.id,
       email: user.email,
       name: user.name,
       role: user.role,
     };
   }
   ```

4. **Success:**
   - Toast notification: "Signed in successfully!"
   - Session created (stored in JWT token)
   - Header updates to show user name
   - Redirect to intended page (or homepage)

### **Sign In Errors:**

| Error Message | Cause | Solution |
|--------------|-------|----------|
| "Invalid email or password" | Wrong credentials | Check email/password |
| "An error occurred" | Server error | Try again, check internet |

---

## 🧪 **Test Accounts Available**

### **Admin Account (Pre-created)**

Use this account to test the platform immediately:

```
Email: admin@jumian.com
Password: admin123
Role: admin
```

**Admin account has access to:**
- All user features
- Admin dashboard (when implemented)
- Product management capabilities

**Created by:** [prisma/seed.ts](prisma/seed.ts)

---

## 🛒 **Protected Features (Require Login)**

These pages require authentication:

### **1. Checkout Page**
- **Route:** `/checkout`
- **Purpose:** Complete purchase with delivery and payment info
- **Redirect:** If not logged in → `/auth/signin?callbackUrl=/checkout`

### **2. Orders Page**
- **Route:** `/orders`
- **Purpose:** View order history and track deliveries
- **Redirect:** If not logged in → `/auth/signin?callbackUrl=/orders`

### **3. Profile Page**
- **Route:** `/profile`
- **Purpose:** View and edit user information
- **Redirect:** If not logged in → `/auth/signin?callbackUrl=/profile`

### **4. Wishlist Page**
- **Route:** `/wishlist`
- **Purpose:** View saved products
- **Redirect:** If not logged in → `/auth/signin?callbackUrl=/wishlist`

---

## 🔄 **Complete Purchase Flow for New Users**

### **Scenario: First-time user wants to buy a product**

1. **Browse Products** (No login required)
   - Visit homepage
   - Click on any product
   - Add to cart

2. **Review Cart** (No login required)
   - Click cart icon in header
   - Review items and quantities
   - See total price

3. **Proceed to Checkout** (Login required)
   - Click "Proceed to Checkout"
   - **Redirected to:** `/auth/signin?callbackUrl=/checkout`

4. **Sign Up (New User)**
   - Click "Don't have an account? Sign up"
   - Fill registration form:
     ```
     Name: Jane Smith
     Email: jane.smith@example.com
     Password: securepass123
     Confirm Password: securepass123
     ```
   - Click "Sign Up"
   - Success message appears

5. **Sign In**
   - Enter newly created credentials
   - Click "Sign In"
   - **Automatically redirected back to checkout**

6. **Complete Purchase**
   - Fill delivery information
   - Select payment method (M-Pesa/Card/Cash)
   - Place order
   - View order in `/orders` page

---

## 🎯 **User Session Management**

### **Session Details:**

**Technology:** NextAuth.js with JWT tokens

**Session Data Stored:**
```typescript
{
  user: {
    id: string,
    email: string,
    name: string,
    role: string,
    image?: string
  },
  expires: string // Expiration timestamp
}
```

**Session Duration:**
- Default: 30 days
- Configurable in [lib/auth.ts](lib/auth.ts)

### **Checking Authentication Status:**

**In Server Components:**
```typescript
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const session = await getServerSession(authOptions);

if (!session) {
  redirect('/auth/signin');
}
```

**In Client Components:**
```typescript
import { useSession } from 'next-auth/react';

const { data: session, status } = useSession();

if (status === 'loading') {
  return <Loading />;
}

if (status === 'unauthenticated') {
  router.push('/auth/signin');
}
```

### **Sign Out:**

**From Header:**
1. Click on your name in the header (top right)
2. Click "Sign Out" from dropdown
3. Session cleared
4. Redirected to homepage

**Programmatic:**
```typescript
import { signOut } from 'next-auth/react';

await signOut({ callbackUrl: '/' });
```

---

## 💾 **User Data Stored**

### **Database Model:**
**File:** [prisma/schema.prisma](prisma/schema.prisma)

```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  password      String?
  role          String    @default("user")
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  accounts      Account[]
  sessions      Session[]
  orders        Order[]
  reviews       Review[]
  wishlist      WishlistItem[]
  cart          CartItem[]
}
```

### **What's Stored:**
- ✅ Full name
- ✅ Email address (unique)
- ✅ Hashed password (bcrypt)
- ✅ User role (user/admin/vendor)
- ✅ Account creation date
- ✅ Profile picture (optional)
- ✅ All orders
- ✅ All reviews
- ✅ Wishlist items
- ✅ Server-side cart items

**Security:**
- ❌ Plain-text passwords are NEVER stored
- ✅ Passwords hashed with bcrypt (10 rounds)
- ✅ Email addresses are unique (no duplicates)
- ✅ Session tokens are JWT encrypted

---

## 🔒 **Password Security**

### **Password Requirements:**
- **Minimum length:** 6 characters
- **Recommended:** 8+ characters with mix of letters, numbers, symbols
- **Stored:** Hashed with bcrypt (cannot be reversed)

### **Password Hashing Example:**
```typescript
// Registration (lib/api/register/route.ts)
const hashedPassword = await bcrypt.hash(password, 10);

// Login verification (lib/auth.ts)
const isValid = await bcrypt.compare(plainPassword, hashedPassword);
```

### **Forgot Password** (Future Enhancement):
- Email-based password reset
- Temporary reset token
- Secure link expiration

---

## 📋 **Testing Authentication**

### **Test Scenario 1: New User Registration**

```bash
# 1. Navigate to signup
http://localhost:3002/auth/signup

# 2. Fill form
Name: Test User
Email: test@example.com
Password: testpass123
Confirm: testpass123

# 3. Submit
# Expected: Success message + redirect to signin

# 4. Sign in
Email: test@example.com
Password: testpass123

# Expected: Success + redirect to homepage
```

### **Test Scenario 2: Checkout Flow**

```bash
# 1. Add product to cart (no login)
# 2. Go to cart
# 3. Click "Proceed to Checkout"
# Expected: Redirected to signin with callbackUrl=/checkout

# 4. Sign in
# Expected: Redirected back to checkout page
```

### **Test Scenario 3: Admin Access**

```bash
# Sign in with admin account
Email: admin@jumian.com
Password: admin123

# Access profile page
# Expected: See admin-specific features (if implemented)
```

---

## 🛠️ **Troubleshooting**

### **Cannot Sign In**

**Problem:** "Invalid email or password" error

**Solutions:**
1. Check email spelling (case-sensitive)
2. Verify password is correct
3. Try registering new account if you forgot password
4. Check database connection (run `npm run dev`)

### **Registration Fails**

**Problem:** "Email already exists"

**Solutions:**
1. Use different email address
2. Sign in with existing account
3. Check if you already registered

### **Stuck at Loading**

**Problem:** Sign-in button shows loading forever

**Solutions:**
1. Check browser console for errors
2. Verify database is running (`prisma/dev.db` exists)
3. Restart dev server: `npm run dev`
4. Clear browser cache/cookies

### **Session Not Persisting**

**Problem:** Logged out on page refresh

**Solutions:**
1. Check browser allows cookies
2. Verify `.env` has `NEXTAUTH_SECRET` set
3. Check `NEXTAUTH_URL` matches your domain

---

## 📊 **User Roles**

### **Role Types:**

1. **user** (Default)
   - Browse products
   - Add to cart/wishlist
   - Place orders
   - View order history
   - Write reviews

2. **admin**
   - All user features +
   - Access admin dashboard
   - Manage products
   - View all orders
   - User management (future)

3. **vendor** (Future)
   - All user features +
   - Manage own products
   - View own sales
   - Respond to reviews

### **Assigning Roles:**

**During Registration:** Default is "user"

**Change Role (Database):**
```typescript
await prisma.user.update({
  where: { email: 'user@example.com' },
  data: { role: 'admin' }
});
```

---

## 🚀 **Quick Start Guide for Users**

### **I'm a new user and want to buy a product:**

1. **Browse:** Go to `http://localhost:3002`
2. **Select:** Click on any product
3. **Add to Cart:** Click "Add to Cart" button
4. **Review Cart:** Click cart icon (top right)
5. **Checkout:** Click "Proceed to Checkout"
6. **Sign Up:** Click "Sign up" link
7. **Register:** Fill form with your details
8. **Sign In:** Use your new credentials
9. **Complete Purchase:** Fill delivery info and pay
10. **Track Order:** Go to "Orders" in header

### **I already have an account:**

1. **Browse:** Find products you want
2. **Add to Cart:** Add items
3. **Sign In:** Click "Sign In" in header
4. **Enter Credentials:** Email + Password
5. **Checkout:** Go to cart → checkout
6. **Complete:** Fill info and place order

---

## 🎉 **Summary**

The Jumian platform has a complete authentication system:

✅ **User Registration** - Email/password signup
✅ **Secure Login** - Bcrypt password hashing
✅ **Protected Routes** - Checkout requires auth
✅ **Session Management** - JWT tokens
✅ **Role-Based Access** - User/Admin/Vendor
✅ **Callback URLs** - Return to intended page
✅ **Toast Notifications** - User feedback
✅ **Pre-seeded Admin** - Ready to test

**Ready for users to start purchasing!** 🛍️🔐
