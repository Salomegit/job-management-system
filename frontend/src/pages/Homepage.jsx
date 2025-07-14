import React, {  useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
import { fetchJobs, fetchJobById } from '../api/jobs';
import { JobCard } from '../components/JobCard';
import { JobDetail } from '../components/JobDetail';

export const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [jobDetails, setJobDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [currentView, setCurrentView] = useState('list'); 

  useEffect(() => {
    const loadJobDetails = async () => {
      if (selectedJobId) {
        try {
          const jobData = await fetchJobById(selectedJobId);
          setJobDetails(jobData);
        } catch (err) {
          setError('Failed to load job details');
          console.error('Error loading job details:', err);
        }
      }
    };

    loadJobDetails();
  }, [selectedJobId]);
  

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        const jobsData = await fetchJobs();
        setJobs(jobsData);
      } catch (err) {
        setError('Failed to load jobs');
        console.error('Error loading jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);



//  handleJobDelete = async (jobId) => {
//     // Add your delete logic here
//     try {
//       // await deleteJob(jobId); // Your delete API call
//       // Update the jobs list by removing the deleted job
//       setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
//     } catch (err) {
//       console.error('Error deleting job:', err);
//     }
//   };

  const handleJobView = (job) => {
    setSelectedJobId(job.id);
    setCurrentView('detail');
  };

  const handleBackToList = () => {
    setSelectedJobId(null);
    setCurrentView('list');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-600">Loading jobs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  // Show job detail view
  if (currentView === 'detail') {
    return (
      <JobDetail 
        jobId={selectedJobId} 
        job={jobDetails}
        onBack={handleBackToList}
      />
    );
  }

  // Show job list view
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Job Listings</h1>
      
      {jobs.length === 0 ? (
        <div className="text-center text-gray-600 py-8">
          No jobs found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map(job => (
            <JobCard 
              key={job.id} 
              job={job}           
            //   onDelete={handleJobDelete}  
              onView={handleJobView}      
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
