// src/components/CompanyCard.tsx
import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CompanyStats {
  companyName: string;
  openRoles: number;
  cities: string[];
  domain: string;
}

interface Props {
  company: CompanyStats;
}

export default function CompanyCard({ company }: Props) {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  // 1. Try to fetch logo. 
  // Note: Backend might guess 'redcarepharmacy.com', but real one is 'redcare-pharmacy.com'
  // We won't fix the backend logic right now, we will just handle the visual error gracefully.
  const logoUrl = `https://logo.clearbit.com/${company.domain}?size=128`;

  const handleViewJobs = () => {
    navigate(`/jobs?company=${encodeURIComponent(company.companyName)}`);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
      
      {/* Logo Section with Fallback */}
      <div className="h-20 w-full flex items-center justify-center mb-4">
        {!imageError ? (
          <img 
            src={logoUrl} 
            alt={`${company.companyName} logo`}
            className="max-h-16 max-w-[150px] object-contain grayscale hover:grayscale-0 transition-all opacity-90 hover:opacity-100"
            onError={() => setImageError(true)} 
          />
        ) : (
          // Fallback UI if logo fails (Circle with First Letter)
          <div className="h-16 w-16 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-2xl font-bold border border-indigo-200">
            {company.companyName.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Company Name (Visible now, helps with clarity) */}
      <h3 className="text-lg font-bold text-gray-800 mb-2">
        {company.companyName}
      </h3>

      {/* Stats Divider */}
      <div className="w-12 h-1 bg-gray-200 rounded mb-4"></div>

      <div className="w-full mb-2">
        <span className="text-gray-900 font-semibold text-lg">{company.openRoles}</span>
        <span className="text-gray-500 ml-1">open roles</span>
      </div>

      {/* Locations */}
      <div className="grow mb-6 w-full">
        {company.cities.length > 0 ? (
           <p className="text-sm text-gray-500 line-clamp-2">
             {company.cities.join(", ")}
           </p>
        ) : (
           <p className="text-sm text-gray-400 italic">Remote / Various</p>
        )}
      </div>

      {/* Action Button - Exact Color Match #1c54b2 */}
      <button 
        onClick={handleViewJobs}
        className="w-full bg-[#1c54b2] hover:bg-blue-800 text-white font-medium py-2.5 px-4 rounded shadow-sm transition-colors text-sm"
      >
        View Jobs
      </button>
    </div>
  );
}