# Cute Text Studio

A cute text inspiration studio where you can discover beautiful kaomoji, Unicode decorations, emoji art, and aesthetic text layouts. Built with a Japanese Cute + Korean Girly aesthetic.

## Project Introduction

Cute Text Studio is a digital journal space for girls who love cute aesthetics. Browse carefully curated kaomoji, Unicode symbols, and decorative text art in a Pinterest-style waterfall layout. Use the AI Decorator to transform your own words into beautifully decorated text for social media bios, diary entries, and more.

The project maintains a curated material library of 400+ handpicked items, ensuring every piece meets a consistent aesthetic standard.

## Features

### Welcome Page (`/`)
- Animated logo with floating stars and bow decorations
- Polka dot background with soft pink gradient
- Quick-access feature cards: Explore / Create / Collection
- Smooth entrance animations

### Explore Page (`/explore`)
- Pinterest-style waterfall layout
- Search by keywords (Chinese & English): birthday, coffee, travel, cute, soft, korean...
- Category filters: Cute / Dreamy / Animal / Food / Sweet Girl / Japanese / Korean / Soft Life / Minimal / Divider
- Each card includes: content, title, style tag, Copy button, Favorite button
- Surprise Me button for random discovery
- Copy success animation ("Copied ✨")

### Create Page (`/create`) - AI Text Decorator
- Input your own text and let AI decorate it with materials from the library
- 4 decoration modes:
  - **Simple Decorate** - Minimal elegant decoration
  - **Cute Style** - Sweet & lovely kaomoji + pink symbols
  - **Korean Style** - Clean & soft aesthetic
  - **Dreamy Style** - Starry & dreamy atmosphere
- 6 layout patterns: side decoration, top-bottom, framed, symmetric, starburst, minimal
- Results show: decorated text, layout type, material sources
- Each result supports: Copy / Favorite / Regenerate
- AI prioritizes materials by weight: styleScore (40%) + favoriteCount (40%) + popularity (20%)

### Collection Page (`/collection`)
- View your favorited items
- localStorage persistence - favorites survive page refresh
- Empty state with guided onboarding

### Additional Features
- **Bilingual support** (Chinese / English) with instant language toggle
- **Material weight system** - each item has popularity, favoriteCount, and styleScore
- **AI learns from your library** - adding new materials improves AI generation quality
- **Fully responsive** - optimized for mobile first-screen experience

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 16 (App Router) |
| Core | React 19 |
| Language | TypeScript 5 |
| UI Components | shadcn/ui (Radix UI) |
| Styling | Tailwind CSS 4 |
| Fonts | Quicksand + Playfair Display (Google Fonts) |
| Package Manager | pnpm |

## How to Run

### Prerequisites

- Node.js 18+ (recommended Node.js 24)
- pnpm installed globally (`npm install -g pnpm`)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd cute-text-studio

# Install dependencies
pnpm install
```

### Development

```bash
# Start development server
pnpm dev

# Open http://localhost:5000
```

### Production

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with HMR |
| `pnpm build` | Build production bundle |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm ts-check` | Run TypeScript type checking |

## Project Structure

```
src/
├── app/                        # Pages & layouts
│   ├── page.tsx                # Welcome page
│   ├── explore/page.tsx        # Explore page (waterfall layout)
│   ├── create/page.tsx         # AI Decorator page
│   ├── collection/page.tsx     # Collection page
│   ├── layout.tsx              # Root layout (fonts, providers)
│   └── globals.css             # Global styles, animations, theme
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── cute/                   # Custom components
│   │   ├── Navbar.tsx          # Top navigation bar
│   │   ├── Logo.tsx            # Brand logo
│   │   ├── SearchBar.tsx       # Search input
│   │   ├── CategoryBar.tsx     # Category filter buttons
│   │   ├── TextCard.tsx        # Material card (Copy/Favorite)
│   │   ├── FeatureCards.tsx    # Homepage feature cards
│   │   ├── FloatingStars.tsx   # Star animation decoration
│   │   ├── BowDecoration.tsx   # Bow SVG decoration
│   │   ├── PolkaBackground.tsx # Polka dot background
│   │   ├── SurpriseMeButton.tsx# Random discovery button
│   │   └── LanguageToggle.tsx  # CN/EN language switch
│   └── providers/
│       └── LanguageProvider.tsx# i18n context provider
├── data/                       # Material libraries
│   ├── types.ts                # Type definitions (TextItem, weights)
│   ├── index.ts                # Data aggregation & search logic
│   ├── kaomojiLibrary.ts       # Kaomoji (146 items)
│   ├── unicodeLibrary.ts       # Unicode symbols (128 items)
│   ├── decorationLibrary.ts    # Decorative lines/borders (131 items)
│   └── cuteTextLibrary.ts      # Cute text art (25 items)
├── hooks/
│   └── useFavorites.ts         # localStorage favorites hook
└── lib/
    ├── i18n.ts                 # Bilingual translations
    ├── aiGenerator.ts          # AI decoration engine
    └── utils.ts                # Utility functions
```

### Adding New Materials

Simply add entries to the corresponding library file. No page code changes needed.

```typescript
// src/data/kaomojiLibrary.ts
{
  id: 'km-147',
  title: 'Sweet Cat',
  content: '(=^・ω・^=)',
  category: 'animal',
  style: 'Animal',
  tags: ['cat', 'animal', 'cute', '猫', '动物', '可爱'],
  variant: 'pink',
  tagColor: 'pink',
  type: 'kaomoji',
  mood: '可爱',
  popularity: 5,
  favoriteCount: 0,
  styleScore: 8,
}
```

Save the file and HMR will automatically refresh the page.

## Screenshots

> Screenshots will be added here.

<!-- ![Welcome Page](./screenshots/welcome.png) -->
<!-- ![Explore Page](./screenshots/explore.png) -->
<!-- ![Create Page](./screenshots/create.png) -->
<!-- ![Collection Page](./screenshots/collection.png) -->

## Roadmap

- [ ] Integrate real AI API for text decoration
- [ ] User authentication & cloud sync for favorites
- [ ] Community sharing - publish your own creations
- [ ] Material detail page with related recommendations
- [ ] Multi-tag filtering system with popular tags
- [ ] Export favorites as image or text file
- [ ] Admin dashboard for material management
- [ ] PWA support for offline browsing


## 🌐 在线体验

[点击打开 Cute Text Studio](https://cae297c9-c017-44da-95e2-5b6311d0ad20.dev.coze.site/)


## License

MIT

---

Made with love and pink aesthetics.
