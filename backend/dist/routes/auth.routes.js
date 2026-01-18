"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const router = (0, express_1.Router)();
/**
 * Step 1: Redirect user to GitHub OAuth login
 */
router.get('/github', (req, res) => {
    const clientId = process.env.GITHUB_CLIENT_ID;
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';
    const redirectUri = `${backendUrl}/api/auth/github/callback`;
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=repo,read:user`;
    // Redirect browser to GitHub login
    res.redirect(githubAuthUrl);
});
/**
 * Step 2: GitHub callback
 */
router.get('/github/callback', async (req, res) => {
    const code = req.query.code;
    if (!code) {
        return res.status(400).send('GitHub OAuth code not provided');
    }
    try {
        // Exchange code for access token
        const tokenResponse = await axios_1.default.post('https://github.com/login/oauth/access_token', {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code
        }, { headers: { Accept: 'application/json' } });
        const accessToken = tokenResponse.data.access_token;
        if (!accessToken) {
            return res.status(400).send('Failed to retrieve access token');
        }
        // Optional: get user info from GitHub
        const userResponse = await axios_1.default.get('https://api.github.com/user', {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        // Redirect to frontend with token as query param
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        res.redirect(`${frontendUrl}?token=${accessToken}`);
    }
    catch (error) {
        console.error('GitHub auth error:', error);
        res.status(500).send('GitHub authentication failed');
    }
});
exports.default = router;
