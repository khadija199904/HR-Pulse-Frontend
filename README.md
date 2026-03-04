<div align="center">
  <h1>HR-Pulse Frontend</h1>

  <p>
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white" alt="Zod" />
    <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint" />
  </p>

  <p>Frontend application for HR-Pulse, built with Next.js App Router, React 19, and Tailwind CSS v4.</p>
  <p>🔗 <b>Backend Repository:</b> <a href="https://github.com/khadija199904/HR-Pulse-Backend">HR-Pulse-Backend</a></p>
</div>

## Backend Project (API)

This frontend application's API is managed by the **HR-Pulse-Backend** project.

- **GitHub Repository:** [HR-Pulse-Backend](https://github.com/khadija199904/HR-Pulse-Backend)
- **Role:** It handles all the business logic, database access, and exposes the endpoints required for this user interface to function properly.
- **Prerequisites:** Make sure the backend server is running and configure the API URL correctly in your environment variables (e.g., `.env.local`) before starting the frontend.

## Getting Started

### Prerequisites

- Node.js (version 20 or higher recommended)
- npm, yarn, pnpm, or bun

### Installation

1. Navigate to the project directory:
   ```bash
   cd hr-pulse-app
   ```

2. Install the dependencies:
   ```bash
   npm install
   
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Library:** [React](https://react.dev/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Forms & Validation:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Charts:** [Recharts](https://recharts.org/)

## Project Structure

The main application code is located inside the `hr-pulse-app` folder.

```text
hr-pulse-app/
├── src/
│   ├── app/          # Next.js App Router (pages, layouts)
│   ├── components/   # Reusable React components
│   ├── services/     # API calls and services (e.g., api.ts)
│   └── ...
├── public/           # Static assets (images, fonts)
├── next.config.ts    # Next.js configuration
├── tailwind.config.* # Tailwind CSS configuration
└── package.json      # Dependencies and scripts
```

##  Scripts

- `npm run dev`: Starts the application in development mode with Hot Module Replacement.
- `npm run build`: Creates an optimized production build of your application.
- `npm run start`: Starts the application in production mode.
- `npm run lint`: Runs ESLint to conceptually check and enforce code styles.