# Personal Website 2.0

A modern, responsive personal website built with Next.js, React, and Tailwind CSS. Features dark/light mode switching, responsive design, and automated deployment to GitHub Pages.

## 🚀 Features

- **Modern Design**: Clean, professional interface with glassmorphism effects
- **Dark/Light Mode**: Smooth theme switching with system preference detection
- **Responsive**: Mobile-first design that works on all devices
- **Fast Performance**: Static site generation for optimal loading speeds
- **Accessible**: ARIA labels, keyboard navigation, and screen reader support
- **Animated**: Smooth transitions and hover effects
- **SEO Optimized**: Proper meta tags and structured data

## 🛠️ Tech Stack

- **Framework**: Next.js 15.4.1
- **UI Library**: React 18.3.1
- **Styling**: Tailwind CSS 3.4.14
- **Icons**: Lucide React
- **Deployment**: GitHub Pages
- **CI/CD**: GitHub Actions

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/micahmcnutt/personal-website-2.0.git
cd personal-website-2.0
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment

### Automatic Deployment (GitHub Pages)

The site automatically deploys to GitHub Pages when changes are pushed to the main branch. The deployment workflow:

1. Builds the Next.js project
2. Generates static files in the `out` directory
3. Deploys to GitHub Pages

### Manual Deployment

To deploy manually:

```bash
npm run build
npm run deploy
```

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run export` - Export static files
- `npm run deploy` - Build and prepare for deployment

## 📁 Project Structure

```
personal-website-2.0/
├── components/
│   ├── layout/          # Layout components (Header, Footer)
│   ├── pages/           # Page components (HomePage, etc.)
│   └── ui/              # Reusable UI components
├── contexts/            # React contexts (Theme)
├── data/               # Static data files
├── pages/              # Next.js pages
├── public/             # Static assets
├── styles/             # Global styles
├── utils/              # Utility functions
└── .github/workflows/  # GitHub Actions workflows
```

## 🎨 Customization

### Theme Configuration

The theme system supports:
- Light and dark modes
- System preference detection
- Smooth transitions
- Persistent user preference

### Content Management

Update content in the `data/` directory:
- `projects.js` - Portfolio projects
- `contact.js` - Contact information and social links

## 🔧 Configuration

### GitHub Pages Setup

1. Enable GitHub Pages in repository settings
2. Set source to "GitHub Actions"
3. The workflow will automatically deploy on push to main

### Environment Variables

- `NODE_ENV` - Set to 'production' for production builds
- Base path is automatically configured for GitHub Pages

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Micah McNutt**
- Website: [micahmcnutt.github.io/personal-website-2.0](https://micahmcnutt.github.io/personal-website-2.0)
- GitHub: [@micahmcnutt](https://github.com/micahmcnutt)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 🐛 Issues

If you encounter any issues, please report them on the [GitHub Issues](https://github.com/micahmcnutt/personal-website-2.0/issues) page.