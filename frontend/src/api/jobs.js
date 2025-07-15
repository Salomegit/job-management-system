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

export const fetchJobStats = async () => {
  try {
    const response = await axios.get(`${API_BASE}/jobs/stats/`);
    if (response.status !== 200) {
      throw new Error('Failed to fetch job stats');
    }
    console.log('Fetched job stats:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching job stats:', error);
    throw error;
  }
}

export const softDelete = async (jobId) => {
  try {
    const response = await axios.patch(`${API_BASE}/jobs/${jobId}/delete/`, { status: 'inactive' });
    if (response.status !== 200) {
      throw new Error('Failed to deactivate job');
    }
    console.log('Job deactivated successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deactivating job:', error);
    throw error;
  }
}

export const updateJob = async (jobId, jobData) => {
 try {
    const response = await axios.put(`${API_BASE}/jobs/${jobId}/`, jobData);
    if (response.status !== 200) {
      throw new Error('Failed to update job');
    }
    console.log('Job updated successfully:', response.data);
     return { success: true, data: response.data };
  } catch (error) {
    console.error('Error updating job:', error);
    throw error;
  }

}
