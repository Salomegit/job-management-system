import React from 'react';
import { 
  ArrowLeft,
  MapPin, 
  Building, 
  DollarSign, 
  Calendar,
  User,
  Clock,
  CheckCircle
} from 'lucide-react';

export const JobDetail = ({ job, onBack }) => {
  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center text-gray-600">
              Job not found
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="flex items-center mb-6">
            <button
              onClick={onBack}
              className="mr-4 p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-3xl font-bold text-gray-800">
              Job Details
            </h1>
          </div>

          {/* Job Title and Status */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {job.title}
              </h2>
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center">
                  <Building className="h-5 w-5 mr-2" />
                  <span>{job.company_name}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{job.location}</span>
                </div>
              </div>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${
              job.status === 'active'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {job.status === 'active' ? 'Active' : 'Inactive'}
            </span>
          </div>

          {/* Job Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center text-blue-600 mb-2">
                <DollarSign className="h-5 w-5 mr-2" />
                <span className="font-medium">Salary</span>
              </div>
              <p className="text-lg font-semibold text-gray-900">
                ${job.salary}
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center text-green-600 mb-2">
                <Calendar className="h-5 w-5 mr-2" />
                <span className="font-medium">Posted</span>
              </div>
              <p className="text-lg font-semibold text-gray-900">
                {new Date(job.created_at).toLocaleDateString()}
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center text-purple-600 mb-2">
                <User className="h-5 w-5 mr-2" />
                <span className="font-medium">Job ID</span>
              </div>
              <p className="text-lg font-semibold text-gray-900">
                #{job.id}
              </p>
            </div>
          </div>

          {/* Job Description Section */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-blue-600" />
                Job Description
              </h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 leading-relaxed">
                  {job.description || 'No description provided for this job.'}
                </p>
              </div>
            </div>



            {/* Additional Job Info */}
            <div className="border-t pt-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Additional Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="text-sm">
                    Last updated: {new Date(job.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Building className="h-4 w-4 mr-2" />
                  <span className="text-sm">
                    Company: {job.company_name}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-8 pt-6 border-t">
            <button
              onClick={onBack}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-medium transition-colors"
            >
              Back to Jobs
            </button>
            {job.status === 'active' && (
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors">
                Apply Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};