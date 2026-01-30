import { useEffect, useState } from 'react';
import type { IJob } from '../types';
import JobCard from '../components/JobCard';
import { ShieldCheck } from 'lucide-react';

export default function ReviewQueue() {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [loading, setLoading] = useState(false);

  // Initial Fetch on Component Load
  useEffect(() => {
    fetchQueue();
  }, []);

  const fetchQueue = async () => {
    setLoading(true);
    try {
        // This request sends your token automatically via the browser/auth context logic
        // if you set up an interceptor, OR you must explicitly pass headers here.
        // For simplicity, let's assume global fetch wrapper or add headers manually:
        const token = localStorage.getItem('token');
        const res = await fetch('/api/jobs/admin/review', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setJobs(data.jobs || []);
    } catch (e) { 
        console.error("Failed to load queue", e); 
    } finally { 
        setLoading(false); 
    }
  };

  const handleDecision = async (id: string, decision: 'accept' | 'reject') => {
      // Optimistic UI update: Remove job immediately
      setJobs(prev => prev.filter(j => j._id !== id));
      
      const token = localStorage.getItem('token');
      await fetch(`/api/jobs/admin/decision/${id}`, {
          method: 'PATCH',
          headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ decision })
      });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8 border-b border-slate-200 pb-4">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                   <ShieldCheck className="text-blue-600" /> Review Queue
                </h1>
                <p className="text-slate-500 mt-1">
                    {jobs.length} jobs pending AI verification.
                </p>
            </div>
            <button 
                onClick={fetchQueue} 
                className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
            >
                Refresh List
            </button>
        </div>

        {loading ? (
            <div className="text-center py-20 text-slate-400">Loading pending jobs...</div>
        ) : jobs.length === 0 ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-12 text-center">
                <div className="text-4xl mb-4">🎉</div>
                <h3 className="text-lg font-bold text-green-800 mb-2">All Caught Up!</h3>
                <p className="text-green-700">No pending jobs in the queue.</p>
            </div>
        ) : (
            <div className="space-y-6">
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