import { useState } from "react";
import { Github } from "lucide-react";

export default function Login() {
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    // Redirect to backend OAuth
    window.location.href = "http://localhost:3001/api/auth/github";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">RepoLens</h1>
          <p className="text-gray-600 mb-8">
            Analyze your GitHub repositories with AI-powered insights
          </p>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Github size={20} />
            {loading ? "Connecting..." : "Sign in with GitHub"}
          </button>

          <p className="text-sm text-gray-500 mt-4">
            We'll only access your public repositories
          </p>
        </div>
      </div>
    </div>
  );
}
