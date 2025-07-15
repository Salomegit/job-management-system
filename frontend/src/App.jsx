import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import JobDetailPage from './pages/JobDetailPage';
import JobEditPage from './pages/JobEditPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs/:id" element={<JobDetailPage />} />

        <Route path="/jobs/:id/edit" element={<JobEditPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
