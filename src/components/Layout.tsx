import { Link, Outlet, useLocation } from 'react-router-dom';
import { Briefcase, Lock, Building2 } from 'lucide-react'; // ✅ Import Building2

export default function Layout() {
  const location = useLocation();
  const activeClass = "text-slate-900 font-medium";
  const inactiveClass = "text-slate-500 hover:text-slate-900 font-medium transition-colors";

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
             <div className="bg-blue-600 text-white p-1.5 rounded-lg group-hover:bg-blue-700 transition-colors">
                <Briefcase className="w-5 h-5" />
             </div>
             <span className="text-xl font-bold text-slate-900 tracking-tight">English Jobs in Germany</span>
          </Link>
          
          <div className="flex gap-8 text-sm items-center">
            <Link to="/directory" className={location.pathname === '/directory' ? activeClass : inactiveClass}>
              Companies
            </Link>
            <Link to="/" className={location.pathname === '/' ? activeClass : inactiveClass}>
              Jobs
            </Link>
            
            {/* --- ADMIN AREA --- */}
            <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
                {/* Review Queue Link */}
                <Link to="/review" className="text-slate-300 hover:text-blue-600 transition-colors" title="Review Queue">
                    <Lock className="w-4 h-4" />
                </Link>

                {/* ✅ NEW: Manage Companies Link */}
                <Link to="/admin/companies" className="text-slate-300 hover:text-blue-600 transition-colors" title="Manage Companies">
                    <Building2 className="w-4 h-4" />
                </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>

      <footer className="bg-slate-900 text-slate-400 mt-auto">
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* ... (Footer content stays same) ... */}
          <div>
            <h3 className="text-white font-bold mb-4">English Jobs in Germany</h3>
            <p className="text-sm">A personal project to help international professionals find English-speaking opportunities in Germany.</p>
          </div>
          <div>
            <h3 className="text-white font-bold mt-5 mb-3">Legal</h3>
            <h5>Privacy Policy</h5>
            <h5>Disclaimer</h5>
            <h5>Contacts</h5>
          </div>
          <div>
            <h3 className='text-white font-bold mt-5 mb-3 '>Disclaimer</h3>
            <p>This is a non-commercial project. Jobs link to publicly available listings. We take no reponsibility for hiring outcomes.</p>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-sm text-center">
            © 2026 English Jobs in Germany. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}