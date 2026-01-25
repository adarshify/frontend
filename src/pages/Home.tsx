import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { Search, ChevronRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import JobCard from '../components/JobCard';
import type { IJob, ICompany } from '../types';

export default function Home() {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [loading, setLoading] = useState(true);

  // Newsletter State
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [subMessage, setSubMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch Latest Jobs
        const jobRes = await fetch('/api/jobs?limit=20');
        const jobData = await jobRes.json();
        setJobs(jobData.jobs || []);

        // 2. Fetch Directory
        const dirRes = await fetch('/api/jobs/directory');
        const dirData = await dirRes.json();
        setCompanies(Array.isArray(dirData) ? dirData : []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubscribe = async (e: FormEvent) => {
      e.preventDefault();
      if(!email) return;
      setSubmitting(true);
      setSubMessage(null);

      try {
          const res = await fetch('/api/users/subscribe', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, categories: [], frequency: 'weekly' })
          });
          
          if(res.ok) {
              setSubMessage({ type: 'success', text: "Thanks for subscribing! We'll be in touch soon." });
              setEmail('');
          } else {
               setSubMessage({ type: 'error', text: "Something went wrong. Please try again." });
          }
      } catch (err) {
           setSubMessage({ type: 'error', text: "Network error. Please try again later." });
      } finally {
          setSubmitting(false);
      }
  };

  const displayCompanies = companies.slice(0, 10).map(c => ({
      name: c.companyName,
      logo: `https://logo.clearbit.com/${c.domain}`,
      industry: c.openRoles > 0 ? 'Hiring Now' : 'English Friendly'
  }));

  return (
    <div className="min-h-screen">
      
      {/* 1. Hero Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Find English-Speaking Jobs in Germany
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Curated opportunities at English-friendly companies across Germany. No recruiters, no spam—just quality roles posted by employers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
            <div className="relative w-full">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
               <input
                type="text"
                placeholder="Search job title or company..."
                className="w-full pl-10 px-4 py-3.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
            </div>
            <button className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold shadow-sm transition-colors whitespace-nowrap">
              Search Jobs
            </button>
          </div>
        </div>
      </div>

      {/* 2. Trusted Companies Strip */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className=" mb-10">
          <h2 className="text-xl font-extrabold text-slate-900 mb-2">
            English-Friendly Companies in Germany
          </h2>
          <p className="text-slate-500">Discover companies known for English-speaking work environments. A helpful starting point for you job search</p>
        </div>

        {/* Company Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {displayCompanies.map((company, idx) => (
            <div 
              key={idx}
              className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:border-slate-300 hover:shadow-sm transition-all cursor-default"
            >
              <img 
                src={company.logo} 
                alt={company.name} 
                className="h-8 object-contain mb-3 grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all"
                onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/50?text=' + company.name[0];
                }}
              />
              <div className="text-sm font-semibold text-slate-900">{company.name}</div>
              <div className="text-xs text-slate-500">{company.industry}</div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
            <Link to="/directory" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
                View all companies <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
        </div>
      </div>

      {/* 3. ✅ MOVED HERE: Newsletter Section */}
    <div className="bg-white text-slate-900 py-16">
  <div className="max-w-4xl mx-auto px-6 text-center">
    
    <div className="inline-flex p-3 bg-blue-50 rounded-full mb-4">
      <Mail className="w-6 h-6 text-blue-600" />
    </div>

    <h2 className="text-2xl md:text-3xl font-bold mb-4">
      Stay updated on top English jobs
    </h2>

    <p className="text-slate-600 mb-8 max-w-xl mx-auto text-lg leading-relaxed">
      We'll start our email service soon. Get a weekly digest of the best new roles at English-first companies in Germany.
    </p>

    <form
      onSubmit={handleSubscribe}
      className="flex flex-col sm:flex-row justify-center items-center gap-3 max-w-md mx-auto relative"
    >
      <input
        type="email"
        placeholder="Enter your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={submitting}
        className="w-full px-5 py-3.5 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium disabled:opacity-60"
      />

      <button
        type="submit"
        disabled={submitting}
        className={`w-full sm:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-colors whitespace-nowrap shrink-0 ${
          submitting ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {submitting ? 'Subscribing...' : 'Subscribe Now'}
      </button>
    </form>

    {/* Feedback Message */}
    {subMessage && (
      <p
        className={`mt-4 font-medium ${
          subMessage.type === 'success' ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {subMessage.text}
      </p>
    )}

    <p className="text-xs text-slate-500 mt-8">
      No spam, ever. Unsubscribe at any time.
    </p>
  </div>
</div>


      {/* 4. Latest Jobs Feed */}
      <div className="bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="flex justify-between items-end mb-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Latest Opportunities
                </h2>
                <p className="text-slate-600">Hand-picked roles verified by AI.</p>
            </div>
          </div>

          {loading ? (
             <div className="py-20 text-center text-slate-500">Loading jobs...</div>
          ) : (
            <div className="space-y-4">
                {jobs.map(job => (
                <JobCard key={job._id} job={job} />
                ))}
            </div>
          )}
          
          <div className="mt-10 text-center">
             <button className="px-8 py-3 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium shadow-sm">
                Load More Jobs
             </button>
          </div>
        </div>
      </div>

    </div>
  );
}