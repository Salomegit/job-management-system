import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
// import EditPage from './pages/EditPage';
// import JobForm from './components/JobForm';
// import { createJob } from './api/jobs';
// import { useNavigate } from 'react-router-dom';

// function CreateJobPage() {
//   const navigate = useNavigate();
//   const handleSubmit = async (data) => {
//     await createJob(data);
//     alert("Created successfully!");
//     navigate('/');
//   };
//   return <div className="p-6"><JobForm onSubmit={handleSubmit} /></div>;
// }

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/edit/:id" element={<EditPage />} />
        <Route path="/create" element={<CreateJobPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
