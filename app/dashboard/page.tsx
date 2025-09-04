
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, getUserSubscriptions, signOut } from '../../lib/supabase';
import AuthGuard from '../../components/AuthGuard';
import Link from 'next/link';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          const userSubs = await getUserSubscriptions(currentUser.id);
          setSubscriptions(userSubs);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const totalMonthly = subscriptions.reduce((sum, sub) => {
    if (sub.billing_cycle === 'monthly') return sum + sub.amount;
    if (sub.billing_cycle === 'yearly') return sum + (sub.amount / 12);
    return sum;
  }, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        {/* Mobile Header */}
        <div className="md:hidden">
          <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
            <div className="px-4 py-3 flex items-center justify-between">
              <div className="font-['Pacifico'] text-xl text-indigo-600">SubSense</div>
              <button 
                onClick={() => setMenuOpen(!menuOpen)}
                className="w-8 h-8 flex items-center justify-center text-gray-600"
              >
                <i className={`ri-${menuOpen ? 'close' : 'menu'}-line text-xl`}></i>
              </button>
            </div>
            
            {menuOpen && (
              <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
                <div className="py-4 px-4 space-y-3">
                  <Link href="/profile" className="block text-gray-600 hover:text-indigo-600 transition-colors">
                    Profile
                  </Link>
                  <Link href="/settings" className="block text-gray-600 hover:text-indigo-600 transition-colors">
                    Settings
                  </Link>
                  <button 
                    onClick={handleSignOut}
                    className="w-full text-left text-red-600 hover:text-red-700 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </nav>

          {/* Mobile Main Content */}
          <div className="pt-16 pb-20 px-4">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's your subscription overview.</p>
            </div>

            {/* Mobile Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="text-2xl font-bold text-indigo-600">£{totalMonthly.toFixed(2)}</div>
                <p className="text-sm text-gray-500">Monthly Total</p>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="text-2xl font-bold text-gray-900">{subscriptions.length}</div>
                <p className="text-sm text-gray-500">Active Subscriptions</p>
              </div>
            </div>

            {/* Mobile Subscriptions List */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">Your Subscriptions</h2>
              {subscriptions.length === 0 ? (
                <div className="bg-white rounded-2xl p-6 text-center">
                  <i className="ri-search-line text-4xl text-gray-300 mb-4"></i>
                  <h3 className="font-semibold text-gray-900 mb-2">No subscriptions found</h3>
                  <p className="text-gray-500 mb-4">Connect your accounts to start discovering subscriptions</p>
                  <Link href="/scan">
                    <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-indigo-700 transition-colors">
                      Start Scanning
                    </button>
                  </Link>
                </div>
              ) : (
                subscriptions.map((sub) => (
                  <div key={sub.id} className="bg-white rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                          <i className="ri-apps-line text-indigo-600"></i>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{sub.name}</h3>
                          <p className="text-sm text-gray-500">{sub.provider}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">£{sub.amount}</div>
                        <div className="text-sm text-gray-500">/{sub.billing_cycle}</div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Tablet Layout */}
        <div className="hidden md:block lg:hidden">
          <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="font-['Pacifico'] text-2xl text-indigo-600">SubSense</div>
              <div className="flex items-center gap-6">
                <Link href="/profile" className="text-gray-600 hover:text-indigo-600 transition-colors">
                  Profile
                </Link>
                <button 
                  onClick={handleSignOut}
                  className="text-red-600 hover:text-red-700 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </nav>

          <div className="pt-20 px-6 pb-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-3">Dashboard</h1>
                <p className="text-lg text-gray-600">Welcome back! Here's your subscription overview.</p>
              </div>

              <div className="grid grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="text-3xl font-bold text-indigo-600">£{totalMonthly.toFixed(2)}</div>
                  <p className="text-gray-500">Monthly Total</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="text-3xl font-bold text-gray-900">{subscriptions.length}</div>
                  <p className="text-gray-500">Active Subscriptions</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="text-3xl font-bold text-green-600">£847</div>
                  <p className="text-gray-500">Potential Savings</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="text-3xl font-bold text-yellow-600">3</div>
                  <p className="text-gray-500">Unused This Month</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Subscriptions</h2>
                {subscriptions.length === 0 ? (
                  <div className="text-center py-12">
                    <i className="ri-search-line text-6xl text-gray-300 mb-6"></i>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">No subscriptions found</h3>
                    <p className="text-gray-500 mb-6">Connect your accounts to start discovering subscriptions</p>
                    <Link href="/scan">
                      <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
                        Start Scanning
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {subscriptions.map((sub) => (
                      <div key={sub.id} className="border border-gray-200 rounded-xl p-4 hover:border-indigo-300 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                              <i className="ri-apps-line text-xl text-indigo-600"></i>
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{sub.name}</h3>
                              <p className="text-gray-500">{sub.provider}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-gray-900">£{sub.amount}</div>
                            <div className="text-sm text-gray-500">/{sub.billing_cycle}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
            <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
              <div className="font-['Pacifico'] text-2xl text-indigo-600">SubSense</div>
              <div className="flex items-center gap-8">
                <Link href="/dashboard" className="text-indigo-600 font-medium">
                  Dashboard
                </Link>
                <Link href="/subscriptions" className="text-gray-600 hover:text-indigo-600 transition-colors">
                  Subscriptions
                </Link>
                <Link href="/savings" className="text-gray-600 hover:text-indigo-600 transition-colors">
                  Savings
                </Link>
                <Link href="/profile" className="text-gray-600 hover:text-indigo-600 transition-colors">
                  Profile
                </Link>
                <button 
                  onClick={handleSignOut}
                  className="text-red-600 hover:text-red-700 transition-colors font-medium"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </nav>

          <div className="pt-20 px-8 pb-8">
            <div className="max-w-7xl mx-auto">
              <div className="mb-10">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Dashboard</h1>
                <p className="text-xl text-gray-600">Welcome back! Here's your comprehensive subscription overview.</p>
              </div>

              <div className="grid grid-cols-5 gap-6 mb-10">
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <div className="text-4xl font-bold text-indigo-600 mb-2">£{totalMonthly.toFixed(2)}</div>
                  <p className="text-gray-500 font-medium">Monthly Total</p>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <div className="text-4xl font-bold text-gray-900 mb-2">{subscriptions.length}</div>
                  <p className="text-gray-500 font-medium">Active Subscriptions</p>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <div className="text-4xl font-bold text-green-600 mb-2">£847</div>
                  <p className="text-gray-500 font-medium">Potential Savings</p>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <div className="text-4xl font-bold text-yellow-600 mb-2">3</div>
                  <p className="text-gray-500 font-medium">Unused This Month</p>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
                  <p className="text-gray-500 font-medium">Detection Rate</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm">
                <div className="p-8 border-b border-gray-200">
                  <h2 className="text-2xl font-semibold text-gray-900">Your Subscriptions</h2>
                </div>
                <div className="p-8">
                  {subscriptions.length === 0 ? (
                    <div className="text-center py-16">
                      <i className="ri-search-line text-8xl text-gray-300 mb-8"></i>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-4">No subscriptions found</h3>
                      <p className="text-lg text-gray-500 mb-8">Connect your accounts to start discovering subscriptions automatically</p>
                      <Link href="/scan">
                        <button className="bg-indigo-600 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition-colors">
                          Start Scanning Now
                        </button>
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-6">
                      {subscriptions.map((sub) => (
                        <div key={sub.id} className="border border-gray-200 rounded-xl p-6 hover:border-indigo-300 hover:shadow-md transition-all">
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center">
                              <i className="ri-apps-line text-2xl text-indigo-600"></i>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-bold text-gray-900">£{sub.amount}</div>
                              <div className="text-gray-500">/{sub.billing_cycle}</div>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">{sub.name}</h3>
                            <p className="text-gray-500 mb-3">{sub.provider}</p>
                            <div className="flex items-center justify-between">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                sub.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                              }`}>
                                {sub.status}
                              </span>
                              <button className="text-indigo-600 hover:text-indigo-700 font-medium">
                                Manage
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-200">
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
                <i className="ri-money-pound-circle-line text-lg"></i>
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
    </AuthGuard>
  );
}
