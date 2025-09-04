'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedMethods, setSelectedMethods] = useState<string[]>([]);

  const handleMethodSelect = (method: string) => {
    setSelectedMethods(prev => 
      prev.includes(method) 
        ? prev.filter(m => m !== method)
        : [...prev, method]
    );
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-20">
      {/* Header */}
      <div className="fixed top-0 w-full bg-white/90 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          <Link href="/" className="w-6 h-6 flex items-center justify-center">
            <i className="ri-arrow-left-line text-xl text-gray-600"></i>
          </Link>
          <div className="font-['Pacifico'] text-xl text-indigo-600">SubSense</div>
          <div className="w-6 h-6"></div>
        </div>
      </div>

      <div className="pt-20 px-6">
        {/* Progress Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Step {currentStep} of 3</span>
            <span className="text-sm text-gray-500">{Math.round((currentStep / 3) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="max-w-md mx-auto">
          {/* Step 1: Welcome */}
          {currentStep === 1 && (
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-indigo-100 rounded-full flex items-center justify-center">
                <i className="ri-rocket-line text-3xl text-indigo-600"></i>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome to SubSense!</h1>
              <p className="text-gray-600 mb-8">
                Let's find all your subscriptions and start saving money. This will only take 2 minutes.
              </p>
              
              <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">What we'll help you with:</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <i className="ri-check-line text-green-600"></i>
                    <span className="text-sm text-gray-600">Find hidden subscriptions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="ri-check-line text-green-600"></i>
                    <span className="text-sm text-gray-600">Calculate potential savings</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="ri-check-line text-green-600"></i>
                    <span className="text-sm text-gray-600">Cancel unwanted services</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="ri-check-line text-green-600"></i>
                    <span className="text-sm text-gray-600">Get better deals</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={nextStep}
                className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-indigo-700 transition-colors"
              >
                Let's Get Started
              </button>
            </div>
          )}

          {/* Step 2: Connection Methods */}
          {currentStep === 2 && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center">How should we scan?</h1>
              <p className="text-gray-600 mb-8 text-center">
                Choose how you'd like us to find your subscriptions. You can select multiple methods.
              </p>
              
              <div className="space-y-4 mb-8">
                <div 
                  onClick={() => handleMethodSelect('bank')}
                  className={`bg-white rounded-2xl p-6 shadow-sm border-2 transition-all cursor-pointer ${
                    selectedMethods.includes('bank') ? 'border-indigo-600 bg-indigo-50' : 'border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <i className="ri-bank-line text-xl text-green-600"></i>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">Bank Connection</h3>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedMethods.includes('bank') ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'
                        }`}>
                          {selectedMethods.includes('bank') && <i className="ri-check-line text-xs text-white"></i>}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">Most accurate method. Securely connect your bank account.</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Recommended</span>
                        <span className="text-xs text-gray-500">256-bit encryption</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => handleMethodSelect('email')}
                  className={`bg-white rounded-2xl p-6 shadow-sm border-2 transition-all cursor-pointer ${
                    selectedMethods.includes('email') ? 'border-indigo-600 bg-indigo-50' : 'border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <i className="ri-mail-line text-xl text-blue-600"></i>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">Email Scan</h3>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedMethods.includes('email') ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'
                        }`}>
                          {selectedMethods.includes('email') && <i className="ri-check-line text-xs text-white"></i>}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">Scan your email for subscription receipts and confirmations.</p>
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => handleMethodSelect('manual')}
                  className={`bg-white rounded-2xl p-6 shadow-sm border-2 transition-all cursor-pointer ${
                    selectedMethods.includes('manual') ? 'border-indigo-600 bg-indigo-50' : 'border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <i className="ri-add-line text-xl text-purple-600"></i>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">Manual Entry</h3>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedMethods.includes('manual') ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'
                        }`}>
                          {selectedMethods.includes('manual') && <i className="ri-check-line text-xs text-white"></i>}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">Add subscriptions manually that you remember.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={prevStep}
                  className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-2xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Back
                </button>
                <button 
                  onClick={nextStep}
                  disabled={selectedMethods.length === 0}
                  className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Ready to Scan */}
          {currentStep === 3 && (
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                <i className="ri-shield-check-line text-3xl text-green-600"></i>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Ready to Scan!</h1>
              <p className="text-gray-600 mb-8">
                We'll use {selectedMethods.length} method{selectedMethods.length > 1 ? 's' : ''} to find all your subscriptions safely and securely.
              </p>
              
              <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">Selected scan methods:</h3>
                <div className="space-y-3">
                  {selectedMethods.includes('bank') && (
                    <div className="flex items-center gap-3">
                      <i className="ri-bank-line text-green-600"></i>
                      <span className="text-sm text-gray-600">Bank Connection</span>
                    </div>
                  )}
                  {selectedMethods.includes('email') && (
                    <div className="flex items-center gap-3">
                      <i className="ri-mail-line text-blue-600"></i>
                      <span className="text-sm text-gray-600">Email Scan</span>
                    </div>
                  )}
                  {selectedMethods.includes('manual') && (
                    <div className="flex items-center gap-3">
                      <i className="ri-add-line text-purple-600"></i>
                      <span className="text-sm text-gray-600">Manual Entry</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-indigo-50 rounded-2xl p-4 mb-8">
                <div className="flex items-center gap-3">
                  <i className="ri-shield-check-line text-indigo-600"></i>
                  <p className="text-sm text-indigo-700">Your data is encrypted and never stored permanently</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={prevStep}
                  className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-2xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Back
                </button>
                <Link href="/scan" className="flex-1">
                  <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-semibold hover:bg-indigo-700 transition-colors">
                    Start Scanning
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