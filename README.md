<div align="center">
  <img src="./static/logo.svg" alt="Cron Debugger Logo" width="200" height="100">
  
  # Cron Debugger 🔧
  
  *Visualize and understand your cron schedules with this interactive cron expression debugger.*
  
  [![CD](https://github.com/svev-dev/cron-debugger/actions/workflows/cd.yml/badge.svg)](https://github.com/svev-dev/cron-debugger/actions/workflows/cd.yml)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
</div>

A modern, interactive web tool that helps developers debug, visualize, and understand cron expressions. Built with SvelteKit.

## ✨ Features

- **Interactive Cron Input**: Real-time validation and parsing of cron expressions
- **Human-Readable Output**: Converts complex cron expressions into plain English
- **Visual Schedule Preview**: Shows upcoming execution times for your cron jobs
- **URL Sharing**: Share specific cron expressions via URL parameters
- **Mobile Responsive**: Works seamlessly across all devices
- **TypeScript Support**: Full type safety throughout the application

## 🛠️ Tech Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev/) 2.x
- **Language**: [TypeScript](https://www.typescriptlang.org/) 5.x
- **Testing**: [Vitest](https://vitest.dev/) with [Playwright](https://playwright.dev/) for browser tests
- **Linting**: [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)
- **Cron Parsing**: [cron-parser](https://github.com/harrisiirak/cron-parser) + [cronstrue](https://github.com/bradymholt/cronstrue)

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm (or yarn/pnpm)

### Development Setup

1. **Clone the repository**

    ```bash
    git clone https://github.com/svev-dev/cron-debugger.git
    cd cron-debugger
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Start the development server**

    ```bash
    npm run dev
    ```

4. **Open your browser**
   Navigate to [http://localhost:5173](http://localhost:5173)

## 📜 Available Scripts

| Script                | Description                              |
| --------------------- | ---------------------------------------- |
| `npm run dev`         | Start development server with hot reload |
| `npm run build`       | Build for production                     |
| `npm run preview`     | Preview production build locally         |
| `npm run check`       | Run type checking                        |
| `npm run check:watch` | Run type checking in watch mode          |
| `npm run format`      | Format code                              |
| `npm run lint`        | Run lint and format checks               |
| `npm run test`        | Run all tests                            |
| `npm run test:unit`   | Run tests in watch mode                  |

## 🔧 Development Guidelines

### Project Structure

```
src/
├── lib/           # Reusable components and utilities
│   ├── icons/     # SVG icon components
│   └── types.ts   # TypeScript type definitions
├── routes/        # SvelteKit pages and layouts
└── app.css        # Global styles
```

### Key Components

- **CronInput**: Interactive cron expression input with validation
- **HumanReadable**: Converts cron expressions to human-readable text
- **Schedules**: Displays upcoming execution times

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
    ```bash
    git checkout -b <gh-username>/your-feature-name
    ```
3. **Make your changes**
4. **Run the test suite**
    ```bash
    npm run lint
    npm run test
    npm run check
    ```
5. **Commit your changes**
    ```bash
    git commit -m "feat: add your feature description"
    ```
6. **Push to your branch**
    ```bash
    git push origin <gh-username>/your-feature-name
    ```
7. **Open a Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **svev.dev** - Open-source umbrella organization
- **Uicons** by Flaticon - Icon library

---

**Need to monitor your cron jobs in production?** Check out [CronMonitor](https://monitor.svev.dev) - our cron job monitoring tool!
