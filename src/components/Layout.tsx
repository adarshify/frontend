// src/components/Layout.tsx
import { NavLink, Outlet } from 'react-router-dom';

export default function Layout() {
  const activeClass = "bg-[#1c54b2] text-white shadow-md px-5 py-2 rounded-lg font-semibold transition-colors";
  const inactiveClass = "text-gray-600 hover:text-[#1c54b2] hover:bg-indigo-50 px-5 py-2 rounded-lg font-medium transition-colors";
  
  // Danger button for Admin/Rejected
  const dangerLinkClass = "text-gray-400 hover:text-red-600 hover:bg-red-50 px-5 py-2 rounded-lg font-medium transition-colors ml-auto text-sm";

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation Bar */}
        <nav className="mb-8 bg-white shadow-sm border border-gray-200 rounded-xl p-3 flex flex-wrap gap-2 items-center">
          
          {/* Logo / Home Link */}
          <NavLink to="/" className={({ isActive }) => isActive ? activeClass : inactiveClass}>
            Company Directory
          </NavLink>

          <NavLink to="/add" className={({ isActive }) => isActive ? activeClass : inactiveClass}>
            Add New Job
          </NavLink>
          
          <div className="grow"></div>
          
          <NavLink to="/rejected" className={dangerLinkClass}>
             Admin
          </NavLink>
        </nav>

        {/* Main Content Area */}
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}