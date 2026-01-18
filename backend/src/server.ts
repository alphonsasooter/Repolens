import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import repoRoutes from './routes/repo.routes';
import analysisRoutes from './routes/analysis.routes';

dotenv.config();

const app: Express = express();

// 🔹 Force backend port to 3001 to avoid 5000 conflicts
const PORT =3001;

// Debug logs to confirm ports and URLs
console.log('PORT from env:', process.env.PORT);
console.log('Using backend port:', PORT);
console.log('Frontend URL:', process.env.FRONTEND_URL || 'http://localhost:5173');

// Enable CORS for frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// Health check route
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'RepoLens API is running' });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/repos', repoRoutes);
app.use('/api/analysis', analysisRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});