import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Gift, Shield, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: Heart,
      title: 'Direct Impact',
      description: 'Connect directly with NGOs and see exactly how your donations make a difference'
    },
    {
      icon: Users,
      title: 'Trusted Network',
      description: 'All NGOs are verified and registered, ensuring your donations reach the right hands'
    },
    {
      icon: Gift,
      title: 'Material Donations',
      description: 'Donate clothes, food, books, medical supplies, and other essential items'
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Safe and secure platform with transparent donation tracking and receipts'
    }
  ];

  const stats = [
    { number: '500+', label: 'NGOs Connected' },
    { number: '10,000+', label: 'Donors Active' },
    { number: '₹50L+', label: 'Materials Donated' },
    { number: '200+', label: 'Cities Covered' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Bridge the Gap Between 
                <span className="text-blue-200"> Compassion </span>
                and 
                <span className="text-blue-200"> Need</span>
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Connect with verified NGOs and make meaningful material donations that directly impact communities in need.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/donor/auth" 
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center group"
                >
                  Start Donating
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/ngo/auth" 
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center"
                >
                  Register NGO
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <Heart className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Instant Connection</p>
                      <p className="text-sm text-blue-200">Find NGOs near you</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                      <Gift className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Material Donations</p>
                      <p className="text-sm text-blue-200">Books, clothes, food & more</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Verified & Secure</p>
                      <p className="text-sm text-blue-200">All NGOs are verified</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Seva Sangh?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make it easy to donate materials directly to NGOs that need them most, 
              creating a transparent and impactful giving experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of donors and NGOs creating positive change in communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/donor/auth" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Become a Donor
            </Link>
            <Link 
              to="/ngo/auth" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Register Your NGO
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;