# 🎮 ZingGame — 3D Gaming Platform

A complete web-based 3D gaming platform with:
- **3D Studio Editor** (inspired by Roblox Studio)
- **JavaScript Game Scripting**
- **Game Publishing & Sharing**
- **Admin Panel & Moderation**
- **Persistent Database with RLS Security**

## 📋 Tech Stack

- **Frontend**: Next.js 14 + React 18 + TailwindCSS
- **3D Engine**: Three.js + React Three Fiber
- **Physics**: Cannon-es
- **Database**: Supabase (PostgreSQL) with RLS
- **Auth**: Supabase Auth
- **State**: Zustand
- **Deployment**: Vercel + Supabase

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account

### Setup

```bash
# 1. Clone repository
git clone https://github.com/zingbazp/zing-game-platform.git
cd zing-game-platform

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.local.example .env.local
# Fill in your Supabase credentials

# 4. Setup database (see supabase/README.md)

# 5. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── src/
│   ├── app/                 # Next.js app directory
│   ├── components/          # React components
│   ├── lib/                 # Utilities & helpers
│   ├── types/               # TypeScript types
│   ├── store/               # Zustand store
│   ├── styles/              # Global styles
│   └── middleware.ts        # Auth middleware
├── supabase/
│   ├── migrations/          # Database migrations
│   ├── seed.sql             # Database seeding
│   └── README.md            # Database setup guide
├── public/                  # Static assets
└── docs/                    # Documentation
```

## 🎯 Features

### User Features
- ✅ User Registration & Login
- ✅ Guest Mode
- ✅ User Profiles
- ✅ Game Library & Search
- ✅ 3D Studio Editor
  - Scene Explorer
  - 3D Viewport (Orbit Camera, Transform Tools)
  - Properties Panel
  - Asset Browser
  - Script Editor (JavaScript)
- ✅ Game Play
- ✅ Like, Favorite, Comment
- ✅ Game Publishing
- ✅ My Games Management

### Admin Features
- ✅ Admin Dashboard
- ✅ User Management
- ✅ Game Moderation
- ✅ Comment Management
- ✅ Report System
- ✅ Audit Logs

### Security
- ✅ Row Level Security (RLS) in Supabase
- ✅ Ownership Enforcement (Backend + Database)
- ✅ JavaScript Sandbox
- ✅ Session Management

## 📚 Documentation

- [Database Schema](./supabase/README.md)
- [API Routes](./docs/API.md)
- [3D Studio Guide](./docs/STUDIO.md)
- [JavaScript API](./docs/JS_API.md)
- [Admin Guide](./docs/ADMIN.md)

## 🔐 Security Checklist

- ✅ RLS enabled on all tables
- ✅ Ownership verified server-side
- ✅ Admin role checked in backend
- ✅ No hardcoded credentials
- ✅ JavaScript sandbox for game scripts
- ✅ Input validation on all APIs

## 🧪 Testing

```bash
# Run security tests
npm run test:security

# Run unit tests
npm run test:unit

# Run integration tests
npm run test:integration
```

## 📝 License

MIT License - see LICENSE file for details

## 👥 Author

ZingGame Team
