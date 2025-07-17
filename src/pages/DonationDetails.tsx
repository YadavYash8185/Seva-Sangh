import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Package, Phone, Mail, AlertCircle, Heart } from 'lucide-react';
import { useDonations } from '../contexts/DonationContext';
import { useAuth } from '../contexts/AuthContext';

const DonationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { donations } = useDonations();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donationForm, setDonationForm] = useState({
    donorName: user?.name || '',
    donorEmail: user?.email || '',
    donorPhone: user?.phone || '',
    quantity: '',
    message: '',
    donationType: 'full' // full or partial
  });

  const donation = donations.find(d => d.id === parseInt(id));

  if (!donation) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Donation Not Found</h1>
            <button
              onClick={() => navigate('/donor/dashboard')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleDonationSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the donation offer to the NGO
    alert('Your donation offer has been sent to the NGO! They will contact you soon.');
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDonationForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/donor/dashboard')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </button>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">{donation.title}</h1>
                <p className="text-blue-100 text-lg">Posted by {donation.ngoName}</p>
              </div>
              <div className="flex items-center space-x-3">
                {donation.urgency === 'high' && (
                  <AlertCircle className="h-6 w-6 text-red-200" />
                )}
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getUrgencyColor(donation.urgency)}`}>
                  {donation.urgency} priority
                </span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Information */}
              <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">{donation.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center space-x-3">
                    <Package className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      <p className="font-medium">{donation.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Package className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Quantity Needed</p>
                      <p className="font-medium">{donation.quantity}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{donation.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Posted</p>
                      <p className="font-medium">{new Date(donation.postedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                {donation.urgency === 'high' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                      <span className="text-red-800 font-medium">Urgent Need</span>
                    </div>
                    <p className="text-red-700 mt-2">
                      This donation request has been marked as high priority. Your immediate help would make a significant impact.
                    </p>
                  </div>
                )}
              </div>

              {/* NGO Information & Actions */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">NGO Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Organization</p>
                      <p className="font-medium">{donation.ngoName}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{donation.ngoContact}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{donation.contactInfo}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
                  >
                    <Heart className="h-5 w-5 mr-2" />
                    Donate Now
                  </button>
                  <button
                    onClick={() => window.open(`tel:${donation.ngoContact}`, '_self')}
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Call NGO
                  </button>
                  <button
                    onClick={() => window.open(`mailto:${donation.contactInfo}`, '_self')}
                    className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center"
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    Send Email
                  </button>
                </div>

                {/* Impact Message */}
                <div className="bg-blue-50 rounded-lg p-4 mt-6">
                  <h4 className="font-medium text-blue-900 mb-2">Your Impact</h4>
                  <p className="text-sm text-blue-800">
                    Your donation will directly help those in need and make a meaningful difference in the community.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Donation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Make a Donation</h2>
            <form onSubmit={handleDonationSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  name="donorName"
                  value={donationForm.donorName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="donorEmail"
                  value={donationForm.donorEmail}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="donorPhone"
                  value={donationForm.donorPhone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Donation Type
                </label>
                <select
                  name="donationType"
                  value={donationForm.donationType}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="full">Full Donation ({donation.quantity})</option>
                  <option value="partial">Partial Donation</option>
                </select>
              </div>
              {donationForm.donationType === 'partial' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity You Can Donate
                  </label>
                  <input
                    type="text"
                    name="quantity"
                    value={donationForm.quantity}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter quantity"
                    required
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message (Optional)
                </label>
                <textarea
                  name="message"
                  value={donationForm.message}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Any additional message or questions..."
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Send Donation Offer
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationDetails;