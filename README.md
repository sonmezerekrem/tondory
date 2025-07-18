# Tondory 🚢

A beautiful, modern article bookmarking and reading tracker built with Next.js 15, Supabase, and shadcn/ui.

![Tondory Logo](https://img.shields.io/badge/Tondory-Article%20Tracker-blue?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K)

> **Empowering readers to organize, discover, and revisit their favorite articles with ease.**

## 🌟 Features

### 📖 **Smart Article Management**

- **Automatic Metadata Extraction**: Paste any article URL and we'll fetch the title, description, and preview image
- **Beautiful Previews**: Rich article cards with automatic image optimization
- **Bookmark System**: Save your favorite articles for quick access
- **Smart Organization**: Organize by date, source, or custom categories

### 🎨 **Modern Design**

- **Dark/Light Mode**: Beautiful theme switching with system preference detection
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **SwiftPay Design System**: Custom color palette and consistent UI components
- **Smooth Animations**: Polished interactions and transitions

### 📊 **Analytics & Insights**

- **Reading Statistics**: Track your reading habits and progress
- **Dashboard Overview**: Visual insights into your article collection
- **Search & Filtering**: Powerful search with pagination support
- **Export Capabilities**: Export your data in various formats

### 🔐 **Security & Privacy**

- **Supabase Authentication**: Secure user management with email/password
- **Row Level Security**: Your data is private and secure
- **Profile Management**: Customizable display names and preferences
- **Cookie-based Sessions**: Persistent login across browser sessions

## 🛠️ Tech Stack

### **Frontend**

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful and accessible components
- **[Hugeicons](https://hugeicons.com/)** - Comprehensive icon library

### **Backend**

- **[Supabase](https://supabase.com/)** - PostgreSQL database and authentication
- **[Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)** - Serverless API endpoints
- **Row Level Security (RLS)** - Database-level security policies

### **Developer Experience**

- **[ESLint](https://eslint.org/)** - Code linting and formatting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[TypeScript](https://www.typescriptlang.org/)** - Static type checking
- **[Git Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)** - Pre-commit validation

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn** or **pnpm**
- **Supabase** account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/tondory.git
   cd tondory
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```

   Update `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Set up Supabase database**

   Run the following SQL in your Supabase dashboard:

   ```sql
   -- Create users table extension
   CREATE TABLE IF NOT EXISTS profiles (
     id UUID REFERENCES auth.users ON DELETE CASCADE,
     display_name TEXT,
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     PRIMARY KEY (id)
   );

   -- Create blog_posts table
   CREATE TABLE IF NOT EXISTS blog_posts (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     title TEXT NOT NULL,
     url TEXT NOT NULL,
     description TEXT,
     image_url TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Create bookmarks table
   CREATE TABLE IF NOT EXISTS bookmarks (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     blog_post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     UNIQUE(user_id, blog_post_id)
   );

   -- Create release_notes table
   CREATE TABLE IF NOT EXISTS release_notes (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     version VARCHAR(20) NOT NULL,
     release_date DATE NOT NULL,
     is_latest BOOLEAN DEFAULT false,
     is_initial_release BOOLEAN DEFAULT false,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Create release_note_items table
   CREATE TABLE IF NOT EXISTS release_note_items (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     release_note_id UUID NOT NULL REFERENCES release_notes(id) ON DELETE CASCADE,
     type VARCHAR(20) NOT NULL CHECK (type IN ('feature', 'improvement', 'bug_fix')),
     title TEXT NOT NULL,
     description TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Enable RLS
   ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
   ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
   ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
   ALTER TABLE release_notes ENABLE ROW LEVEL SECURITY;
   ALTER TABLE release_note_items ENABLE ROW LEVEL SECURITY;

   -- Create RLS policies
   CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
   CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
   CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

   CREATE POLICY "Users can view own blog posts" ON blog_posts FOR SELECT USING (auth.uid() = user_id);
   CREATE POLICY "Users can insert own blog posts" ON blog_posts FOR INSERT WITH CHECK (auth.uid() = user_id);
   CREATE POLICY "Users can update own blog posts" ON blog_posts FOR UPDATE USING (auth.uid() = user_id);
   CREATE POLICY "Users can delete own blog posts" ON blog_posts FOR DELETE USING (auth.uid() = user_id);

   CREATE POLICY "Users can view own bookmarks" ON bookmarks FOR SELECT USING (auth.uid() = user_id);
   CREATE POLICY "Users can insert own bookmarks" ON bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);
   CREATE POLICY "Users can delete own bookmarks" ON bookmarks FOR DELETE USING (auth.uid() = user_id);

   CREATE POLICY "Allow public read access to release_notes" ON release_notes FOR SELECT USING (true);
   CREATE POLICY "Allow public read access to release_note_items" ON release_note_items FOR SELECT USING (true);
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
tondory/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   ├── auth/              # Authentication pages
│   │   ├── app/               # Dashboard pages
│   │   ├── about/             # About page
│   │   ├── release-notes/     # Release notes page
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable components
│   │   ├── ui/               # shadcn/ui components
│   │   └── ...               # Custom components
│   ├── lib/                   # Utility functions
│   │   ├── supabase/         # Supabase client setup
│   │   └── utils.ts          # Helper functions
│   └── types/                # TypeScript type definitions
├── public/                   # Static assets
├── .env.local.example       # Environment variables template
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── README.md             # This file
```

## 🔗 API Endpoints

### Authentication

- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `POST /api/auth/signout` - User logout

### Blog Posts

- `GET /api/blog-posts` - List user's blog posts with pagination
- `POST /api/blog-posts` - Create new blog post
- `PUT /api/blog-posts/[id]` - Update blog post
- `DELETE /api/blog-posts/[id]` - Delete blog post

### Bookmarks

- `GET /api/bookmarks` - List user's bookmarked articles
- `POST /api/bookmarks` - Add bookmark
- `DELETE /api/bookmarks/[id]` - Remove bookmark

### Release Notes

- `GET /api/release-notes` - Get all release notes (public)

### Statistics

- `GET /api/blog-posts/stats` - Get user's reading statistics

## 🎨 Design System

Tondory uses a custom design system based on SwiftPay's color palette:

### Colors

- **Primary**: `#3B82F6` (Blue)
- **Secondary**: `#F1F5F9` (Light Gray)
- **Accent**: `#06B6D4` (Cyan)
- **Success**: `#10B981` (Green)
- **Warning**: `#F59E0B` (Amber)
- **Error**: `#EF4444` (Red)

### Typography

- **Font**: Inter (system font fallback)
- **Headings**: 600-700 font weight
- **Body**: 400-500 font weight

## 📱 Features by Page

### 🏠 **Landing Page**

- Hero section with call-to-action
- Feature showcase
- Statistics overview
- Dark mode support

### 📊 **Dashboard**

- Reading statistics cards
- Recent articles overview
- Quick actions
- Profile information

### 📚 **Articles Page**

- Grid/list view toggle
- Search and filtering
- Pagination support
- Bookmark functionality

### 🔖 **Bookmarks Page**

- Saved articles collection
- Quick access to favorites
- Remove bookmark functionality

### ⚙️ **Settings Page**

- Profile management
- Display name editing
- Theme preferences
- Account settings

### 📖 **About Page**

- Company mission and values
- Feature highlights
- Story behind Tondory

### 📋 **Release Notes**

- Dynamic content from database
- Version history
- Feature announcements
- Bug fix tracking

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues

# Database
npm run db:push      # Push schema changes to Supabase
npm run db:pull      # Pull schema changes from Supabase
npm run db:reset     # Reset database
```

### Code Style

- **ESLint**: Configured with Next.js and TypeScript rules
- **Prettier**: Automatic code formatting
- **TypeScript**: Strict type checking enabled
- **Tailwind CSS**: Utility-first styling approach

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Deploy to Vercel**
    - Connect your GitHub repository
    - Configure environment variables
    - Deploy automatically

3. **Environment Variables**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   ```

### Other Platforms

Tondory can be deployed to any platform that supports Next.js:

- **Netlify**
- **Railway**
- **Heroku**
- **AWS Amplify**
- **DigitalOcean App Platform**

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Add TypeScript types for new features
- Update documentation for significant changes
- Test your changes thoroughly
- Write meaningful commit messages

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for performance
- **Image Optimization**: Automatic with Next.js Image component
- **Code Splitting**: Automatic with Next.js App Router
- **Server-Side Rendering**: For better SEO and performance

## 🛡️ Security

- **Authentication**: Supabase Auth with email/password
- **Authorization**: Row Level Security (RLS) policies
- **Data Validation**: TypeScript and runtime validation
- **HTTPS**: Enforced in production
- **Privacy**: No third-party tracking or analytics

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Ekrem Sonmezer** - *Initial work* - [@sonmezerekrem](https://github.com/sonmezerekrem)

## 🙏 Acknowledgments

- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful component library
- **[Supabase](https://supabase.com/)** - Backend as a Service
- **[Vercel](https://vercel.com/)** - Deployment platform
- **[Hugeicons](https://hugeicons.com/)** - Icon library
- **[Next.js](https://nextjs.org/)** - React framework

## 📞 Support

If you have any questions or need help, please:

1. Open an [issue](https://github.com/sonmezerekrem/tondory/issues)
2. Join our [discussions](https://github.com/sonmezerekrem/tondory/discussions)

---

**Built with ❤️ by the Tondory team**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=flat-square&logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-blue?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![MIT License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](https://opensource.org/licenses/MIT)