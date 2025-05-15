# Personal Portfolio Website ٩(◕‿◕｡)۶

A modern, interactive portfolio website built with Next.js, TypeScript, and Tailwind CSS. This portfolio showcases my skills, projects, and provides integration with various platforms including Discord, Spotify, and anime tracking.

> **Note**: This portfolio requires the [portfolio-api](https://github.com/idMJA/portfolio-api) backend to be set up for features like Discord status, Spotify integration, anime tracking, and other dynamic content to work properly.

## ✨ Features

- **Responsive Design** - Beautifully crafted UI that works on all devices
- **Discord Integration** - Real-time Discord status display
- **Anime Stats** - Track and display anime watching statistics
- **Spotify Integration** - Show your music preferences and current tracks
- **Steam Stats** - Showcase your gaming activity
- **Project Showcase** - Highlight your best work and achievements
- **Modern UI** - Aesthetically pleasing design with animations

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Framer Motion for animations
- **UI Components**: Radix UI
- **Analytics**: Vercel Analytics, Speed Insights
- **Dev Tools**: Biome, ESLint
- **Backend API**: [portfolio-api](https://github.com/idMJA/portfolio-api) (Required for integrations)

## 🛠️ Getting Started

### Prerequisites
- Node.js (LTS version recommended)
- npm, yarn, or bun
- A running instance of [portfolio-api](https://github.com/idMJA/portfolio-api) for integrations

### Installation

1. Clone the repository
```bash
git clone https://github.com/idMJA/portfolio.git
cd portfolio
```

2. Install dependencies
```bash
npm install
# or
yarn install
# or
bun install
```

3. Set up environment variables in `.env`:
```env
# API URL
NEXT_PUBLIC_API_URL=your_portfolio_api_url
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🌐 Deployment

This portfolio is optimized for deployment on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FidMJA%2Fportfolio)

## 📝 Customization

This portfolio is fully customizable:

- Update personal information in the main page components
- Add new projects to the projects section
- Connect your own API keys for Discord, Spotify, and other integrations
- Modify the theme colors in the Tailwind config

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
