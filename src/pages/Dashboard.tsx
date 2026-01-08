// src/pages/Dashboard.tsx
import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import type { IJob } from '../types';
import JobCard from '../components/JobCard';

const API_URL = `/api/jobs`;

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [loading, setLoading] = useState(true);
  
  // We ALWAYS expect a company param now based on your flow
  const selectedCompany = searchParams.get('company') || '';

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        let url = `${API_URL}?limit=100`; // Get up to 100 jobs for the specific company
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
    // Optimistic Update
    if (status === 'down') setJobs(prev => prev.filter(j => j._id !== id));
    else setJobs(prev => prev.map(j => j._id === id ? { ...j, thumbStatus: status } : j));

    await fetch(`${API_URL}/${id}/feedback`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
    });
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-[#1c54b2] font-medium text-lg animate-pulse">Loading jobs...</div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[600px] p-6 md:p-8 relative">
      
      {/* Back Button */}
      <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-[#1c54b2] mb-6">
        ← Back to Directory
      </Link>

      {/* Header */}
      <div className="border-b border-gray-100 pb-6 mb-6">
        {selectedCompany ? (
            <div>
                <h1 className="text-3xl font-bold text-gray-900">{selectedCompany}</h1>
                <p className="text-gray-500 mt-1">{jobs.length} active roles found</p>
            </div>
        ) : (
            <h1 className="text-3xl font-bold text-gray-900">All Jobs</h1>
        )}
      </div>

      {/* JOB LIST */}
      {jobs.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <p className="text-gray-500 text-lg">No active jobs found for this company.</p>
          <Link to="/" className="text-[#1c54b2] font-medium mt-2 inline-block hover:underline">
            Return to directory
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map(job => (
            <JobCard key={job._id} job={job} onFeedback={handleFeedback} />
          ))}
        </div>
      )}
    </div>
  );
}