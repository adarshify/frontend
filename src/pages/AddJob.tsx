import React, { useState } from 'react';
import type { FormEvent } from 'react';

const API_URL = `/api/jobs`;

export default function AddJob() {
  const [formData, setFormData] = useState({
    JobTitle: '', ApplicationURL: '', Company: '', Location: 'Germany',
    Department: '', ContractType: 'Full-time', ExperienceLevel: '',
    PostedDate: '', Description: ''
  });
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // ✅ Added Auth Header
        },
        body: JSON.stringify({ ...formData, GermanRequired: false }) 
      });
      
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      
      setMessage({ type: 'success', text: 'Success! Job added.' });
      setFormData({
        JobTitle: '', ApplicationURL: '', Company: '', Location: 'Germany',
        Department: '', ContractType: 'Full-time', ExperienceLevel: '',
        PostedDate: '', Description: ''
      });
    } catch (err) {
      setMessage({ type: 'error', text: `Error: ${(err as Error).message}` });
    }
  };

  const inputStyle = "mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";
  const labelStyle = "block text-sm font-medium text-slate-700 mb-1";

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 border-b border-slate-100 pb-4 mb-2">
                <h2 className="text-2xl font-bold text-slate-900">Add Manual Job</h2>
                <p className="text-slate-500 text-sm">Manually insert a job into the English-only feed.</p>
            </div>

            <div className="md:col-span-2">
                <label htmlFor="JobTitle" className={labelStyle}>Job Title *</label>
                <input type="text" name="JobTitle" id="JobTitle" value={formData.JobTitle} onChange={handleChange} required className={inputStyle} />
            </div>
            
            <div className="md:col-span-2">
                <label htmlFor="ApplicationURL" className={labelStyle}>Application URL *</label>
                <input type="url" name="ApplicationURL" id="ApplicationURL" value={formData.ApplicationURL} onChange={handleChange} required className={inputStyle} />
            </div>

            <div>
                <label htmlFor="Company" className={labelStyle}>Company *</label>
                <input type="text" name="Company" id="Company" value={formData.Company} onChange={handleChange} required className={inputStyle} />
            </div>

            <div>
                <label htmlFor="Location" className={labelStyle}>Location</label>
                <input type="text" name="Location" id="Location" value={formData.Location} onChange={handleChange} className={inputStyle} />
            </div>

            {/* ... other inputs remain the same ... */}

            <div className="md:col-span-2 flex items-center justify-end pt-4">
                <button type="submit" className="inline-flex justify-center py-2 px-6 border border-transparent shadow-lg text-base font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none transition-all">
                Save Job
                </button>
            </div>

            <div className="md:col-span-2">
                {message && (
                <p className={`mt-4 text-sm font-medium p-3 rounded-md ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message.text}
                </p>
                )}
            </div>
        </form>
    </div>
  );
}