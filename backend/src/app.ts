import express from 'express';
import dotenv from 'dotenv';
import analysisRoutes from './routes/analysis.routes';

dotenv.config();

const app = express();

app.use(express.json());

// Home route (fixes "Cannot GET /")
app.get('/', (_req, res) => {
  res.send('Analyzer API is running 🚀');
});

// API routes
app.use('/api', analysisRoutes);

export default app;