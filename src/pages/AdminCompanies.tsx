import React, { useState, useEffect } from 'react';
import { Trash2, Plus, MapPin, Building2 } from 'lucide-react';

interface Company {
  _id: string;
  companyName: string;
  openRoles: number;
  cities: string[];
  domain: string;
  source: 'scraped' | 'manual';
}

export default function AdminCompanies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [newCompany, setNewCompany] = useState({ name: '', domain: '', cities: '' });

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
        const res = await fetch('/api/jobs/directory');
        const data = await res.json();
        setCompanies(Array.isArray(data) ? data : []);
    } catch (e) { console.error(e); } 
    finally { setLoading(false); }
  };

  const handleAddCompany = async (e: React.FormEvent) => {
      e.preventDefault();
      const token = localStorage.getItem('token');
      try {
          const res = await fetch('/api/jobs/companies', {
              method: 'POST',
              headers: { 
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}` 
              },
              body: JSON.stringify(newCompany)
          });
          if (res.ok) {
              setNewCompany({ name: '', domain: '', cities: '' });
              fetchCompanies();
          } else {
              alert("Failed to add company.");
          }
      } catch (e) { alert("Network Error"); }
  };

  const handleDelete = async (company: Company) => {
      if(!window.confirm(`Delete ${company.companyName}?`)) return;
      const token = localStorage.getItem('token');
      
      try {
          // Logic to delete manual companies specifically
          if (company.source === 'manual') {
              await fetch(`/api/jobs/companies/${company._id}`, { 
                  method: 'DELETE',
                  headers: { 'Authorization': `Bearer ${token}` }
              });
              setCompanies(prev => prev.filter(c => c._id !== company._id));
          } else {
              alert("You can only delete manually added companies from here. Scraped companies are managed by the database.");
          }
      } catch (err) { alert("Network Error"); }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                <Building2 className="w-8 h-8 text-indigo-600" /> Manage Directory
            </h1>
        </div>

        {/* Add Company Form */}
        <div className="bg-white p-6 rounded-xl border border-indigo-100 shadow-sm mb-10">
            <h2 className="text-sm font-bold text-indigo-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add Manual Entry
            </h2>
            <form onSubmit={handleAddCompany} className="grid grid-cols-1 md:grid-cols-7 gap-4">
                <div className="md:col-span-2">
                    <input required placeholder="Company Name" value={newCompany.name} onChange={e => setNewCompany({...newCompany, name: e.target.value})} className="border border-slate-300 p-2.5 rounded-lg w-full text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div className="md:col-span-2">
                    <input required placeholder="Domain (e.g. google.com)" value={newCompany.domain} onChange={e => setNewCompany({...newCompany, domain: e.target.value})} className="border border-slate-300 p-2.5 rounded-lg w-full text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div className="md:col-span-2">
                    <input placeholder="City (e.g. Berlin)" value={newCompany.cities} onChange={e => setNewCompany({...newCompany, cities: e.target.value})} className="border border-slate-300 p-2.5 rounded-lg w-full text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div className="md:col-span-1">
                    <button className="bg-indigo-600 text-white font-bold py-2.5 rounded-lg hover:bg-indigo-700 w-full text-sm shadow-md transition-all">Add</button>
                </div>
            </form>
        </div>

        {/* List */}
        {loading ? <div className="text-slate-400">Loading directory...</div> : (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-700">Company</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Source</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Details</th>
                            <th className="px-6 py-4 font-semibold text-slate-700 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {companies.map((company) => (
                            <tr key={company._id || company.companyName} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-3">
                                    <img 
                                        src={`https://logo.clearbit.com/${company.domain}`} 
                                        onError={(e) => (e.target as HTMLImageElement).src = 'https://via.placeholder.com/20'} 
                                        className="w-6 h-6 object-contain opacity-80" 
                                    />
                                    {company.companyName}
                                </td>
                                <td className="px-6 py-4">
                                    {company.source === 'scraped' 
                                        ? <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-bold border border-green-200">Auto</span> 
                                        : <span className="bg-yellow-100 text-yellow-700 px-2.5 py-1 rounded-full text-xs font-bold border border-yellow-200">Manual</span>
                                    }
                                </td>
                                <td className="px-6 py-4 text-slate-500">
                                    <div className="flex items-center gap-4">
                                        <span className={company.openRoles > 0 ? "text-indigo-600 font-bold" : "text-slate-400"}>{company.openRoles} Jobs</span>
                                        <span className="text-xs text-slate-400 flex items-center gap-1">
                                            <MapPin className="w-3 h-3" /> {company.cities.slice(0, 2).join(", ")}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {company.source === 'manual' && (
                                        <button onClick={() => handleDelete(company)} className="text-slate-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-all" title="Delete">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
    </div>
  );
}