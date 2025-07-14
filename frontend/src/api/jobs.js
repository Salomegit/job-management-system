import axios from 'axios';

const API_BASE = 'http://localhost:8000/v1';

export const fetchJobs = async () => {
  try {
    const response = await axios.get(`${API_BASE}/jobs/`);
    if (response.status !== 200) {
      throw new Error('Failed to fetch jobs');
    }
    console.log('Fetched jobs list:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
}

export const fetchJobById = async (jobId) => {
    try {
        const response = await axios.get(`${API_BASE}/jobs/${jobId}/`);
        console.log('Fetched job details:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Error fetching job details:', error.response?.data || error.message);
        throw error;
    }
};


