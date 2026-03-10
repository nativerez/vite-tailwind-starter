# Vite + React + Tailwind CSS Starter

A minimal starter template for building React applications with Vite and Tailwind CSS.

## Features

- ⚡️ **Vite** - Fast build tool and dev server
- ⚛️ **React 19** - Latest React with hooks
- 🎨 **Tailwind CSS 4** - Utility-first CSS framework
- 📦 **PostCSS** - CSS processing with autoprefixer
- 🔍 **ESLint** - Code linting and quality checks

## Getting Started

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm preview
```

## Project Structure

```
vite-tailwind-starter/
├── src/
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # React entry point
│   ├── index.css        # Global styles & Tailwind imports
│   └── assets/          # Static assets
├── public/              # Public static files
├── index.html           # HTML entry point
├── vite.config.js       # Vite configuration
├── postcss.config.js    # PostCSS configuration
├── eslint.config.js     # ESLint configuration
└── package.json         # Dependencies and scripts
```

## Customization

Edit `src/App.jsx` to start building your application. Tailwind CSS utility classes are available throughout your components.

## Learn More

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)

├── worker/                       # Reserved for future Cloudflare Worker deployment
├── import-ratings.js             # Main CLI script to fetch reviews/ratings from stores
├── ios-ratings-baseline.json     # Manual iOS rating baseline (snapshot from App Store Connect)
├── vite.config.js                # Vite bundler configuration
├── eslint.config.js              # ESLint configuration
├── package.json                  # Node.js dependencies & scripts
└── .env                          # Environment variables (not in git)
```

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**
   
   Copy `.env.example` to `.env` and fill in your credentials:
   
   ```bash
   cp .env.example .env
   ```
   
   Required credentials:
   - **Google Service Account**: For Android reviews (project ID, private key, client email)
   - **iOS App Store Connect API**: Key ID, Issuer ID, and private key file (.p8 in generate-ios-jwt/)
   - **App IDs**: Android package names and iOS app IDs for each app (BrightHR, Blip, PoP, BrightSafe on The Go, Advice)

3. **Set up iOS baseline data**
   
   Create `ios-ratings-baseline.json` in the root directory with initial rating snapshots from App Store Connect. This baseline represents your manual snapshot of ratings data (total ratings and 1-5 star breakdown) which is then incremented with API reviews from the last 7 days.

## Usage

### Import Reviews from App Stores

Fetch and import the latest reviews from both iOS and Android stores:

```bash
npm run import
```

This command:
- Fetches the last 7 days of reviews from Google Play and App Store Connect
- Scrapes current Android ratings breakdown from Google Play Store pages using Puppeteer
- Scrapes current iOS overall rating from App Store pages using Puppeteer
- Loads iOS baseline data and increments with 7-day API reviews
- **Fetches version information from iTunes API (iOS) and Google Play Publisher API (Android)**
- **Tracks new app versions and release notes automatically**
- Appends new reviews to `public/reviews.csv` (cumulative, with duplicate filtering)
- Saves weekly snapshots to `public/ratings-history.json`
- Updates `public/version-releases.json` with detected version changes

**Data Sources:**
- **Android Reviews**: Play Developer API
- **Android Ratings**: Puppeteer scraping of Play Store pages
- **Android Versions**: Google Play Publisher API (production track)
- **iOS Reviews**: App Store Connect API (last 7 days)
- **iOS Ratings**: Puppeteer scraping of App Store pages (overall rating) + baseline data + 7-day API reviews (star breakdown)
- **iOS Versions**: iTunes Search API (current version, release date, release notes)

### Run Development Server

```bash
npm run dev
```

Opens the dashboard at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## How It Works

### Data Flow

1. **iOS Ratings Strategy**:
   - Overall rating scraped from live App Store page via Puppeteer
   - Manual baseline data stored in `ios-ratings-baseline.json` (snapshot from App Store Connect)
   - Last 7 days of reviews fetched from App Store Connect API with JWT authentication
   - Star breakdown = baseline + incremental reviews from API
   
2. **Android Ratings Strategy**:
   - Full scraping of Google Play Store pages using Puppeteer (headless Chrome)
   - Reviews fetched from Google Play Developer API using service account credentials
   
3. **Data Storage**:
   - `public/reviews.csv`: Cumulative list of all reviews (all-time)
   - `public/ratings-history.json`: Weekly snapshots with aggregate stats
   - `public/version-releases.json`: Version release history (auto-populated from APIs)
   - All files append new data each run, filtered for duplicates
   
4. **Version Tracking**:
   - **iOS**: iTunes Search API provides current version, release date, and release notes
   - **Android**: Google Play Publisher API provides production track version name and notes
   - Each import run checks for new versions and adds them to the history
   - Builds up historical record over time as versions are released
   - Timeline chart displays rating trends with version release markers
   
5. **Dashboard Display**:
   - **Stats Tab**: Week-over-week comparison of metrics with filter sidebar
     - KPI cards show current vs previous week deltas
     - Ratings breakdown displays changes for each star level (1-5)
     - Timeline chart (Recharts) shows all-time rating trends with version release overlays
     - Navigate through weeks with previous/next/today buttons in sidebar
     - Filter by app and platform with persistent localStorage preferences
   - **Reviews Tab**: All reviews displayed chronologically (most recent first)
     - Responsive grid layout (1 column mobile, 2 tablet, 3 desktop)
     - Real-time search and filter by rating, text, app, and platform via collapsible sidebar
     - Platform and app logos for visual identification
   - **Filter Sidebar**: Collapsible filter sections for organized control
     - App selector with icons
     - Platform toggle with iOS/Android logos
     - Week range navigation (Stats tab only)
     - Search input (Reviews tab only)
     - Rating filter (Reviews tab only)
   - React frontend reads CSV and JSON data client-side

### Weekly Workflow

Run `npm run import` once per week to:
- Append the last 7 days of new reviews to the CSV
- Update ratings history with current week's snapshot
- Detect and track new app version releases
- Build historical version and rating data for timeline analysis
- Keep all historical data for week-over-week analysis

## Technologies

- **Frontend**: React 19, Vite 7
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS 4
- **Charts**: Recharts 3 (LineChart for ratings timeline visualization)
- **Icons**: Lucide React for UI icons, platform/app logos as SVG/PNG assets
- **Scraping**: Puppeteer 24 (headless Chrome automation)
- **APIs**: 
  - Google Play Developer API (via googleapis)
  - Apple App Store Connect API (JWT auth)
  - iTunes Search API (version info)
- **Data**: CSV parsing with papaparse, client-side data processing
- **Auth**: JWT generation for App Store Connect using jsonwebtoken
- **State Management**: React hooks with localStorage persistence for user preferences

## Supported Apps

- **BrightHR**: Workforce management platform
- **Blip**: Shift management app
- **PoP (Proof of Purchase)**: Expense management app
- **BrightSafe on The Go**: Health & safety app
- **Advice**: HR guidance and support

## API Documentation

- [Google Play Developer API](https://developers.google.com/android-publisher)
- [App Store Connect API](https://developer.apple.com/documentation/appstoreconnectapi)
- [iTunes Search API](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/)

## License

Private - BrightHR Internal
