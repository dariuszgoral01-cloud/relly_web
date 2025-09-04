
'use client';
import { useState } from 'react';
import Link from 'next/link';

interface ShopDetailProps {
  shopName: string;
}

export default function ShopDetail({ shopName }: ShopDetailProps) {
  const [showAll, setShowAll] = useState(false);
  
  const displayName = shopName.replace('-', ' ').toUpperCase();
  
  // Mock transaction data for the shop
  const transactions = [
    { id: 1, date: '2024-01-29', amount: 23.45, items: 'Milk, Bread, Eggs, Butter', time: '14:32' },
    { id: 2, date: '2024-01-27', amount: 18.67, items: 'Bananas, Apples, Yogurt', time: '16:45' },
    { id: 3, date: '2024-01-25', amount: 34.78, items: 'Chicken, Rice, Vegetables', time: '12:15' },
    { id: 4, date: '2024-01-23', amount: 12.34, items: 'Coffee, Biscuits', time: '09:22' },
    { id: 5, date: '2024-01-21', amount: 45.67, items: 'Weekly Shopping', time: '15:30' },
    { id: 6, date: '2024-01-19', amount: 8.90, items: 'Lunch Meal Deal', time: '13:00' },
    { id: 7, date: '2024-01-17', amount: 56.78, items: 'Groceries & Household', time: '17:45' },
    { id: 8, date: '2024-01-15', amount: 15.23, items: 'Snacks & Drinks', time: '11:30' },
    { id: 9, date: '2024-01-13', amount: 29.87, items: 'Fresh Produce', time: '14:20' },
    { id: 10, date: '2024-01-11', amount: 41.23, items: 'Meat & Fish', time: '16:10' },
    { id: 11, date: '2024-01-09', amount: 19.45, items: 'Dairy Products', time: '10:45' },
    { id: 12, date: '2024-01-07', amount: 33.21, items: 'Cleaning Supplies', time: '13:55' }
  ];

  const displayedTransactions = showAll ? transactions : transactions.slice(0, 10);
  const totalSpent = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  const averageSpend = totalSpent / transactions.length;
  const mostRecentVisit = transactions[0].date;
  
  const shopIcon = displayName === 'ASDA' ? 'ri-shopping-cart-line' : 'ri-store-line';
  const shopColor = displayName === 'ASDA' ? 'bg-green-500' : 'bg-blue-500';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-20">
      {/* Header */}
      <div className="fixed top-0 w-full bg-white/90 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="w-6 h-6 flex items-center justify-center">
            <i className="ri-arrow-left-line text-xl text-gray-600"></i>
          </Link>
          <div className="font-semibold text-gray-900">{displayName} Spending</div>
          <button className="w-6 h-6 flex items-center justify-center">
            <i className="ri-more-line text-xl text-gray-600"></i>
          </button>
        </div>
      </div>

      <div className="pt-20 px-6">
        <div className="max-w-md mx-auto">
          
          {/* Shop Summary */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-16 h-16 ${shopColor} rounded-2xl flex items-center justify-center`}>
                <i className={`${shopIcon} text-3xl text-white`}></i>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{displayName}</h1>
                <p className="text-gray-600">Grocery Store</p>
                <p className="text-sm text-gray-500">Last visit: {new Date(mostRecentVisit).toLocaleDateString('en-GB')}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 bg-gray-50 rounded-xl p-4">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">£{totalSpent.toFixed(2)}</div>
                <p className="text-xs text-gray-500">Total Spent</p>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-indigo-600">{transactions.length}</div>
                <p className="text-xs text-gray-500">Visits</p>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">£{averageSpend.toFixed(2)}</div>
                <p className="text-xs text-gray-500">Average</p>
              </div>
            </div>
          </div>

          {/* Spending Insights */}
          <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Spending Insights</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Most frequent day</span>
                <span className="font-medium text-gray-900">Saturday</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Preferred time</span>
                <span className="font-medium text-gray-900">Afternoon</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Monthly trend</span>
                <span className="font-medium text-green-600">↗ +12%</span>
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Transaction History</h3>
              <span className="text-sm text-gray-500">
                Showing {displayedTransactions.length} of {transactions.length}
              </span>
            </div>
            
            <div className="space-y-3">
              {displayedTransactions.map(transaction => (
                <div key={transaction.id} className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <i className="ri-receipt-line text-gray-600"></i>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">£{transaction.amount.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(transaction.date).toLocaleDateString('en-GB')} at {transaction.time}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 ml-13">{transaction.items}</p>
                </div>
              ))}
            </div>
            
            {!showAll && transactions.length > 10 && (
              <button 
                onClick={() => setShowAll(true)}
                className="w-full mt-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                Show All {transactions.length} Transactions
              </button>
            )}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <button className="bg-indigo-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-indigo-700 transition-colors">
              <i className="ri-line-chart-line mr-2"></i>
              View Analytics
            </button>
            <button className="bg-green-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-green-700 transition-colors">
              <i className="ri-gift-line mr-2"></i>
              Find Deals
            </button>
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
