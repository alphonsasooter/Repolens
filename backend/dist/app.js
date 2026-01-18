"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const analysis_routes_1 = __importDefault(require("./routes/analysis.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Home route (fixes "Cannot GET /")
app.get('/', (_req, res) => {
    res.send('Analyzer API is running 🚀');
});
// API routes
app.use('/api', analysis_routes_1.default);
exports.default = app;
