import axios from 'axios';

const API_BASE = 'http://localhost:8000/v1';

export const fetchJobs = async () => {
  try {
    const response = await axios.get(`${API_BASE}/jobs/`);
    if (response.status !== 200) {
      throw new Error('Failed to fetch jobs');
    }
    // console.log('Fetched jobs:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
}
