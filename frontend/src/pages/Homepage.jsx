import React, { useEffect, useState } from 'react';
import { ArrowLeft, Search, Filter, Briefcase, MapPin, DollarSign, Clock, CheckCircle, XCircle } from 'lucide-react';
import { fetchJobs, fetchJobById, fetchJobStats, softDelete } from '../api/jobs';
import  { JobCard }  from '../components/JobCard';
import StatCard from '../components/StatCard';

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [jobDetails, setJobDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);

  const [selectedJobId, setSelectedJobId] = useState(null);
  const [currentView, setCurrentView] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  // const navigate = useNavigate();

  const handleSoftDelete = async (jobId) => {
    try {
      const confirmed = window.confirm('Are you sure you want to deactivate this job?');
      if (!confirmed) return;

      await softDelete(jobId);
      
      setJobs(prevJobs => 
        prevJobs.map(job => 
          job.id === jobId 
            ? { ...job, status: 'inactive' }
            : job
        )
      );

      // Update stats to reflect the change
      setStats(prevStats => ({
        ...prevStats,
        active_jobs: prevStats.active_jobs - 1,
        inactive_jobs: prevStats.inactive_jobs + 1
      }));

      // Show success message
      alert('Job deactivated successfully!');
      
    } catch (error) {
      console.error('Error deactivating job:', error);
      alert('Failed to deactivate job. Please try again.');
    }
  };

  // Load job details when selectedJobId changes
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

  // Load jobs on component mount
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

  // Load stats on component mount
  useEffect(() => {
    const loadStats = async () => {
      try {
        const statsData = await fetchJobStats();
        setStats(statsData);
      } catch (err) {
        console.error('Error loading stats:', err);
      } finally {
        setStatsLoading(false);
      }
    };
    
    loadStats();
  }, []);

  // const handleJobView = (job) => {
  //   setSelectedJobId(job.id);
  //   setCurrentView('detail');
  //   navigate(`/jobs/${job.id}`);
  // };

  const handleBackToList = () => {
    setSelectedJobId(null);
    setCurrentView('list');
  };

  // Fixed filteredJobs - check if job.company exists before calling toLowerCase()
  const filteredJobs = jobs.filter(job => 
    job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <Briefcase className="h-12 w-12 text-blue-500 mb-4" />
          <div className="text-gray-600 text-lg">Loading job opportunities...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (currentView === 'detail') {
    return (
      <JobDetail 
        jobId={selectedJobId} 
        job={jobDetails}
        onBack={handleBackToList}
      />
    );
  }

  return (
    <div className="flex-col items-center justify-center mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Find Your <span className="text-blue-600">Dream Job</span> Today
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Browse through thousands of full-time and part-time jobs near you
        </p>
      </div>
      
      {/* Search and Filter */}
      <div className="mb-8 bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Job title, company, or keywords"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50">
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </button>
        </div>
      </div>
      
      {/* Stats Cards */}
      {!statsLoading && stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={<Briefcase />}
            title="Total Jobs"
            value={stats.total_jobs}
            color="blue"
            iconColor="blue"
          />
          <StatCard
            icon={<CheckCircle />}
            title="Active Jobs"
            value={stats.active_jobs}
            color="green"
            iconColor="green"
          />
          <StatCard
            icon={<XCircle />}
            title="Inactive Jobs"
            value={stats.inactive_jobs}
            color="red"
            iconColor="red"
          />
        </div>
      )}
      
      {/* Stats Loading Skeleton */}
      {statsLoading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-gray-100 p-6 rounded-lg animate-pulse h-24"></div>
          ))}
        </div>
      )}
      
      {/* Job Listings */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Latest Job Openings
          </h2>
          <div className="text-sm text-gray-500">
            Showing {filteredJobs.length} of {jobs.length} jobs
          </div>
        </div>
        
        {filteredJobs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map(job => (
              <JobCard 
                key={job.id} 
                job={job}
                onDelete={handleSoftDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;