
'use client';
import { useState } from 'react';

export default function BankConnector() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedAccounts, setConnectedAccounts] = useState<any[]>([]);

  const connectBank = async () => {
    setIsConnecting(true);
    
    try {
      // Get link token
      const linkResponse = await fetch('/api/auth/link-bank', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      const { linkToken } = await linkResponse.json();
      
      // Initialize Plaid Link (you'll need to include Plaid Link script)
      // For now, we'll simulate the flow
      
      // Simulate bank selection and connection
      setTimeout(async () => {
        // This would normally come from Plaid Link
        const mockPublicToken = 'public-sandbox-token';
        const mockMetadata = {
          institution: {
            institution_id: 'ins_109508',
            name: 'Chase Bank'
          }
        };
        
        // Exchange public token
        const connectResponse = await fetch('/api/auth/connect-bank', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            publicToken: mockPublicToken,
            metadata: mockMetadata
          })
        });
        
        const result = await connectResponse.json();
        
        if (result.success) {
          setConnectedAccounts(prev => [...prev, result.account]);
        }
        
        setIsConnecting(false);
      }, 2000);
      
    } catch (error) {
      console.error('Bank connection error:', error);
      setIsConnecting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="font-semibold text-gray-900 mb-4">Connected Bank Accounts</h3>
      
      {connectedAccounts.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <i className="ri-bank-line text-2xl text-gray-400"></i>
          </div>
          <p className="text-gray-500 mb-4">No bank accounts connected</p>
          <button
            onClick={connectBank}
            disabled={isConnecting}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
          >
            {isConnecting ? (
              <>
                <i className="ri-loader-4-line animate-spin mr-2"></i>
                Connecting...
              </>
            ) : (
              <>
                <i className="ri-add-line mr-2"></i>
                Connect Bank Account
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {connectedAccounts.map((account, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <i className="ri-bank-line text-indigo-600"></i>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{account.institution}</p>
                  <p className="text-sm text-gray-500">•••• {account.mask}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600">Connected</span>
              </div>
            </div>
          ))}
          
          <button
            onClick={connectBank}
            disabled={isConnecting}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
          >
            <i className="ri-add-line mr-2"></i>
            Add Another Account
          </button>
        </div>
      )}
    </div>
  );
}
