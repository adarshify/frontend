import { useState, useEffect } from 'react';
import type { IJob } from '../types';
import JobCard from '../components/JobCard';

export default function RejectedJobs() {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRejectedJobs();
  }, []);

  const fetchRejectedJobs = async () => {
    setLoading(true);
    try {
        const token = localStorage.getItem('token');
        // Assuming your backend route for this is protected, pass the token
        const res = await fetch('/api/jobs/rejected', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setJobs(Array.isArray(data) ? data : []);
    } catch (e) {
        console.error(e);
    } finally {
        setLoading(false);
    }
  };

  const handleRestore = async (id: string) => {
      // 1. Optimistic remove from list
      setJobs(prev => prev.filter(j => j._id !== id));
      
      // 2. API Call
      const token = localStorage.getItem('token');
      await fetch(`/api/jobs/${id}/feedback`, {
          method: 'PATCH',
          headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ status: null }) // Reset status to null
      });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-6 pb-4 border-b border-red-100 flex justify-between items-center">
            <div>
                <h2 className="text-2xl font-bold text-red-700">🗑️ Rejected Jobs</h2>
                <p className="text-sm text-slate-500">{jobs.length} jobs in trash.</p>
            </div>
            <button onClick={fetchRejectedJobs} className="text-red-600 hover:underline text-sm">Refresh</button>
        </div>

        {loading ? <p className="text-center py-10">Loading...</p> : (
            <div className="space-y-4">
                {jobs.map(job => (
                    <JobCard 
                        key={job._id} 
                        job={job} 
                        isRejectedView={true} 
                        onRestore={handleRestore} 
                    />
                ))}
            </div>
        )}
    </div>
  );
}