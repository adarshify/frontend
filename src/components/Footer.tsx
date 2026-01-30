import { Link } from 'react-router-dom';
import { Briefcase } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 group mb-4">
               <div className="bg-blue-600 text-white p-1.5 rounded-lg">
                  <Briefcase className="w-5 h-5" />
               </div>
               <span className="text-xl font-bold text-white tracking-tight">English Jobs</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm">
              A personal non-commercial project helping international professionals find English-speaking opportunities in Germany.
            </p>
          </div>

          {/* Links Column 1 */}
          <div>
            <h3 className="text-white font-bold mb-4">Project</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Job Feed</Link></li>
              <li><Link to="/directory" className="hover:text-white transition-colors">Company Directory</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h3 className="text-white font-bold mb-4">Legal & Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/legal" className="hover:text-white transition-colors">Legal Information</Link></li>
              <li><Link to="/legal" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              {/* Removed specific email, linking to Legal page contact section instead */}
              <li><Link to="/legal" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Section */}
        <div className="border-t border-slate-800 pt-8 mt-8">
            <div className="bg-slate-800/50 p-4 rounded-lg mb-6">
                <p className="text-xs text-slate-500 text-center leading-relaxed">
                    <strong>Disclaimer:</strong> We are not responsible for hiring decisions. This site is an aggregator and does not represent any of the companies listed. All job listings link to external sources. We do not guarantee the accuracy of language requirements, as these are determined by an automated AI system and may change. Please verify details directly with the employer.
                </p>
            </div>
            
            <div className="text-center text-sm text-slate-600">
                &copy; {currentYear} English Jobs in Germany. All rights reserved.
            </div>
        </div>
      </div>
    </footer>
  );
}