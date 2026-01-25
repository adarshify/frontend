import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CompanyDirectory from './pages/CompanyDirectory';
import AddJob from './pages/AddJob';
import ReviewQueue from './pages/ReviewQueue';
import RejectedJobs from './pages/RejectedJobs';
import AdminCompanies from './pages/AdminCompanies';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="directory" element={<CompanyDirectory />} />
          <Route path="add" element={<AddJob />} />
          <Route path="review" element={<ReviewQueue />} />
          <Route path="rejected" element={<RejectedJobs />} />
          <Route path="admin/companies" element={<AdminCompanies />} />
          <Route path="jobs" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}