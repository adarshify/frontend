import { useState } from 'react';
import { MapPin, Building2, ChevronRight, Clock, ShieldCheck, ShieldAlert, RefreshCw, Undo2, ThumbsUp, ThumbsDown } from 'lucide-react';
import type { IJob } from '../types';

interface Props {
  job: IJob;
  
  // Admin Props
  isReviewMode?: boolean;
  isRejectedView?: boolean;
  onDecision?: (id: string, decision: 'accept' | 'reject') => void;
  onRestore?: (id: string) => void;

  // ✅ FIXED: Added this missing prop definition
  onFeedback?: (id: string, status: 'up' | 'down') => void;
}

export default function JobCard({ job, isReviewMode, isRejectedView, onDecision, onRestore, onFeedback }: Props) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Recently";
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffDays = Math.ceil(Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)); 
      return diffDays === 1 ? "1 day ago" : `${diffDays} days ago`;
    } catch { return "Recently"; }
  };

  const handleReAnalyze = async () => {
    if(!window.confirm("Run AI analysis on this job again?")) return;
    setIsAnalyzing(true);
    try {
        const res = await fetch(`/api/jobs/${job._id}/analyze`, { method: 'POST' });
        if(res.ok) window.location.reload();
        else alert("Analysis failed.");
    } catch { alert("Network error"); } 
    finally { setIsAnalyzing(false); }
  };

  const shortDesc = job.Description ? job.Description.substring(0, 140) + "..." : "No description available.";

  return (
    <div className={`bg-white border rounded-lg shadow-sm hover:shadow-md transition-all group relative overflow-hidden ${isReviewMode ? 'border-indigo-200' : 'border-slate-200'}`}>
      
      {/* --- ADMIN TOOLBAR (Only visible in Admin Pages) --- */}
      {(isReviewMode || isRejectedView) && (
        <div className="bg-slate-50 border-b border-slate-100 px-4 py-2 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${job.ConfidenceScore > 0.8 ? 'bg-green-50 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
                    AI SCORE: {Math.round(job.ConfidenceScore * 100)}%
                </span>
                {job.GermanRequired && <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-200">GERMAN DETECTED</span>}
            </div>
            
            <button 
                onClick={handleReAnalyze} 
                disabled={isAnalyzing}
                className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-slate-500 hover:text-blue-600 hover:bg-white rounded border border-transparent hover:border-slate-200 transition-all"
                title="Re-Analyze with AI"
            >
                <RefreshCw className={`w-3 h-3 ${isAnalyzing ? 'animate-spin' : ''}`} />
                Re-Check
            </button>
        </div>
      )}

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
              {job.JobTitle}
            </h3>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
              <span className="flex items-center gap-1 font-medium"><Building2 className="w-3.5 h-3.5 text-slate-400" /> {job.Company}</span>
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.Location}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" /> {formatDate(job.PostedDate)}</span>
            </div>
          </div>
        </div>

        <p className="text-slate-600 text-sm mb-5 leading-relaxed">{shortDesc}</p>

        {/* --- FOOTER ACTION AREA --- */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">English</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700">{job.ContractType || 'Full-time'}</span>
          </div>

          <div className="flex gap-3 items-center">
            {isReviewMode ? (
                // ADMIN: Review Buttons
                <>
                    <button onClick={() => onDecision && onDecision(job._id, 'reject')} className="flex items-center gap-1 text-xs font-bold text-red-600 hover:bg-red-50 px-3 py-1.5 rounded transition-colors">
                        <ShieldAlert className="w-3.5 h-3.5" /> REJECT
                    </button>
                    <button onClick={() => onDecision && onDecision(job._id, 'accept')} className="flex items-center gap-1 text-xs font-bold text-white bg-green-600 hover:bg-green-700 px-4 py-1.5 rounded shadow-sm transition-colors">
                        <ShieldCheck className="w-3.5 h-3.5" /> APPROVE
                    </button>
                </>
            ) : isRejectedView ? (
                // ADMIN: Restore Button
                <button onClick={() => onRestore && onRestore(job._id)} className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded transition-colors">
                    <Undo2 className="w-3.5 h-3.5" /> RESTORE
                </button>
            ) : (
                // PUBLIC VIEW
                <div className="flex items-center gap-3">
                    {/* Feedback Buttons (Only if handler is passed) */}
                    {onFeedback && (
                        <div className="flex gap-1">
                            <button 
                                onClick={() => onFeedback(job._id, 'up')}
                                className={`p-1.5 rounded hover:bg-green-50 text-slate-400 hover:text-green-600 transition-colors ${job.thumbStatus === 'up' ? 'text-green-600 bg-green-50' : ''}`}
                                title="Like"
                            >
                                <ThumbsUp className="w-4 h-4" />
                            </button>
                            <button 
                                onClick={() => onFeedback(job._id, 'down')}
                                className="p-1.5 rounded hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
                                title="Hide"
                            >
                                <ThumbsDown className="w-4 h-4" />
                            </button>
                        </div>
                    )}

                    <a href={job.ApplicationURL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">
                        View Job <ChevronRight className="w-4 h-4" />
                    </a>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}