import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import DirectoryCard from '../components/DirectoryCard'; // ✅ Use new card

interface CompanyStats {
  companyName: string;
  openRoles: number;
  cities: string[];
  domain: string;
  source: 'scraped' | 'manual';
}

export default function CompanyDirectory() {
  const [companies, setCompanies] = useState<CompanyStats[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/jobs/directory')
      .then(res => {
          if (!res.ok) throw new Error('Failed');
          return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
            // Sort simply by name A-Z
            const sorted = data.sort((a, b) => a.companyName.localeCompare(b.companyName));
            setCompanies(sorted);
        }
        setLoading(false);
      })
      .catch(e => {
          console.error(e);
          setLoading(false);
      });
  }, []);

  const filteredCompanies = companies.filter(c => 
    c.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.cities.some(city => city.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
                Company Directory
            </h1>
            <h3 className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
                Explore companies  with English-friendly roles in Germany. <br/>Select a company to view current openings. <br/>Jobs links redirect to official company career pages.
            </h3>
            
            

            <div className="max-w-md mx-auto relative">
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <input 
                    type="text" 
                    placeholder="Search companies..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 shadow-sm outline-none"
                />
            </div>
        </div>
      </div>

      {/* Directory Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
            <div className="text-center text-slate-400 py-20">Loading directory...</div>
        ) : filteredCompanies.length === 0 ? (
            <div className="text-center py-20">
                <h3 className="text-lg font-bold text-slate-700">No companies found</h3>
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredCompanies.map((company) => (
                    <DirectoryCard key={company.companyName} company={company} />
                ))}
            </div>
        )}
      </div>
    </div>
  );
}