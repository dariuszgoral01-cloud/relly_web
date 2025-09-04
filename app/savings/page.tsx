
'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Savings() {
  const [activeTab, setActiveTab] = useState('deals');

  // Better deals data
  const betterDeals = [
    {
      id: 1,
      currentProvider: 'BT Broadband',
      currentAmount: 32.99,
      newProvider: 'Sky Broadband',
      newAmount: 24.99,
      monthlySavings: 8.00,
      yearlySavings: 96.00,
      category: 'Internet',
      confidence: 95,
      features: ['Same speed', 'Better customer service', 'Free installation'],
      icon: 'ri-wifi-line',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      currentProvider: 'EE Mobile',
      currentAmount: 28.00,
      newProvider: 'Three Mobile',
      newAmount: 22.00,
      monthlySavings: 6.00,
      yearlySavings: 72.00,
      category: 'Mobile',
      confidence: 92,
      features: ['More data', 'Same coverage', '5G included'],
      icon: 'ri-smartphone-line',
      color: 'bg-green-500'
    },
    {
      id: 3,
      currentProvider: 'British Gas',
      currentAmount: 89.50,
      newProvider: 'Octopus Energy',
      newAmount: 76.20,
      monthlySavings: 13.30,
      yearlySavings: 159.60,
      category: 'Energy',
      confidence: 88,
      features: ['100% renewable', 'Better app', 'Cheaper rates'],
      icon: 'ri-flashlight-line',
      color: 'bg-yellow-500'
    },
    {
      id: 4,
      currentProvider: 'Sky TV',
      currentAmount: 45.00,
      newProvider: 'NOW TV',
      newAmount: 25.00,
      monthlySavings: 20.00,
      yearlySavings: 240.00,
      category: 'Entertainment',
      confidence: 85,
      features: ['Same content', 'No contract', 'Flexible'],
      icon: 'ri-tv-line',
      color: 'bg-purple-500'
    }
  ];

  // Savings tips
  const savingsTips = [
    {
      id: 1,
      title: 'Cancel unused subscriptions',
      description: 'You have 3 subscriptions you haven\'t used in the last 30 days',
      potential: 47.97,
      action: 'Review subscriptions',
      icon: 'ri-scissors-cut-line',
      color: 'bg-red-500'
    },
    {
      id: 2,
      title: 'Negotiate your mobile contract',
      description: 'Your contract ends in 2 months - perfect time to negotiate',
      potential: 12.00,
      action: 'Call provider',
      icon: 'ri-phone-line',
      color: 'bg-blue-500'
    },
    {
      id: 3,
      title: 'Bundle your services',
      description: 'Save by combining internet and TV with the same provider',
      potential: 18.50,
      action: 'Compare bundles',
      icon: 'ri-stack-line',
      color: 'bg-green-500'
    },
    {
      id: 4,
      title: 'Use cashback apps',
      description: 'Earn money back on your regular shopping at ASDA and Tesco',
      potential: 25.00,
      action: 'Download apps',
      icon: 'ri-money-pound-circle-line',
      color: 'bg-orange-500'
    }
  ];

  const totalPotentialSavings = betterDeals.reduce((sum, deal) => sum + deal.monthlySavings, 0) + 
                                savingsTips.reduce((sum, tip) => sum + tip.potential, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-20">
      {/* Header */}
      <div className="fixed top-0 w-full bg-white/90 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="w-6 h-6 flex items-center justify-center">
            <i className="ri-arrow-left-line text-xl text-gray-600"></i>
          </Link>
          <div className="font-semibold text-gray-900">Savings Hub</div>
          <button className="w-6 h-6 flex items-center justify-center">
            <i className="ri-refresh-line text-xl text-gray-600"></i>
          </button>
        </div>
      </div>

      <div className="pt-20 px-6">
        <div className="max-w-md mx-auto">
          
          {/* Total Savings Potential */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 shadow-sm mb-6 text-white">
            <div className="text-center">
              <h2 className="text-3xl font-bold">£{totalPotentialSavings.toFixed(2)}</h2>
              <p className="text-green-100">Potential Monthly Savings</p>
              <p className="text-sm text-green-200 mt-2">£{(totalPotentialSavings * 12).toFixed(2)} per year</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex bg-white rounded-2xl p-1 shadow-sm mb-6">
            <button 
              onClick={() => setActiveTab('deals')}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'deals' ? 'bg-indigo-600 text-white' : 'text-gray-600'
              }`}
            >
              Better Deals
            </button>
            <button 
              onClick={() => setActiveTab('tips')}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'tips' ? 'bg-indigo-600 text-white' : 'text-gray-600'
              }`}
            >
              Savings Tips
            </button>
          </div>

          {/* Better Deals Tab */}
          {activeTab === 'deals' && (
            <div className="space-y-4">
              {betterDeals.map(deal => (
                <div key={deal.id} className="bg-white rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 ${deal.color} rounded-xl flex items-center justify-center`}>
                      <i className={`${deal.icon} text-xl text-white`}></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{deal.category}</h3>
                      <p className="text-sm text-gray-600">{deal.confidence}% confidence match</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">£{deal.monthlySavings.toFixed(2)}/mo</p>
                      <p className="text-xs text-gray-500">£{deal.yearlySavings.toFixed(2)}/year</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-3 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Current: {deal.currentProvider}</span>
                      <span className="text-sm text-gray-900 line-through">£{deal.currentAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-700 font-medium">Switch to: {deal.newProvider}</span>
                      <span className="text-sm font-bold text-green-700">£{deal.newAmount.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">What you get:</p>
                    <div className="flex flex-wrap gap-2">
                      {deal.features.map((feature, index) => (
                        <span key={index} className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-xl text-sm font-medium hover:bg-green-700 transition-colors">
                      Switch Now
                    </button>
                    <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Savings Tips Tab */}
          {activeTab === 'tips' && (
            <div className="space-y-4">
              {savingsTips.map(tip => (
                <div key={tip.id} className="bg-white rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`w-12 h-12 ${tip.color} rounded-xl flex items-center justify-center`}>
                      <i className={`${tip.icon} text-xl text-white`}></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{tip.title}</h3>
                      <p className="text-sm text-gray-600">{tip.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">£{tip.potential.toFixed(2)}</p>
                      <p className="text-xs text-gray-500">potential</p>
                    </div>
                  </div>
                  
                  <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors">
                    {tip.action}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Quick Stats */}
          <div className="bg-white rounded-2xl p-4 shadow-sm mt-6">
            <h3 className="font-semibold text-gray-900 mb-4">Your Savings Progress</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">£127.50</div>
                <p className="text-sm text-gray-500">Saved This Year</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">4</div>
                <p className="text-sm text-gray-500">Deals Completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200">
        <div className="grid grid-cols-5 py-2">
          <Link href="/" className="flex flex-col items-center justify-center py-2 text-gray-400">
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-home-line text-lg"></i>
            </div>
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link href="/dashboard" className="flex flex-col items-center justify-center py-2 text-gray-400">
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-dashboard-line text-lg"></i>
            </div>
            <span className="text-xs mt-1">Dashboard</span>
          </Link>
          <Link href="/scan" className="flex flex-col items-center justify-center py-2 text-gray-400">
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-search-line text-lg"></i>
            </div>
            <span className="text-xs mt-1">Scan</span>
          </Link>
          <Link href="/savings" className="flex flex-col items-center justify-center py-2 text-indigo-600">
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-money-dollar-circle-line text-lg"></i>
            </div>
            <span className="text-xs mt-1">Savings</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center justify-center py-2 text-gray-400">
            <div className="w-6 h-6 flex items-center justify-center">  
              <i className="ri-user-line text-lg"></i>
            </div>
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
