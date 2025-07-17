import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Heart, MapPin, Calendar, Package, AlertCircle } from 'lucide-react';
import { useDonations } from '../contexts/DonationContext';

const DonorDashboard = () => {
  const { donations } = useDonations();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedUrgency, setSelectedUrgency] = useState('');

  const categories = [
    'Food & Groceries',
    'Clothing & Textiles',
    'Books & Education',
    'Medical Supplies',
    'Toys & Games',
    'Electronics',
    'Furniture',
    'Other'
  ];

  const filteredDonations = donations.filter(donation => {
    const matchesSearch = donation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.ngoName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || donation.category === selectedCategory;
    const matchesUrgency = selectedUrgency === '' || donation.urgency === selectedUrgency;
    return matchesSearch && matchesCategory && matchesUrgency && donation.status === 'active';
  });

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyIcon = (urgency) => {
    if (urgency === 'high') {
      return <AlertCircle className="h-4 w-4 text-red-600" />;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Donor Dashboard</h1>
          <p className="text-gray-600 mt-2">Discover donation opportunities and make a difference</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-500">Available Requests</p>
                <p className="text-2xl font-semibold">{filteredDonations.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-500">Urgent Requests</p>
                <p className="text-2xl font-semibold">
                  {filteredDonations.filter(d => d.urgency === 'high').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-500">NGOs Supported</p>
                <p className="text-2xl font-semibold">
                  {new Set(donations.map(d => d.ngoId)).size}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search donations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={selectedUrgency}
                onChange={(e) => setSelectedUrgency(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Urgency</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Donation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonations.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No donation requests found</p>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </div>
          ) : (
            filteredDonations.map((donation) => (
              <div key={donation.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      {getUrgencyIcon(donation.urgency)}
                      <h3 className="text-lg font-semibold text-gray-900 ml-1">
                        {donation.title}
                      </h3>
                    </div>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(donation.urgency)}`}>
                      {donation.urgency}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">{donation.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Package className="h-4 w-4 mr-2" />
                      <span className="font-medium text-gray-700">{donation.category}</span>
                      <span className="mx-2">•</span>
                      <span>{donation.quantity}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-2" />
                      {donation.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(donation.postedAt).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Posted by</p>
                        <p className="font-medium text-gray-900">{donation.ngoName}</p>
                      </div>
                      <Link
                        to={`/donation/${donation.id}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Call to Action */}
        {filteredDonations.length > 0 && (
          <div className="bg-blue-50 rounded-lg p-8 mt-12 text-center">
            <Heart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Ready to Make a Difference?
            </h2>
            <p className="text-gray-600 mb-6">
              Every donation counts and helps create positive change in communities.
            </p>
            <div className="flex justify-center space-x-4">
              <span className="bg-white px-4 py-2 rounded-lg text-sm font-medium text-gray-700">
                🎯 Direct Impact
              </span>
              <span className="bg-white px-4 py-2 rounded-lg text-sm font-medium text-gray-700">
                ✅ Verified NGOs
              </span>
              <span className="bg-white px-4 py-2 rounded-lg text-sm font-medium text-gray-700">
                💪 Community Support
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorDashboard;