
'use client';
import Link from 'next/link';
import BankConnector from '@/components/BankConnector';
import EmailConnector from '@/components/EmailConnector';

export default function Connections() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-20">
      {/* Header */}
      <div className="fixed top-0 w-full bg-white/90 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          <Link href="/profile" className="w-6 h-6 flex items-center justify-center">
            <i className="ri-arrow-left-line text-xl text-gray-600"></i>
          </Link>
          <div className="font-semibold text-gray-900">Account Connections</div>
          <div className="w-6 h-6"></div>
        </div>
      </div>

      <div className="pt-20 px-6">
        <div className="max-w-md mx-auto space-y-6">
          
          {/* Connection Status */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-semibold text-gray-900 mb-4">Connection Status</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <div className="w-8 h-8 mx-auto mb-2 bg-green-100 rounded-full flex items-center justify-center">
                  <i className="ri-bank-line text-green-600"></i>
                </div>
                <p className="text-sm font-medium text-green-700">Banks</p>
                <p className="text-xs text-green-600">2 Connected</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <div className="w-8 h-8 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center">
                  <i className="ri-mail-line text-blue-600"></i>
                </div>
                <p className="text-sm font-medium text-blue-700">Emails</p>
                <p className="text-xs text-blue-600">1 Connected</p>
              </div>
            </div>
          </div>

          {/* Bank Accounts */}
          <BankConnector />

          {/* Email Accounts */}
          <EmailConnector />

          {/* Security Notice */}
          <div className="bg-indigo-50 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <i className="ri-shield-check-line text-indigo-600 mt-1"></i>
              <div>
                <h3 className="font-medium text-indigo-900 mb-1">Your Data is Secure</h3>
                <p className="text-sm text-indigo-700">
                  We use 256-bit encryption and never store your banking credentials. 
                  All connections are read-only for transaction analysis only.
                </p>
              </div>
            </div>
          </div>

          {/* Manual Entry Option */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Manual Entry</h3>
            <p className="text-gray-600 mb-4">
              Prefer not to connect accounts? You can manually add subscriptions.
            </p>
            <Link href="/subscriptions/add">
              <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                <i className="ri-add-line mr-2"></i>
                Add Subscription Manually
              </button>
            </Link>
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
          <Link href="/savings" className="flex flex-col items-center justify-center py-2 text-gray-400">
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-money-dollar-circle-line text-lg"></i>
            </div>
            <span className="text-xs mt-1">Savings</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center justify-center py-2 text-indigo-600">
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
