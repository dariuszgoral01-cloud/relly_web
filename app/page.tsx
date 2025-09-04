
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        
        if (currentUser) {
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (user) {
    return null; // Will redirect to dashboard
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Mobile Navigation */}
      <nav className="md:hidden fixed top-0 w-full bg-white/90 backdrop-blur-sm border-b border-gray-200 z-50">
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
              <Link href="#features" className="block text-gray-600 hover:text-indigo-600 transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="block text-gray-600 hover:text-indigo-600 transition-colors">
                Pricing
              </Link>
              <Link href="/auth">
                <button className="w-full bg-indigo-600 text-white py-2 rounded-full font-medium hover:bg-indigo-700 transition-colors">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Tablet Navigation */}
      <nav className="hidden md:block lg:hidden fixed top-0 w-full bg-white/90 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="font-['Pacifico'] text-2xl text-indigo-600">SubSense</div>
          <div className="flex items-center gap-6">
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

      {/* Desktop Navigation */}
      <nav className="hidden lg:block fixed top-0 w-full bg-white/90 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="font-['Pacifico'] text-2xl text-indigo-600">SubSense</div>
          <div className="flex items-center gap-8">
            <Link href="#features" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">
              Features
            </Link>
            <Link href="#pricing" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">
              Pricing
            </Link>
            <Link href="#about" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">
              About
            </Link>
            <Link href="/auth">
              <button className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-colors">
                Get Started Free
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Hero Section */}
      <section className="md:hidden pt-20 pb-16 px-4">
        <div className="max-w-sm mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
            Take Control of Your
            <span className="text-indigo-600"> Subscriptions</span>
          </h1>
          <p className="text-base text-gray-600 mb-6">
            Detect, analyse, cancel & optimise all your subscriptions in one place. Save money effortlessly.
          </p>
          <div className="space-y-3 mb-8">
            <Link href="/auth">
              <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-indigo-700 transition-colors">
                Start Free Scan
              </button>
            </Link>
            <p className="text-sm text-gray-500">No credit card required • Instant results</p>
          </div>
          
          <div className="relative mb-8">
            <div className="w-48 h-96 mx-auto bg-gray-900 rounded-3xl p-2 shadow-2xl">
              <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-4 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                  <div className="text-white text-xs font-medium">SubSense</div>
                  <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                </div>
                <div className="flex-1 space-y-3">
                  <div className="bg-white/20 rounded-xl p-3">
                    <div className="text-white text-lg font-bold">£847</div>
                    <div className="text-white/80 text-xs">Total Savings</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white/10 rounded-lg p-2">
                      <div className="text-white text-sm font-semibold">23</div>
                      <div className="text-white/70 text-xs">Active</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-2">
                      <div className="text-white text-sm font-semibold">7</div>
                      <div className="text-white/70 text-xs">Unused</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-white/10 rounded-lg p-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <i className="ri-netflix-fill text-white text-xs"></i>
                      </div>
                      <div className="flex-1">
                        <div className="text-white text-xs">Netflix</div>
                        <div className="text-white/70 text-xs">£12.99/mo</div>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <i className="ri-spotify-fill text-white text-xs"></i>
                      </div>
                      <div className="flex-1">
                        <div className="text-white text-xs">Spotify</div>
                        <div className="text-white/70 text-xs">£9.99/mo</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tablet Hero Section */}
      <section className="hidden md:block lg:hidden pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Take Control of Your
                <span className="text-indigo-600"> Subscriptions</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Detect, analyse, cancel & optimise all your subscriptions in one place. Save money effortlessly with Britain's smartest platform.
              </p>
              <div className="space-y-4 mb-8">
                <Link href="/auth">
                  <button className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-indigo-700 transition-colors">
                    Start Free Scan
                  </button>
                </Link>
                <p className="text-sm text-gray-500">No credit card required • Instant results</p>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">£847</div>
                  <p className="text-xs text-gray-500">Avg Savings</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">95%</div>
                  <p className="text-xs text-gray-500">Detection Rate</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">23</div>
                  <p className="text-xs text-gray-500">Avg Subscriptions</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-64 h-96 bg-gray-900 rounded-3xl p-3 shadow-2xl transform rotate-3">
                <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 flex flex-col">
                  <div className="text-center mb-6">
                    <div className="text-white text-2xl font-bold">£847</div>
                    <div className="text-white/80 text-sm">Monthly Savings</div>
                  </div>
                  <div className="space-y-3 flex-1">
                    <div className="bg-white/20 rounded-xl p-3 flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="text-white font-medium">Netflix</div>
                        <div className="text-white/70 text-sm">£12.99/mo</div>
                      </div>
                    </div>
                    <div className="bg-white/20 rounded-xl p-3 flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="text-white font-medium">Spotify</div>
                        <div className="text-white/70 text-sm">£9.99/mo</div>
                      </div>
                    </div>
                    <div className="bg-white/20 rounded-xl p-3 flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="text-white font-medium">Adobe CC</div>
                        <div className="text-white/70 text-sm">£49.99/mo</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Desktop Hero Section */}
      <section className="hidden lg:block pt-24 pb-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl xl:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Take Control of Your
                <span className="text-indigo-600"> Subscriptions</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Britain's most intelligent subscription management platform. Automatically detect, monitor, and optimise all your subscriptions. Save money, save time, stay in control.
              </p>
              <div className="flex items-center gap-6 mb-10">
                <Link href="/auth">
                  <button className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-semibold text-lg hover:bg-indigo-700 transition-colors shadow-lg">
                    Start Free Scan
                  </button>
                </Link>
                <button className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors flex items-center gap-2">
                  <i className="ri-play-circle-line text-2xl"></i>
                  Watch Demo
                </button>
              </div>
              
              <div className="grid grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">£847</div>
                  <p className="text-sm text-gray-500">Average Savings</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600">95%</div>
                  <p className="text-sm text-gray-500">Detection Rate</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">23</div>
                  <p className="text-sm text-gray-500">Avg Subscriptions</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">50K+</div>
                  <p className="text-sm text-gray-500">Happy Users</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-80 h-96 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 shadow-2xl transform -rotate-6">
                  <div className="text-center mb-8">
                    <div className="text-white text-4xl font-bold">£2,847</div>
                    <div className="text-white/80">Total Saved This Year</div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white/20 rounded-xl p-4 flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                        <i className="ri-netflix-fill text-white text-xl"></i>
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-semibold">Netflix Premium</div>
                        <div className="text-white/70">£15.99/month</div>
                      </div>
                      <div className="text-white/80">
                        <i className="ri-more-2-fill"></i>
                      </div>
                    </div>
                    <div className="bg-white/20 rounded-xl p-4 flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <i className="ri-spotify-fill text-white text-xl"></i>
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-semibold">Spotify Premium</div>
                        <div className="text-white/70">£9.99/month</div>
                      </div>
                      <div className="text-white/80">
                        <i className="ri-more-2-fill"></i>
                      </div>
                    </div>
                    <div className="bg-white/20 rounded-xl p-4 flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                        <i className="ri-microsoft-fill text-white text-xl"></i>
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-semibold">Office 365</div>
                        <div className="text-white/70">£59.99/year</div>
                      </div>
                      <div className="text-white/80">
                        <i className="ri-more-2-fill"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                  <div className="text-center">
                    <div className="text-gray-900 text-xs font-bold">SAVE</div>
                    <div className="text-gray-900 text-lg font-bold">47%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-6">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Average User Savings</h3>
              <div className="text-3xl font-bold text-green-600">£847</div>
              <p className="text-sm text-gray-500">per year</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-xl font-bold text-indigo-600">23</div>
                <p className="text-xs text-gray-500">Avg Subscriptions</p>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-red-500">7</div>
                <p className="text-xs text-gray-500">Forgotten</p>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-600">95%</div>
                <p className="text-xs text-gray-500">Detection Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Responsive */}
      <section id="features" className="py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-sm md:max-w-4xl lg:max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-8 md:mb-12">Everything You Need</h2>
          <div className="space-y-4 md:grid md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4 md:flex-col md:text-center md:gap-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <i className="ri-search-line text-xl md:text-2xl text-indigo-600"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">AI Detection</h3>
                  <p className="text-sm text-gray-600">Automatically find all your subscriptions across banks, emails, and payment methods.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4 md:flex-col md:text-center md:gap-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-xl flex items-center justify-center">
                  <i className="ri-money-pound-circle-line text-xl md:text-2xl text-green-600"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Smart Savings</h3>
                  <p className="text-sm text-gray-600">Get personalised recommendations to reduce costs and find better alternatives.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4 md:flex-col md:text-center md:gap-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-red-100 rounded-xl flex items-center justify-center">
                  <i className="ri-close-circle-line text-xl md:text-2xl text-red-600"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">One-Tap Cancel</h3>
                  <p className="text-sm text-gray-600">Cancel unwanted subscriptions instantly with our automated cancellation system.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4 md:flex-col md:text-center md:gap-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <i className="ri-notification-line text-xl md:text-2xl text-yellow-600"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Smart Alerts</h3>
                  <p className="text-sm text-gray-600">Get notified about price increases, renewal dates, and suspicious charges.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">We Track Everything</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-2xl overflow-hidden bg-gray-100">
                <img 
                  src="https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%20streaming%20service%2C%20Netflix%20and%20entertainment%20apps%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20isolated%20on%20white%20background%2C%20centered%20composition%2C%20playful%20aesthetic&width=100&height=100&seq=stream-icon&orientation=squarish"
                  alt="Streaming"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-gray-600">Streaming</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-2xl overflow-hidden bg-gray-100">
                <img 
                  src="https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%20software%20and%20SaaS%20applications%2C%20productivity%20tools%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20isolated%20on%20white%20background%2C%20centered%20composition%2C%20modern%20tech%20aesthetic&width=100&height=100&seq=saas-icon&orientation=squarish"
                  alt="Software"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-gray-600">Software</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-2xl overflow-hidden bg-gray-100">
                <img 
                  src="https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%20gaming%20console%20and%20controller%2C%20video%20games%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20isolated%20on%20white%20background%2C%20centered%20composition%2C%20playful%20gaming%20aesthetic&width=100&height=100&seq=gaming-icon&orientation=squarish"
                  alt="Gaming"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-gray-600">Gaming</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-2xl overflow-hidden bg-gray-100">
                <img 
                  src="https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%20fitness%20equipment%2C%20gym%20and%20health%20apps%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20isolated%20on%20white%20background%2C%20centered%20composition%2C%20healthy%20lifestyle%20aesthetic&width=100&height=100&seq=fitness-icon&orientation=squarish"
                  alt="Fitness"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-gray-600">Fitness</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-2xl overflow-hidden bg-gray-100">
                <img 
                  src="https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%20cloud%20storage%2C%20digital%20files%20and%20documents%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20isolated%20on%20white%20background%2C%20centered%20composition%2C%20tech%20cloud%20aesthetic&width=100&height=100&seq=cloud-icon&orientation=squarish"
                  alt="Cloud"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-gray-600">Cloud</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-2xl overflow-hidden bg-gray-100">
                <img 
                  src="https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%20delivery%20truck%20and%20food%20delivery%2C%20shipping%20services%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20isolated%20on%20white%20background%2C%20centered%20composition%2C%20delivery%20service%20aesthetic&width=100&height=100&seq=delivery-icon&orientation=squarish"
                  alt="Delivery"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-gray-600">Delivery</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-2xl overflow-hidden bg-gray-100">
                <img 
                  src="https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%20education%20books%20and%20learning%2C%20online%20courses%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20isolated%20on%20white%20background%2C%20centered%20composition%2C%20educational%20aesthetic&width=100&height=100&seq=education-icon&orientation=squarish"
                  alt="Education"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-gray-600">Education</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-2xl overflow-hidden bg-gray-100">
                <img 
                  src="https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%20plus%20sign%20and%20more%20options%2C%20additional%20services%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20isolated%20on%20white%20background%2C%20centered%20composition%2C%20simple%20and%20clean%20aesthetic&width=100&height=100&seq=more-icon&orientation=squarish"
                  alt="More"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-gray-600">& More</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Responsive */}
      <section className="py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-sm md:max-w-2xl lg:max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">Ready to Save Money?</h2>
          <p className="text-gray-600 md:text-lg mb-8">Join thousands who've already taken control of their subscriptions</p>
          <div className="space-y-4 md:space-y-0 md:flex md:justify-center md:gap-4">
            <Link href="/auth">
              <button className="w-full md:w-auto bg-indigo-600 text-white px-8 md:px-10 py-4 rounded-2xl font-semibold text-lg hover:bg-indigo-700 transition-colors">
                Start Your Free Scan
              </button>
            </Link>
          </div>
          <p className="text-xs md:text-sm text-gray-500 mt-4">Free forever • No credit card required</p>
        </div>
      </section>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-200">
        <div className="grid grid-cols-5 py-2">
          <Link href="/" className="flex flex-col items-center justify-center py-2 text-indigo-600">
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
  );
}
