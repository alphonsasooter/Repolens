"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const analyzer_service_1 = require("../services/analyzer.service");
const router = express_1.default.Router();
router.get('/:owner/:repo', async (req, res) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const { owner, repo } = req.params;
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    try {
        const analyzer = new analyzer_service_1.AnalyzerService(token);
        const analysis = await analyzer.analyzeRepository(owner, repo);
        res.json(analysis);
    }
    catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({ error: 'Analysis failed' });
    }
});
exports.default = router;
