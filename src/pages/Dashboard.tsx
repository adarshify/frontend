import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import type { IJob } from '../types';
import JobCard from '../components/JobCard';

const API_URL = `/api/jobs`;

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [loading, setLoading] = useState(true);
  
  // We expect a company param (e.g. ?company=Zalando)
  const selectedCompany = searchParams.get('company') || '';

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        let url = `${API_URL}?limit=100`; // Fetch up to 100 jobs
        if (selectedCompany) {
          url += `&company=${encodeURIComponent(selectedCompany)}`;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch jobs');
        
        const data = await response.json();
        // The API returns { jobs: [], totalJobs: ... }
        setJobs(data.jobs || []);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [selectedCompany]);

  const handleFeedback = async (id: string, status: 'up' | 'down') => {
    // Optimistic Update: Hide job if disliked, or update status if liked
    if (status === 'down') {
        setJobs(prev => prev.filter(j => j._id !== id));
    } else {
        setJobs(prev => prev.map(j => j._id === id ? { ...j, thumbStatus: status } : j));
    }

    // Send to backend
    await fetch(`${API_URL}/${id}/feedback`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
    });
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-slate-500 font-medium animate-pulse">Loading jobs...</div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      
      {/* Back Button */}
      <Link to="/directory" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Companies
      </Link>

      {/* Header */}
      <div className="border-b border-slate-200 pb-6 mb-8">
        {selectedCompany ? (
            <div>
                <h1 className="text-3xl font-bold text-slate-900">{selectedCompany}</h1>
                <p className="text-slate-600 mt-2">
                    {jobs.length > 0 
                        ? `Found ${jobs.length} active English-speaking roles` 
                        : "No active English-speaking roles found at the moment."}
                </p>
            </div>
        ) : (
            <h1 className="text-3xl font-bold text-slate-900">All Active Jobs</h1>
        )}
      </div>

      {/* JOB LIST */}
      {jobs.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-xl border border-slate-200 border-dashed">
          <p className="text-slate-500 text-lg">No jobs currently listed for this company.</p>
          <Link to="/directory" className="text-blue-600 font-medium mt-4 inline-block hover:underline">
            Browse other companies
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map(job => (
            <JobCard 
                key={job._id} 
                job={job} 
                onFeedback={handleFeedback} // Pass public feedback handler
            />
          ))}
        </div>
      )}
    </div>
  );
}