// src/pages/CompanyDirectory.tsx
import React, { useEffect, useState } from 'react';
import CompanyCard from '../components/CompanyCard';

interface CompanyStats {
  companyName: string;
  openRoles: number;
  cities: string[];
  domain: string;
}

export default function CompanyDirectory() {
  const [companies, setCompanies] = useState<CompanyStats[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [selectedCity, setSelectedCity] = useState('All Cities');
  
  // ✅ SAFETY CHECK: Ensure companies is an array before using flatMap to generate city list
  const allCities = Array.isArray(companies) 
    ? Array.from(new Set(companies.flatMap(c => c.cities))).sort() 
    : [];

  useEffect(() => {
    fetch('/api/jobs/directory')
      .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        // ✅ Validate data type is actually an Array
        if (Array.isArray(data)) {
            setCompanies(data);
        } else {
            console.error("API did not return an array:", data);
            setCompanies([]); 
        }
        setLoading(false);
      })
      .catch(err => {
          console.error("Failed to load directory:", err);
          setCompanies([]); // Fallback to empty state
          setLoading(false);
      });
  }, []);

  // Filter Logic
  const filteredCompanies = companies.filter(company => {
    if (selectedCity !== 'All Cities') {
      if (!company.cities.includes(selectedCity)) return false;
    }
    return true;
  });

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen text-gray-500 font-medium">
        Loading Directory...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      {/* Header Section */}
      <div className="text-center py-12 px-4">
        <h1 className="text-4xl font-bold text-[#1a1a2e] mb-4">Company Directory</h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Explore companies with English-friendly roles in Germany. 
          Select a company to view current openings.
        </p>
        <p className="text-xs text-gray-400 mt-2">
            Job links redirect to official company career pages.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-wrap gap-4 items-center justify-center md:justify-start">
          
          <div className="flex items-center gap-2">
            <span className="text-gray-600 font-medium">City:</span>
            <select 
              value={selectedCity} 
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 min-w-[150px]"
            >
              <option value="All Cities">All Cities</option>
              {allCities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <button 
            onClick={() => setSelectedCity('All Cities')}
            className="text-sm text-gray-500 hover:text-blue-600 underline ml-2"
          >
            Reset Filters
          </button>
        </div>

        <div className="mt-4 text-center md:text-left text-gray-500">
            Showing {filteredCompanies.length} companies
        </div>
      </div>

      {/* Grid Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {filteredCompanies.length === 0 ? (
            // Empty State
            <div className="text-center py-20">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-xl font-bold text-gray-700">No Companies Found</h3>
                <p className="text-gray-500 mt-2">
                    {companies.length === 0 
                        ? "The database appears to be empty. Try running the scraper." 
                        : "No companies match your selected filters."}
                </p>
            </div>
        ) : (
            // Company Grid
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredCompanies.map((company) => (
                <CompanyCard key={company.companyName} company={company} />
              ))}
            </div>
        )}
      </div>

      {/* Footer Recommendation */}
      <div className="max-w-3xl mx-auto px-4 pb-12">
        <div className="bg-gray-100 rounded-lg p-6 flex justify-between items-center border border-gray-200">
            <div className="text-sm text-gray-600">
                Company missing? <span className="text-gray-400">Recommend a company we should know about.</span>
            </div>
            <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2 px-4 rounded shadow-sm">
                Recommend a company
            </button>
        </div>
      </div>
    </div>
  );
}