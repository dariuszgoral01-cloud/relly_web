
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getCurrentUser, getUserProfile, signOut } from '../../lib/supabase';
import AuthGuard from '../../components/AuthGuard';
import { User } from '@supabase/supabase-js';

interface UserProfile {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  created_at: string;
  updated_at: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          const userProfile = await getUserProfile(currentUser.id);
          setProfile(userProfile);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-4 lg:px-6">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="font-['Pacifico'] text-xl text-gray-900 hidden sm:block">SubSense</span>
              </Link>
            </div>
            
            <div className="hidden lg:flex items-center gap-8">
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">Panel</Link>
              <Link href="/subscriptions" className="text-gray-600 hover:text-gray-900">Subskrypcje</Link>
              <Link href="/savings" className="text-gray-600 hover:text-gray-900">Oszczędności</Link>
              <Link href="/connections" className="text-gray-600 hover:text-gray-900">Połączenia</Link>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleSignOut}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Wyloguj się
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 py-6 lg:px-6 pb-24 lg:pb-6">
          {/* Profile Header */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                <i className="ri-user-3-line text-2xl text-indigo-600"></i>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {profile?.first_name} {profile?.last_name || 'Użytkownik'}
                </h1>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="text-2xl font-bold text-indigo-600 mb-1">23</div>
                <p className="text-sm text-gray-600">Aktywne Subskrypcje</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="text-2xl font-bold text-green-600 mb-1">£156</div>
                <p className="text-sm text-gray-600">Zaoszczędzone Pieniądze</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="text-2xl font-bold text-blue-600 mb-1">8</div>
                <p className="text-sm text-gray-600">Połączone Konta</p>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Ustawienia Konta</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <i className="ri-notification-3-line text-gray-400"></i>
                  <div>
                    <p className="font-medium text-gray-900">Powiadomienia Push</p>
                    <p className="text-sm text-gray-500">Alerty o odnowieniach i lepszych ofertach</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <i className="ri-mail-line text-gray-400"></i>
                  <div>
                    <p className="font-medium text-gray-900">Raporty Email</p>
                    <p className="text-sm text-gray-500">Tygodniowe podsumowania wydatków</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <i className="ri-search-line text-gray-400"></i>
                  <div>
                    <p className="font-medium text-gray-900">Auto-Skanowanie</p>
                    <p className="text-sm text-gray-500">Automatyczne wykrywanie nowych subskrypcji</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <i className="ri-shield-check-line text-gray-400"></i>
                  <div>
                    <p className="font-medium text-gray-900">Udostępnianie Danych</p>
                    <p className="text-sm text-gray-500">Udostępniaj anonimowe dane użytkowania</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Connected Accounts */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Połączone Konta</h2>
              <Link href="/connections" className="text-indigo-600 text-sm font-medium hover:text-indigo-700">
                Zarządzaj
              </Link>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <i className="ri-bank-line text-blue-600"></i>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Lloyds Bank</p>
                    <p className="text-sm text-gray-500">Konto Bieżące •••• 1234</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600">Połączone</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                    <i className="ri-mail-line text-red-600"></i>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Konto Gmail</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600">Połączone</span>
                </div>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-red-200">
            <h2 className="text-xl font-semibold text-red-600 mb-4">Strefa Zagrożenia</h2>
            <p className="text-gray-600 mb-6">
              Te działania nie mogą być cofnięte. Kontynuuj ostrożnie.
            </p>
            
            <div className="space-y-3">
              <button className="w-full bg-red-50 text-red-600 py-3 rounded-xl font-medium hover:bg-red-100 transition-colors">
                Usuń Wszystkie Dane
              </button>
              <button 
                onClick={handleSignOut}
                className="w-full bg-red-600 text-white py-3 rounded-xl font-medium hover:bg-red-700 transition-colors"
              >
                Usuń Konto
              </button>
            </div>
          </div>
        </main>

        {/* Bottom Navigation - Mobile Only */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
          <div className="grid grid-cols-5 gap-1">
            <Link href="/dashboard" className="flex flex-col items-center py-2 text-gray-400">
              <i className="ri-dashboard-3-line text-lg mb-1"></i>
              <span className="text-xs">Panel</span>
            </Link>
            <Link href="/subscriptions" className="flex flex-col items-center py-2 text-gray-400">
              <i className="ri-file-list-3-line text-lg mb-1"></i>
              <span className="text-xs">Subskrypcje</span>
            </Link>
            <Link href="/scan" className="flex flex-col items-center py-2 text-gray-400">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mb-1">
                <i className="ri-search-line text-gray-600 text-sm"></i>
              </div>
              <span className="text-xs">Skanuj</span>
            </Link>
            <Link href="/savings" className="flex flex-col items-center py-2 text-gray-400">
              <i className="ri-money-pound-circle-line text-lg mb-1"></i>
              <span className="text-xs">Oszczędności</span>
            </Link>
            <Link href="/profile" className="flex flex-col items-center py-2 text-indigo-600">
              <i className="ri-user-3-line text-lg mb-1"></i>
              <span className="text-xs font-medium">Profil</span>
            </Link>
          </div>
        </nav>
      </div>
    </AuthGuard>
  );
}
