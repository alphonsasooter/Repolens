"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyzerService = void 0;
const rest_1 = require("@octokit/rest");
class AnalyzerService {
    constructor(token) {
        this.octokit = new rest_1.Octokit({ auth: token });
    }
    async analyzeRepository(owner, repo) {
        const [fileAnalysis, languages, commits] = await Promise.all([
            this.analyzeFiles(owner, repo),
            this.analyzeLanguages(owner, repo),
            this.analyzeCommits(owner, repo)
        ]);
        const healthScore = this.calculateHealthScore({
            fileAnalysis,
            languages,
            commits
        });
        return {
            fileAnalysis,
            languages,
            commits,
            healthScore
        };
    }
    /* ---------------- FILE ANALYSIS ---------------- */
    async analyzeFiles(owner, repo) {
        const { data: tree } = await this.octokit.git.getTree({
            owner,
            repo,
            tree_sha: 'HEAD',
            recursive: 'true'
        });
        const files = tree.tree.filter(item => item.type === 'blob');
        const filesByExtension = {};
        let totalLines = 0;
        files.forEach(file => {
            const ext = file.path?.split('.').pop() || 'no-extension';
            filesByExtension[ext] = (filesByExtension[ext] || 0) + 1;
        });
        const largestFiles = files
            .filter(f => f.size)
            .sort((a, b) => (b.size || 0) - (a.size || 0))
            .slice(0, 10)
            .map(f => ({
            path: f.path || '',
            size: f.size || 0
        }));
        return {
            totalFiles: files.length,
            filesByExtension,
            totalLines,
            largestFiles
        };
    }
    /* ---------------- LANGUAGE ANALYSIS ---------------- */
    async analyzeLanguages(owner, repo) {
        const { data: languages } = await this.octokit.repos.listLanguages({
            owner,
            repo
        });
        const totalBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
        const languagePercentages = {};
        Object.entries(languages).forEach(([lang, bytes]) => {
            languagePercentages[lang] = Math.round((bytes / totalBytes) * 100);
        });
        const primaryLanguage = Object.entries(languages).sort(([, a], [, b]) => b - a)[0]?.[0] ||
            'Unknown';
        return {
            languages: languagePercentages,
            primaryLanguage
        };
    }
    /* ---------------- COMMIT ANALYSIS ---------------- */
    async analyzeCommits(owner, repo) {
        const { data: commits } = await this.octokit.repos.listCommits({
            owner,
            repo,
            per_page: 100
        });
        const contributorMap = new Map();
        const dateMap = new Map();
        commits.forEach(commit => {
            const author = commit.commit.author?.name || 'Unknown';
            contributorMap.set(author, (contributorMap.get(author) || 0) + 1);
            const date = commit.commit.author?.date?.split('T')[0] || '';
            dateMap.set(date, (dateMap.get(date) || 0) + 1);
        });
        const topContributors = Array.from(contributorMap.entries())
            .map(([author, commits]) => ({ author, commits }))
            .sort((a, b) => b.commits - a.commits)
            .slice(0, 5);
        const commitFrequency = Array.from(dateMap.entries())
            .map(([date, count]) => ({ date, count }))
            .sort((a, b) => a.date.localeCompare(b.date));
        return {
            totalCommits: commits.length,
            commitFrequency,
            topContributors
        };
    }
    /* ---------------- HEALTH SCORE ---------------- */
    calculateHealthScore(data) {
        let score = 0;
        // File count (20)
        if (data.fileAnalysis.totalFiles > 10)
            score += 10;
        if (data.fileAnalysis.totalFiles < 1000)
            score += 10;
        // Language diversity (15)
        const langCount = Object.keys(data.languages.languages).length;
        score += Math.min(langCount * 5, 15);
        // Commit activity (25)
        score += Math.min(data.commits.totalCommits, 25);
        // Contributors (10)
        score += Math.min(data.commits.topContributors.length * 2, 10);
        // Large file penalty
        data.fileAnalysis.largestFiles.forEach(file => {
            if (file.size > 500000)
                score -= 1;
        });
        // Clamp score
        if (score < 0)
            score = 0;
        if (score > 100)
            score = 100;
        return score;
    }
} // Commit activity (25 points)
exports.AnalyzerService = AnalyzerService;
