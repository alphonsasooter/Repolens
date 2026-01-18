"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const repo_routes_1 = __importDefault(require("./routes/repo.routes"));
const analysis_routes_1 = __importDefault(require("./routes/analysis.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// 🔹 Force backend port to 3001 to avoid 5000 conflicts
const PORT = 3001;
// Debug logs to confirm ports and URLs
console.log('PORT from env:', process.env.PORT);
console.log('Using backend port:', PORT);
console.log('Frontend URL:', process.env.FRONTEND_URL || 'http://localhost:5173');
// Enable CORS for frontend
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express_1.default.json());
// Health check route
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'RepoLens API is running' });
});
// API routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/repos', repo_routes_1.default);
app.use('/api/analysis', analysis_routes_1.default);
// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
