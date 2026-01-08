// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard'; // This is your Job List
import CompanyDirectory from './pages/CompanyDirectory'; // New Page
import AddJob from './pages/AddJob';
import RejectedJobs from './pages/RejectedJobs';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Main Entry is now Directory */}
          <Route index element={<CompanyDirectory />} /> 
          
          {/* Detailed Job List */}
          <Route path="jobs" element={<Dashboard />} />
          
          <Route path="add" element={<AddJob />} />
          <Route path="rejected" element={<RejectedJobs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}