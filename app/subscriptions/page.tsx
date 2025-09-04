'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Subscriptions() {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('amount');

  const subscriptions = [
    { 
      id: 1, 
      name: 'Netflix', 
      amount: 15.99, 
      category: 'Streaming', 
      status: 'active', 
      nextBilling: '2024-02-15',
      provider: 'Netflix Inc.',
      plan: 'Standard',
      icon: 'ri-netflix-fill',
      color: 'bg-red-500'
    },
    { 
      id: 2, 
      name: 'Spotify Premium', 
      amount: 9.99, 
      category: 'Music', 
      status: 'active', 
      nextBilling: '2024-02-10',
      provider: 'Spotify AB',
      plan: 'Individual',
      icon: 'ri-spotify-fill',
      color: 'bg-green-500'
    },
    { 
      id: 3, 
      name: 'Adobe Creative Cloud', 
      amount: 52.99, 
      category: 'Software', 
      status: 'active', 
      nextBilling: '2024-02-08',
      provider: 'Adobe Inc.',
      plan: 'All Apps',
      icon: 'ri-palette-line',
      color: 'bg-red-600'
    },
    { 
      id: 4, 
      name: 'ChatGPT Plus', 
      amount: 20.00, 
      category: 'AI Tools', 
      status: 'active', 
      nextBilling: '2024-02-12',
      provider: 'OpenAI',
      plan: 'Plus',
      icon: 'ri-robot-line',
      color: 'bg-green-600'
    },
    { 
      id: 5, 
      name: 'Dropbox Plus', 
      amount: 11.99, 
      category: 'Cloud', 
      status: 'active', 
      nextBilling: '2024-02-05',
      provider: 'Dropbox Inc.',
      plan: 'Plus 2TB',
      icon: 'ri-cloud-line',
      color: 'bg-blue-500'
    },
    { 
      id: 6, 
      name: 'Gym Membership', 
      amount: 49.99, 
      category: 'Fitness', 
      status: 'active', 
      nextBilling: '2024-02-01',
      provider: 'FitLife Gym',
      plan: 'Premium',
      icon: 'ri-run-line',
      color: 'bg-orange-500'
    },
    { 
      id: 7, 
      name: 'LinkedIn Premium', 
      amount: 29.99, 
      category: 'Professional', 
      status: 'paused', 
      nextBilling: '2024-03-15',
      provider: 'LinkedIn Corp.',
      plan: 'Career',
      icon: 'ri-linkedin-fill',
      color: 'bg-blue-600'
    }
  ];

  const filteredSubscriptions = subscriptions.filter(sub => {
    if (filter === 'all') return true;
    return sub.status === filter;
  });

  const sortedSubscriptions = [...filteredSubscriptions].sort((a, b) => {
    if (sortBy === 'amount') return b.amount - a.amount;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'date') return new Date(a.nextBilling).getTime() - new Date(b.nextBilling).getTime();
    return 0;
  });

  const totalActive = subscriptions.filter(sub => sub.status === 'active').reduce((sum, sub) => sum + sub.amount, 0);
  const totalPaused = subscriptions.filter(sub => sub.status === 'paused').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-20">
      {/* Header */}
      <div className="fixed top-0 w-full bg-white/90 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="w-6 h-6 flex items-center justify-center">
            <i className="ri-arrow-left-line text-xl text-gray-600"></i>
          </Link>
          <div className="font-semibold text-gray-900">All Subscriptions</div>
          <button className="w-6 h-6 flex items-center justify-center">
            <i className="ri-search-line text-xl text-gray-600"></i>
          </button>
        </div>
      </div>

      <div className="pt-20 px-6">
        <div className="max-w-md mx-auto">
          
          {/* Summary */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-xl font-bold text-indigo-600">{subscriptions.length}</div>
                <p className="text-xs text-gray-500">Total</p>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-600">£{totalActive.toFixed(2)}</div>
                <p className="text-xs text-gray-500">Monthly</p>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-orange-600">{totalPaused}</div>
                <p className="text-xs text-gray-500">Paused</p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex bg-white rounded-full p-1 shadow-sm">
              <button 
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === 'all' ? 'bg-indigo-600 text-white' : 'text-gray-600'
                }`}
              >
                All
              </button>
              <button 
                onClick={() => setFilter('active')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === 'active' ? 'bg-indigo-600 text-white' : 'text-gray-600'
                }`}
              >
                Active
              </button>
              <button 
                onClick={() => setFilter('paused')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === 'paused' ? 'bg-indigo-600 text-white' : 'text-gray-600'
                }`}
              >
                Paused
              </button>
            </div>
            
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border-0 rounded-full px-4 py-2 text-sm shadow-sm"
            >
              <option value="amount">Amount</option>
              <option value="name">Name</option>
              <option value="date">Next Bill</option>
            </select>
          </div>

          {/* Subscriptions List */}
          <div className="space-y-3">
            {sortedSubscriptions.map(subscription => (
              <div key={subscription.id} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${subscription.color} rounded-xl flex items-center justify-center`}>
                    <i className={`${subscription.icon} text-xl text-white`}></i>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900">{subscription.name}</h3>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">£{subscription.amount}</p>
                        <p className="text-xs text-gray-500">monthly</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">{subscription.plan}</p>
                        <p className="text-xs text-gray-500">{subscription.provider}</p>
                      </div>
                      <div className="text-right">
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                          subscription.status === 'active' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            subscription.status === 'active' ? 'bg-green-500' : 'bg-orange-500'
                          }`}></div>
                          {subscription.status}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Next: {new Date(subscription.nextBilling).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-3 mt-4">
                  <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors">
                    Manage
                  </button>
                  {subscription.status === 'active' ? (
                    <button className="flex-1 bg-orange-100 text-orange-700 py-2 px-4 rounded-xl text-sm font-medium hover:bg-orange-200 transition-colors">
                      Pause
                    </button>
                  ) : (
                    <button className="flex-1 bg-green-100 text-green-700 py-2 px-4 rounded-xl text-sm font-medium hover:bg-green-200 transition-colors">
                      Resume
                    </button>
                  )}
                  <button className="flex-1 bg-red-100 text-red-700 py-2 px-4 rounded-xl text-sm font-medium hover:bg-red-200 transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add New Subscription */}
          <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-semibold mt-6 hover:bg-indigo-700 transition-colors">
            <i className="ri-add-line mr-2"></i>
            Add Subscription
          </button>
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
          <Link href="/dashboard" className="flex flex-col items-center justify-center py-2 text-indigo-600">
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
          <Link href="/savings" className="flex flex-col items-center justify-center py-2 text-gray-400">
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