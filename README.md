<div align="center">

# RepoLens - GitHub Repository Analyzer

<div align="center">

![RepoLens](https://img.shields.io/badge/RepoLens-Repository%20Analyzer-4F46E5?style=for-the-badge&logo=github&logoColor=white)

**Analyze your GitHub repositories with powerful insights and beautiful visualizations**

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

</div>

---

## 📖 What is RepoLens?

RepoLens helps you understand  GitHub repositories better by providing:

- 📊 Visual charts showing language distribution, commit activity, and contributors
- 📈 File statistics and project insights
- 🔍 Easy search and filtering of repositories
- 💼 Professional dashboard to manage all repos

---

## ✨ Features

### 🔐 GitHub Login
- Secure authentication with your GitHub account
- OAuth 2.0 standard - no password storage

### 📚 Repository Dashboard
- View all your repositories in one place
- Search and filter functionality
- Sort by name, stars, or last updated

### 📊 Detailed Analysis
See comprehensive stats for each repository:
- **Language distribution** - Pie chart showing code composition
- **Commit activity** - Timeline of commits over time
- **Top contributors** - Bar chart of most active developers
- **File statistics** - Breakdown of files by extension and size

---

## 🛠️ Tech Stack

<div align="center">

### Frontend
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

</div>

**Libraries:** Recharts, Axios, React Router, Lucide Icons, Octokit

---

### Verify Installation
```cmd
node --version
npm --version
git --version
```

---

## 🚀 Installation

### Step 1: Clone the Project
```cmd
git clone https://github.com/yourusername/repolens.git
cd repolens
```

### Step 2: Install Backend Dependencies
```cmd
cd backend
npm install
```

### Step 3: Install Frontend Dependencies
```cmd
cd ..\frontend
npm install
```

### Step 4: Set Up GitHub OAuth

1. Go to GitHub: https://github.com/settings/developers
2. Click **"OAuth Apps"** → **"New OAuth App"**
3. Fill in:
   - **Application name:** `RepoLens`
   - **Homepage URL:** `http://localhost:5173`
   - **Callback URL:** `http://localhost:5173/callback`
4. Click **"Register application"**
5. Copy your **Client ID** and **Client Secret**

### Step 5: Configure Environment Variables

**Backend configuration** (`backend\.env`):
```env
PORT=3001
GITHUB_CLIENT_ID=*****
GITHUB_CLIENT_SECRET=****
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

**Frontend configuration** (`frontend\.env`):
```env
VITE_API_URL=http://localhost:3001
VITE_GITHUB_CLIENT_ID=****
```

## ▶️ How to Run

We need to start both the backend and frontend servers.

### Open Two Command Prompt Windows

**Window 1 - Start Backend:**
```cmd
cd backend
npm run dev
```

✅ You should see: `🚀 Server running on http://localhost:3001`

**Window 2 - Start Frontend:**
```cmd
cd frontend
npm run dev
```

✅ You should see: `Local: http://localhost:5173`

### Open Your Browser

Go to: **http://localhost:5173**

---

## 💡 How to Use

1. **Login**
   - Click "Sign in with GitHub"
   - Authorize the application
   - You'll be redirected back to the app

2. **Browse Repositories**
   - See all your repositories on the dashboard
   - Use the search bar to find specific repos

3. **View Analysis**
   - Click any repository card
   - See detailed charts and statistics

---

## 📁 Project Structure
```
repolens/
│
├── backend/                           # Server-side code
│   ├── src/
│   │   ├── routes/                   # API endpoints
│   │   │   ├── auth.routes.ts        # Login/logout
│   │   │   ├── repo.routes.ts        # Get repositories
│   │   │   └── analysis.routes.ts    # Analyze repos
│   │   ├── services/
│   │   │   └── analyzer.service.ts   # Analysis logic
│   │   └── server.ts                 # Main server file
│   ├── .env                          # Configuration (create this)
│   └── package.json
│
├── frontend/                          # User interface
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.tsx             # Login page
│   │   │   ├── Callback.tsx          # OAuth redirect
│   │   │   ├── Dashboard.tsx         # Repo list
│   │   │   └── RepositoryDetail.tsx  # Analysis page
│   │   ├── services/
│   │   │   └── api.ts                # API calls
│   │   ├── types/
│   │   │   └── index.ts              # TypeScript types
│   │   └── App.tsx                   # Main app
│   ├── .env                          # Configuration (create this)
│   └── package.json
│
└── README.md                         # This file
```

---

## 🔌 API Endpoints

### Authentication
- `GET /api/auth/github` - Get GitHub login URL
- `POST /api/auth/callback` - Handle GitHub callback
- `GET /api/auth/user` - Get current user info

### Repositories
- `GET /api/repos` - List all repositories
- `GET /api/repos/:owner/:repo` - Get repository details

### Analysis
- `GET /api/analysis/:owner/:repo` - Analyze repository

All repository and analysis endpoints require authentication token in headers:
```
Authorization: Bearer <your_token>
```

---

## ⚡ Available Scripts

### Backend
```cmd
npm run dev    # Start development server
npm run build  # Compile TypeScript
npm start      # Run production server
```

### Frontend
```cmd
npm run dev    # Start development server
npm run build  # Build for production
npm run preview # Preview production build
---

## 🧪 Testing  Setup

**Check installations:**
```cmd
node --version
npm --version
git --version
```

**Check backend is running:**
- Open browser to: http://localhost:3001/api/health
- You should see: `{"status":"ok","message":"RepoLens API is running"}`

**Check frontend is running:**
- Open browser to: http://localhost:5173
- You should see the login page
-----

After making changes, save to GitHub:
```cmd
git add .
git commit -m "Describe what you changed"
git push origin main
```

---

## 📄 License

This project is open source and available under the MIT License.


Built with:
- React and TypeScript
- GitHub REST API
- Recharts for visualizations
- Tailwind CSS for styling

---

<div align="center">

**Made for developers who want to understand their code better! 🚀**

---

### Quick Start Summary
```cmd
# 1. Clone project
git clone https://github.com/yourusername/repolens.git
cd repolens

# 2. Install dependencies
cd backend && npm install
cd ../frontend && npm install

# 3. Set up GitHub OAuth app (see Step 4 above)

# 4. Create .env files (see Step 5 above)

# 5. Run the app (in two separate terminals)
# Terminal 1:
cd backend
npm run dev

# Terminal 2:
cd frontend
npm run dev

# 6. Open browser to http://localhost:5173
```

</div>

![Stars](https://img.shields.io/github/stars/alphonsasooter/repolens)
![Forks](https://img.shields.io/github/forks/alphonsasooter/repolens)
![Issues](https://img.shields.io/github/issues/alphonsasooter/repolens)
