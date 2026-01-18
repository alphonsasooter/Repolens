import express, { Router, Request, Response } from 'express';
import { Octokit } from '@octokit/rest';

const router: Router = express.Router();

// Get user's repositories
router.get('/', async (req: Request, res: Response) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const octokit = new Octokit({ auth: token });
    
    const { data } = await octokit.repos.listForAuthenticatedUser({
      sort: 'updated',
      per_page: 100
    });
    
    res.json(data);
  } catch (error) {
    console.error('Error fetching repos:', error);
    res.status(500).json({ error: 'Failed to fetch repositories' });
  }
});

// Get specific repository
router.get('/:owner/:repo', async (req: Request, res: Response) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  const { owner, repo } = req.params;
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const octokit = new Octokit({ auth: token });
    
    const { data } = await octokit.repos.get({ owner, repo });
    
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch repository' });
  }
});

export default router;