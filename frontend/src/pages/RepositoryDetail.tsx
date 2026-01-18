import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, GitFork, Code } from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar
} from 'recharts';
import api from '../services/api';

/* -------------------- Types -------------------- */

type RouteParams = {
  owner?: string;
  repo?: string;
};

type RepoData = {
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
};

type AnalysisData = {
  healthScore: number;
  languages: {
    primaryLanguage: string;
    languages: Record<string, number>;
  };
  commits: {
    commitFrequency: { date: string; count: number }[];
    topContributors: { author: string; commits: number }[];
  };
  fileAnalysis: {
    totalFiles: number;
    filesByExtension: Record<string, number>;
    largestFiles: { path: string; size: number }[];
  };
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function RepositoryDetail() {
  const { owner, repo } = useParams<RouteParams>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [repoData, setRepoData] = useState<RepoData | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);

  useEffect(() => {
    if (owner && repo) {
      loadData();
    }
  }, [owner, repo]);

  const loadData = async () => {
    try {
      const [repoRes, analysisRes] = await Promise.all([
        api.get(`/api/repos/${owner}/${repo}`),
        api.get(`/api/analysis/${owner}/${repo}`)
      ]);

      setRepoData(repoRes.data);
      setAnalysis(analysisRes.data);
    } catch (error) {
      console.error('Failed to load repository:', error);
    } finally {
      setLoading(false);
    }
  };

  /* -------------------- States -------------------- */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-indigo-600" />
      </div>
    );
  }

  if (!repoData || !analysis) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="mb-4 text-gray-600">Failed to load repository</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="text-indigo-600 hover:underline"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  /* -------------------- Derived Data -------------------- */

  const languageData = Object.entries(analysis.languages.languages).map(
    ([name, value]) => ({ name, value })
  );

  /* -------------------- UI -------------------- */

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </button>

          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">{repoData.name}</h1>
              <p className="text-gray-600 mt-2">{repoData.description}</p>

              <div className="flex gap-6 mt-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Star size={16} /> {repoData.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork size={16} /> {repoData.forks_count}
                </span>
                <span className="flex items-center gap-1">
                  <Code size={16} /> {analysis.languages.primaryLanguage}
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl p-6 text-center">
              <div className="text-4xl font-bold">{analysis.healthScore}</div>
              <div className="text-sm opacity-90">Health Score</div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Language Chart */}
        <div className="bg-white rounded-xl p-6 border">
          <h2 className="text-xl font-semibold mb-4">Language Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={languageData} dataKey="value" outerRadius={80} label>
                {languageData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Commit Activity */}
        <div className="bg-white rounded-xl p-6 border">
          <h2 className="text-xl font-semibold mb-4">Commit Activity</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analysis.commits.commitFrequency.slice(-30)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#6366f1" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Contributors */}
        <div className="bg-white rounded-xl p-6 border">
          <h2 className="text-xl font-semibold mb-4">Top Contributors</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analysis.commits.topContributors}>
              <XAxis dataKey="author" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="commits" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* File Stats */}
        <div className="bg-white rounded-xl p-6 border">
          <h2 className="text-xl font-semibold mb-4">File Statistics</h2>

          <p className="flex justify-between">
            <span>Total Files</span>
            <strong>{analysis.fileAnalysis.totalFiles}</strong>
          </p>
        </div>
      </main>
    </div>
  );
}