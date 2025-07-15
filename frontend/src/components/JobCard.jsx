import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Building,
  DollarSign,
  Calendar,
  Trash2,
  Eye
} from 'lucide-react';

export const JobCard = ({ job, onDelete }) => {
  const navigate = useNavigate(); 

  const handleSoftDelete = () => {
    if (onDelete) {
      onDelete(job.id);
    }
  };


  const handleView = () => {
    navigate(`/jobs/${job.id}`);
  }

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h3>
          <div className="flex items-center text-gray-600 mb-2">
            <Building className="h-4 w-4 mr-2" />
            <span className="text-sm">{job.company_name}</span>
          </div>
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="text-sm">{job.location}</span>
          </div>
          <div className="flex items-center text-gray-600 mb-4">
            <DollarSign className="h-4 w-4 mr-2" />
            <span className="text-sm">${job.salary}</span>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          job.status === 'active'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {job.status === 'active' ? 'Active' : 'Inactive'}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center text-gray-500 text-xs">
          <Calendar className="h-4 w-4 mr-1" />
          {new Date(job.created_at).toLocaleDateString()}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleView}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="View Job Details"
            // onView={onView}
          >
            <Eye className="h-4 w-4" />
          </button>
          {job.status === 'active' && (
            <button
              onClick={handleSoftDelete}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Deactivate Job"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};


