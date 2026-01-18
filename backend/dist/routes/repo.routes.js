"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rest_1 = require("@octokit/rest");
const router = express_1.default.Router();
// Get user's repositories
router.get('/', async (req, res) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    try {
        const octokit = new rest_1.Octokit({ auth: token });
        const { data } = await octokit.repos.listForAuthenticatedUser({
            sort: 'updated',
            per_page: 100
        });
        res.json(data);
    }
    catch (error) {
        console.error('Error fetching repos:', error);
        res.status(500).json({ error: 'Failed to fetch repositories' });
    }
});
// Get specific repository
router.get('/:owner/:repo', async (req, res) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const { owner, repo } = req.params;
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    try {
        const octokit = new rest_1.Octokit({ auth: token });
        const { data } = await octokit.repos.get({ owner, repo });
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch repository' });
    }
});
exports.default = router;
