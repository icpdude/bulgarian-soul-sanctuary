# Bulgarian Spiritual Treasury

🚀 **Status**: Production Ready | **Version**: 1.0.0

A decentralized autonomous organization (DAO) platform for preserving and promoting Bulgarian spiritual and cultural heritage through blockchain-powered governance, transparent treasury management, and community participation.

## 🌟 Features

### Core Platform
- **DAO Governance**: Democratic voting system for community proposals
- **Treasury Management**: Transparent fund allocation and tracking
- **Member Profiles**: Personal dashboards with voting history
- **Admin Panel**: Comprehensive management tools
- **Documentation Hub**: Complete guides for participation

### Technical Excellence
- ⚡ **Performance**: Optimized for 90+ Lighthouse score
- 🔍 **SEO**: Page-specific meta tags, structured data, sitemap
- 📊 **Analytics**: Comprehensive event and user tracking
- ♿ **Accessibility**: WCAG 2.1 AA compliant
- 🎨 **Design System**: Premium UI with glass morphism and smooth animations
- 🔒 **Security**: Error boundaries, secure practices
- 📱 **Responsive**: Mobile-first design

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── admin/          # Admin dashboard components
│   ├── atomic/         # Small reusable components
│   ├── modals/         # Modal components
│   └── ui/             # Shadcn UI components
├── pages/              # Page components
│   ├── Index.tsx       # Home page
│   ├── DAODashboard.tsx
│   ├── AdminDashboard.tsx
│   ├── Profile.tsx
│   ├── Documentation.tsx
│   └── NotFound.tsx
├── lib/                # Utilities
│   ├── analytics.ts    # Analytics tracking
│   ├── monitoring.ts   # Performance monitoring
│   ├── performance.ts  # Performance utilities
│   └── accessibility.ts
├── contexts/           # React contexts
├── config/            # Configuration files
└── hooks/             # Custom React hooks

public/
├── sitemap.xml
├── robots.txt
├── manifest.json
└── .well-known/
    └── security.txt
```

## 🎯 Key Pages

- **`/`** - Landing page with mission, features, and CTAs
- **`/dao`** - DAO dashboard with proposals and voting
- **`/admin`** - Administrative controls (restricted)
- **`/profile`** - User profile and voting history
- **`/docs`** - Complete governance documentation

## 🔧 Configuration

### Environment Variables
Copy `.env.example` to `.env.local` and configure:

```env
VITE_APP_URL=https://foundation-bst.org
VITE_ANALYTICS_ID=your-analytics-id
VITE_ENABLE_ANALYTICS=true
```

### Analytics Integration
Uncomment and configure in `src/lib/analytics.ts`:
- Google Analytics
- Plausible
- Custom tracking solution

## 📊 Analytics Events

The platform tracks:
- Page views (automatic)
- DAO votes
- Wallet connections
- Donations
- Form submissions
- User interactions
- Errors

## 🎨 Design System

Built with:
- **Colors**: HSL-based semantic tokens
- **Gradients**: Dawn, Dusk, Mystical, Aurora, Heritage
- **Typography**: Manrope (sans) + Playfair Display (serif)
- **Components**: Shadcn UI with custom variants
- **Animations**: Framer Motion

## 📱 Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)  
- Safari (latest 2 versions)
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

## 🔍 SEO Features

- Dynamic meta tags per page
- Open Graph tags
- Twitter Cards
- Structured Data (JSON-LD)
- XML Sitemap
- Robots.txt
- Canonical URLs

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Skip to content link
- Keyboard navigation
- Screen reader support
- ARIA labels
- Focus management

## 📈 Performance

- Core Web Vitals optimized
- Image lazy loading
- Code splitting ready
- Font optimization
- React Query caching

## 🚀 Deployment

### Via Lovable
1. Click **Publish** in Lovable interface
2. Configure custom domain in Project → Settings → Domains
3. Follow DNS instructions

### Manual
```bash
npm run build
# Upload dist/ to hosting
# Configure SPA routing
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 📚 Documentation

- [Deployment Guide](./DEPLOYMENT.md) - Complete deployment instructions
- [Production Ready Checklist](./PRODUCTION_READY.md) - Pre-launch verification
- [Design System](./src/index.css) - Color tokens and styles

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Build**: Vite
- **Styling**: Tailwind CSS
- **UI**: Shadcn UI
- **Animation**: Framer Motion
- **Routing**: React Router v6
- **State**: React Query
- **Forms**: React Hook Form + Zod

## 🎯 Project Info

**URL**: https://lovable.dev/projects/edf21e29-b475-49ce-a2ec-36bc3c309898

## 🤝 How to Edit

**Use Lovable**: Visit the [Lovable Project](https://lovable.dev/projects/edf21e29-b475-49ce-a2ec-36bc3c309898) and start prompting.

**Use Your IDE**: Clone and push changes - they sync with Lovable automatically.

**GitHub Codespaces**: Launch a cloud development environment directly from GitHub.

## 📄 License

Copyright © 2025 Bulgarian Spiritual Treasury Foundation

## 📧 Contact

- Website: https://foundation-bst.org
- Email: support@foundation-bst.org
- Discord: [Bulgarian Spiritual Treasury](https://discord.gg/bulgarian-spiritual-treasury)

---

**Built with ❤️ for Bulgarian cultural heritage preservation**
