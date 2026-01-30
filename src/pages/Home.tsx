import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import JobCard from '../components/JobCard';
import DirectoryCard from '../components/DirectoryCard'; // ✅ Use new card
import type { IJob, ICompany } from '../types';

export default function Home() {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);

  useEffect(() => {
    // 1. Fetch Latest Jobs
    fetch('/api/jobs?limit=9')
      .then(res => res.json())
      .then(data => {
        setJobs(data.jobs || []);
        setLoadingJobs(false);
      })
      .catch(e => console.error("Jobs fetch error:", e));

    // 2. Fetch ALL Companies (Directory)
    fetch('/api/jobs/directory')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
            // Show a mix of 8 random or top companies
            setCompanies(data.slice(0, 8)); 
        }
      })
      .catch(e => console.error("Directory fetch error:", e));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      
      {/* HERO SECTION */}
      <div className="bg-slate-900 text-white py-24 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Work in Germany, <br/> <span className="text-blue-400">Speak English.</span>
        </h1>
        <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
            We curate tech & business roles from companies where German is not required. Verified by AI.
        </p>
        <div className="flex justify-center gap-4">
            <Link to="/directory" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-lg font-bold transition-all">
                Browse Companies
            </Link>
            <Link to="/jobs" className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-3.5 rounded-lg font-bold transition-all">
                View Latest Jobs
            </Link>
        </div>
      </div>

      {/* --- COMPANY SHOWCASE (Clean List) --- */}
      <div className="py-16 border-b border-slate-100 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                    English-First Employers
                </p>
            </div>
            
            {/* Grid of DirectoryCards */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
                {companies.map(c => (
                    <DirectoryCard key={c.companyName} company={c} />
                ))}
            </div>

            <div className="mt-12 text-center">
                <Link to="/directory" className="inline-flex items-center text-blue-600 font-bold hover:text-blue-800 transition-colors">
                    See all companies <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
            </div>
        </div>
      </div>

      {/* LATEST JOBS FEED */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-10">
            <div>
                <h2 className="text-3xl font-bold text-slate-900">Fresh Opportunities</h2>
                <p className="text-slate-500 mt-2">Latest verified English-speaking roles.</p>
            </div>
            <Link to="/jobs" className="hidden md:flex items-center font-bold text-blue-600 hover:text-blue-800">
                View all <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
        </div>

        {loadingJobs ? (
            <div className="space-y-4">
                {[1,2,3].map(i => <div key={i} className="h-40 bg-slate-100 rounded-xl animate-pulse"></div>)}
            </div>
        ) : (
            <div className="space-y-4">
                {jobs.map(job => (
                    <JobCard key={job._id} job={job} />
                ))}
            </div>
        )}
      </div>

    </div>
  );
}