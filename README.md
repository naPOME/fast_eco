# FASTeco - Modern E-Commerce Platform

A beautiful, feature-rich e-commerce application built with Next.js 15, TypeScript, and modern web technologies.

![FASTeco](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-38bdf8?style=flat-square&logo=tailwindcss)

## Features

### Product Management
- **Product Listing** - Browse products with infinite scroll pagination
- **Product Details** - View comprehensive product information with image gallery
- **Search** - Real-time product search with debouncing
- **Category Filter** - Filter products by category with dynamic category badges
- **Create/Edit/Delete** - Full CRUD operations for products

### Favorites System
- **Add to Favorites** - Save products for later viewing
- **Favorites Page** - Dedicated page to manage favorite products
- **Redux State Management** - Persistent favorites across sessions

### Authentication
- **Protected Routes** - All pages require authentication
- **Login System** - Secure login with hardcoded credentials
- **Session Persistence** - Login state saved in localStorage

### UI/UX
- **Responsive Design** - Mobile-first approach, works on all devices
- **Dark Mode** - Toggle between light and dark themes
- **Modern UI Components** - Built with shadcn/ui
- **Toast Notifications** - User feedback with Sonner
- **Loading States** - Smooth loading indicators

### Home Page
- **Hero Carousel** - Auto-rotating hero section with beautiful images
- **Featured Products** - Display popular products from API
- **Customer Reviews** - Real customer avatars from DummyJSON
- **Newsletter Section** - Call-to-action for subscriptions

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **UI Components:** shadcn/ui
- **State Management:** Redux Toolkit
- **HTTP Client:** Axios
- **Icons:** Lucide React
- **Notifications:** Sonner
- **API:** DummyJSON (https://dummyjson.com)

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/naPOME/fast_eco
cd fast_eco
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the development server**
```bash
npm run dev
```

4. **Open your browser**
```
http://localhost:3000
```

## Login Credentials

To access the application, use these credentials:

- **Username:** `user`
- **Password:** `user123`

## Project Structure

```
fast_eco/
├── app/
│   ├── (auth)/
│   │   └── login/          # Login page
│   ├── favorites/          # Favorites page
│   ├── products/           # Product pages
│   │   ├── [id]/          # Product details
│   │   ├── create/        # Create product
│   │   └── edit/[id]/     # Edit product
│   ├── redux/             # Redux store & slices
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── products/          # Product components
│   ├── ui/                # shadcn/ui components
│   └── Navbar.tsx         # Navigation bar
├── contexts/
│   └── AuthContext.tsx    # Authentication context
├── services/
│   └── api.ts             # API service layer
├── types/
│   └── product.ts         # TypeScript types
└── public/                # Static assets
```

## Key Features Explained

### Authentication Flow
1. User visits any page → Redirected to `/login`
2. Enter credentials (user/user123)
3. On success → Redirected to home page
4. Authentication state stored in localStorage
5. Click logout icon → Clear session and redirect to login

### Product Management
- **List:** Infinite scroll with 10 products per load
- **Search:** Debounced search with instant results
- **Category Filter:** Click category badges to filter products by category
- **Details:** Full product info with image gallery
- **Create:** Form with validation
- **Edit:** Pre-filled form with update functionality
- **Delete:** Confirmation dialog before deletion

### Favorites System
- Click heart icon on any product card
- Favorites stored in Redux (persists on refresh)
- View all favorites on dedicated page
- Remove individual items or clear all

## Customization

### Theme
Toggle between light and dark mode using the sun/moon icon in the navbar.

### Colors
Modify the color scheme in `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      primary: { ... },
      secondary: { ... }
    }
  }
}
```

## Available Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## API Integration

The app uses DummyJSON API for product data:

- **Base URL:** `https://dummyjson.com`
- **Endpoints:**
  - `GET /products` - List products
  - `GET /products/{id}` - Get single product
  - `GET /products/search?q={query}` - Search products
  - `GET /products/categories` - Get all categories
  - `GET /products/category/{category}` - Get products by category
  - `POST /products/add` - Create product
  - `PATCH /products/{id}` - Update product
  - `DELETE /products/{id}` - Delete product
  - `GET /users` - Get users (for customer reviews)

## Environment Variables

No environment variables required. The app uses public APIs.

## Responsive Breakpoints

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Author

Built with by the FASTeco Team

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [DummyJSON](https://dummyjson.com/)
- [Lucide Icons](https://lucide.dev/)
- [TailwindCSS](https://tailwindcss.com/)

---

**Note:** This is a demo application using mock data from DummyJSON. For production use, replace with your own backend API.
