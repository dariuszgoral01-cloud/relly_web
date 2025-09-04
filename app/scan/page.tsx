'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Scan() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [foundSubscriptions, setFoundSubscriptions] = useState<any[]>([]);
  const [scanPhase, setScanPhase] = useState('preparing');

  useEffect(() => {
    // Auto-start scanning when component mounts
    startScan();
  }, []);

  const startScan = async () => {
    setIsScanning(true);
    setScanProgress(0);
    
    // Simulate scanning phases
    const phases = [
      { name: 'preparing', label: 'Preparing scan...', duration: 1000 },
      { name: 'bank', label: 'Scanning bank transactions...', duration: 3000 },
      { name: 'email', label: 'Analyzing email receipts...', duration: 2500 },
      { name: 'processing', label: 'Processing results...', duration: 1500 },
      { name: 'complete', label: 'Scan complete!', duration: 500 }
    ];

    for (let i = 0; i < phases.length; i++) {
      const phase = phases[i];
      setScanPhase(phase.name);
      
      // Simulate progress within each phase
      const steps = 20;
      for (let step = 0; step <= steps; step++) {
        const progress = ((i * steps + step) / (phases.length * steps)) * 100;
        setScanProgress(progress);
        await new Promise(resolve => setTimeout(resolve, phase.duration / steps));
      }
    }

    // Add found subscriptions
    const mockSubscriptions = [
      { id: 1, name: 'Netflix', amount: 15.99, category: 'Streaming', status: 'active', lastCharged: '2024-01-15' },
      { id: 2, name: 'Spotify Premium', amount: 9.99, category: 'Music', status: 'active', lastCharged: '2024-01-10' },
      { id: 3, name: 'Adobe Creative Cloud', amount: 52.99, category: 'Software', status: 'active', lastCharged: '2024-01-08' },
      { id: 4, name: 'ChatGPT Plus', amount: 20.00, category: 'AI Tools', status: 'active', lastCharged: '2024-01-12' },
      { id: 5, name: 'Dropbox Plus', amount: 11.99, category: 'Cloud Storage', status: 'active', lastCharged: '2024-01-05' },
      { id: 6, name: 'LinkedIn Premium', amount: 29.99, category: 'Professional', status: 'cancelled', lastCharged: '2023-12-15' },
      { id: 7, name: 'Gym Membership', amount: 49.99, category: 'Fitness', status: 'active', lastCharged: '2024-01-01' }
    ];

    setFoundSubscriptions(mockSubscriptions);
    setIsScanning(false);
  };

  const totalFound = foundSubscriptions.length;
  const activeSubscriptions = foundSubscriptions.filter(sub => sub.status === 'active');
  const totalMonthly = activeSubscriptions.reduce((sum, sub) => sum + sub.amount, 0);
  const totalYearly = totalMonthly * 12;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-20">
      {/* Header */}
      <div className="fixed top-0 w-full bg-white/90 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          <Link href="/onboarding" className="w-6 h-6 flex items-center justify-center">
            <i className="ri-arrow-left-line text-xl text-gray-600"></i>
          </Link>
          <div className="font-['Pacifico'] text-xl text-indigo-600">SubSense</div>
          <div className="w-6 h-6"></div>
        </div>
      </div>

      <div className="pt-20 px-6">
        <div className="max-w-md mx-auto">
          
          {isScanning ? (
            // Scanning Phase
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-8 relative">
                <div className="w-32 h-32 rounded-full border-4 border-indigo-100"></div>
                <div 
                  className="absolute top-0 left-0 w-32 h-32 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <i className="ri-search-line text-3xl text-indigo-600"></i>
                </div>
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Scanning Your Subscriptions</h1>
              <p className="text-gray-600 mb-8">
                {scanPhase === 'preparing' && 'Getting ready to scan...'}
                {scanPhase === 'bank' && 'Analyzing your bank transactions...'}
                {scanPhase === 'email' && 'Checking email receipts...'}
                {scanPhase === 'processing' && 'Processing found subscriptions...'}
                {scanPhase === 'complete' && 'Finalizing results...'}
              </p>

              <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">Progress</span>
                  <span className="text-sm text-gray-500">{Math.round(scanProgress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${scanProgress}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-indigo-50 rounded-2xl p-4">
                <p className="text-sm text-indigo-700">
                  <i className="ri-shield-check-line mr-2"></i>
                  Your data is encrypted and secure
                </p>
              </div>
            </div>
          ) : (
            // Results Phase
            <div>
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <i className="ri-check-line text-2xl text-green-600"></i>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Scan Complete!</h1>
                <p className="text-gray-600">Found {totalFound} subscriptions</p>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
                  <div className="text-2xl font-bold text-green-600">${totalMonthly.toFixed(2)}</div>
                  <p className="text-xs text-gray-500">Monthly Total</p>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
                  <div className="text-2xl font-bold text-indigo-600">${totalYearly.toFixed(2)}</div>
                  <p className="text-xs text-gray-500">Yearly Total</p>
                </div>
              </div>

              {/* Found Subscriptions */}
              <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">Found Subscriptions</h3>
                <div className="space-y-3">
                  {foundSubscriptions.slice(0, 5).map(subscription => (
                    <div key={subscription.id} className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${subscription.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        <div>
                          <p className="font-medium text-gray-900">{subscription.name}</p>
                          <p className="text-xs text-gray-500">{subscription.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">${subscription.amount}</p>
                        <p className="text-xs text-gray-500">monthly</p>
                      </div>
                    </div>
                  ))}
                  {foundSubscriptions.length > 5 && (
                    <p className="text-center text-sm text-gray-500 pt-2">
                      +{foundSubscriptions.length - 5} more subscriptions
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link href="/dashboard">
                  <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-semibold hover:bg-indigo-700 transition-colors">
                    View Dashboard
                  </button>
                </Link>
                <Link href="/savings">
                  <button className="w-full bg-green-600 text-white py-4 rounded-2xl font-semibold hover:bg-green-700 transition-colors">
                    Start Saving Money
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}