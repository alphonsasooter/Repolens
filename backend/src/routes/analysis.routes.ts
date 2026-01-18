import express, { Router, Request, Response } from 'express';
import { AnalyzerService } from '../services/analyzer.service';

const router: Router = express.Router();

router.get('/:owner/:repo', async (req: Request, res: Response) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  const { owner, repo } = req.params;
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const analyzer = new AnalyzerService(token);
    const analysis = await analyzer.analyzeRepository(owner, repo);
    
    res.json(analysis);
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Analysis failed' });
  }
});

export default router;