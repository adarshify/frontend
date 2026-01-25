import React, { useState } from 'react';
import type { IJob } from '../types';
import JobCard from '../components/JobCard';
import { Lock } from 'lucide-react';

export default function ReviewQueue() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [loading, setLoading] = useState(false);

  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
        setIsAuthenticated(true);
        fetchQueue();
    } else {
        alert("Wrong password");
    }
  };

  const fetchQueue = async () => {
    setLoading(true);
    try {
        const res = await fetch('/api/jobs/admin/review');
        const data = await res.json();
        setJobs(data.jobs || []);
    } catch (e) { console.error(e); } 
    finally { setLoading(false); }
  };

  const handleDecision = async (id: string, decision: 'accept' | 'reject') => {
      setJobs(prev => prev.filter(j => j._id !== id));
      await fetch(`/api/jobs/admin/decision/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ decision })
      });
  };

  if (!isAuthenticated) {
      return (
          <div className="flex justify-center items-center min-h-[60vh] bg-slate-50">
              <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 w-full max-w-sm">
                  <div className="flex justify-center mb-4">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <Lock className="w-6 h-6 text-blue-600" />
                      </div>
                  </div>
                  <h2 className="text-xl font-bold text-center text-slate-900 mb-6">Admin Access</h2>
                  <form onSubmit={handleLogin} className="space-y-4">
                      <input 
                        type="password" 
                        placeholder="Enter admin password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700">
                          Login
                      </button>
                  </form>
              </div>
          </div>
      );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Review Queue</h1>
                <p className="text-slate-500">{jobs.length} jobs pending classification.</p>
            </div>
            <button onClick={fetchQueue} className="text-blue-600 font-medium hover:underline">
                Refresh
            </button>
        </div>

        {loading ? (
            <div className="text-center py-12">Loading...</div>
        ) : jobs.length === 0 ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-12 text-center">
                <h3 className="text-lg font-bold text-green-800 mb-2">Queue Empty</h3>
                <p className="text-green-700">Good job! No pending jobs.</p>
            </div>
        ) : (
            <div className="space-y-4">
                {jobs.map(job => (
                    <JobCard 
                        key={job._id} 
                        job={job} 
                        isReviewMode={true} 
                        onDecision={handleDecision} 
                    />
                ))}
            </div>
        )}
    </div>
  );
}