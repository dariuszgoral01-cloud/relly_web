
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, signUp } from '../../lib/supabase';
import Link from 'next/link';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await signIn(email, password);
        router.push('/dashboard');
      } else {
        await signUp(email, password, firstName, lastName);
        router.push('/onboarding');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Mobile Header */}
      <div className="lg:hidden">
        <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm border-b border-gray-200 z-50">
          <div className="px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-['Pacifico'] text-xl text-indigo-600">
              SubSense
            </Link>
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-8 h-8 flex items-center justify-center text-gray-600"
            >
              <i className={`ri-${menuOpen ? 'close' : 'menu'}-line text-xl`}></i>
            </button>
          </div>
          
          {/* Mobile Menu */}
          {menuOpen && (
            <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
              <div className="py-4 px-4 space-y-3">
                <Link href="/" className="block text-gray-600 hover:text-indigo-600 transition-colors">
                  Home
                </Link>
                <Link href="#features" className="block text-gray-600 hover:text-indigo-600 transition-colors">
                  Features
                </Link>
                <Link href="#pricing" className="block text-gray-600 hover:text-indigo-600 transition-colors">
                  Pricing
                </Link>
              </div>
            </div>
          )}
        </nav>
      </div>

      {/* Tablet/Desktop Header */}
      <div className="hidden lg:block">
        <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm border-b border-gray-200 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="font-['Pacifico'] text-2xl text-indigo-600">
              SubSense
            </Link>
            <div className="flex items-center gap-8">
              <Link href="/" className="text-gray-600 hover:text-indigo-600 transition-colors">
                Home
              </Link>
              <Link href="#features" className="text-gray-600 hover:text-indigo-600 transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="text-gray-600 hover:text-indigo-600 transition-colors">
                Pricing
              </Link>
              <Link href="/auth">
                <button className="bg-indigo-600 text-white px-6 py-2 rounded-full font-medium hover:bg-indigo-700 transition-colors">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex min-h-screen">
        {/* Left Side - Desktop/Tablet Only */}
        <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 bg-gradient-to-br from-indigo-600 to-purple-700 items-center justify-center p-8 xl:p-12">
          <div className="max-w-lg text-center text-white">
            <h1 className="text-4xl xl:text-5xl font-bold mb-6">
              Take Control of Your Subscriptions
            </h1>
            <p className="text-xl xl:text-2xl text-indigo-100 mb-8">
              Automatically detect, analyse, and optimise all your subscriptions in one place
            </p>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold">£847</div>
                <div className="text-indigo-200 text-sm">Average Savings</div>
              </div>
              <div>
                <div className="text-3xl font-bold">95%</div>
                <div className="text-indigo-200 text-sm">Detection Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold">23</div>
                <div className="text-indigo-200 text-sm">Avg Subscriptions</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-4 lg:p-8">
          <div className="w-full max-w-md">
            {/* Mobile Hero - Mobile Only */}
            <div className="lg:hidden text-center mb-8 pt-20">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome to SubSense
              </h1>
              <p className="text-gray-600 mb-6">
                Smart subscription management for everyone
              </p>
            </div>

            {/* Auth Card */}
            <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8">
              <div className="text-center mb-6 lg:mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  {isLogin ? 'Sign In' : 'Create Account'}
                </h2>
                <p className="text-gray-600">
                  {isLogin ? 'Welcome back to SubSense' : 'Join thousands saving money'}
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
                {!isLogin && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-4 py-3 lg:py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base"
                        required={!isLogin}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-4 py-3 lg:py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 lg:py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base"
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 lg:py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base"
                    required
                    minLength={6}
                    placeholder="Minimum 6 characters"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-600 text-white py-3 lg:py-4 rounded-xl font-semibold text-base hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <i className="ri-loader-4-line animate-spin mr-2"></i>
                      {isLogin ? 'Signing In...' : 'Creating Account...'}
                    </div>
                  ) : (
                    isLogin ? 'Sign In to SubSense' : 'Create Your Account'
                  )}
                </button>
              </form>

              <div className="mt-6 lg:mt-8 text-center">
                <p className="text-gray-600 mb-2">
                  {isLogin ? "Don't have an account?" : 'Already have an account?'}
                </p>
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError('');
                    setEmail('');
                    setPassword('');
                    setFirstName('');
                    setLastName('');
                  }}
                  className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
                >
                  {isLogin ? 'Create Account Instead' : 'Sign In Instead'}
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 lg:mt-8 pt-6 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-500 mb-3">Trusted by thousands across the UK</p>
                <div className="flex justify-center items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <i className="ri-shield-check-line"></i>
                    Bank-grade security
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="ri-lock-line"></i>
                    256-bit encryption
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile CTA - Mobile Only */}
            <div className="lg:hidden mt-8 text-center">
              <p className="text-sm text-gray-500">
                Free forever • No credit card required
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
