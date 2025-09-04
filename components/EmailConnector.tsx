
'use client';
import { useState } from 'react';

export default function EmailConnector() {
  const [connectedEmails, setConnectedEmails] = useState<any[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectGmail = async () => {
    setIsConnecting(true);
    
    try {
      // Simulate Gmail OAuth flow
      // In production, you'd use Google OAuth
      const mockGmailData = {
        email: 'user@gmail.com',
        provider: 'gmail',
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token'
      };
      
      const response = await fetch('/api/email/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mockGmailData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        setConnectedEmails(prev => [...prev, result.account]);
      }
      
    } catch (error) {
      console.error('Gmail connection error:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const connectOutlook = async () => {
    setIsConnecting(true);
    
    try {
      // Simulate Outlook connection
      const mockOutlookData = {
        email: 'user@outlook.com', 
        provider: 'outlook',
        accessToken: 'mock-access-token'
      };
      
      const response = await fetch('/api/email/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mockOutlookData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        setConnectedEmails(prev => [...prev, result.account]);
      }
      
    } catch (error) {
      console.error('Outlook connection error:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="font-semibold text-gray-900 mb-4">Connected Email Accounts</h3>
      
      {connectedEmails.length === 0 ? (
        <div className="text-center py-4">
          <p className="text-gray-500 mb-4">No email accounts connected</p>
        </div>
      ) : (
        <div className="space-y-3 mb-4">
          {connectedEmails.map((email, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <i className="ri-mail-line text-blue-600"></i>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{email.email}</p>
                  <p className="text-sm text-gray-500 capitalize">{email.provider}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600">Connected</span>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="space-y-3">
        <button
          onClick={connectGmail}
          disabled={isConnecting}
          className="w-full flex items-center justify-center gap-3 bg-red-600 text-white py-3 rounded-xl font-medium hover:bg-red-700 transition-colors disabled:bg-gray-400"
        >
          <i className="ri-google-line"></i>
          Connect Gmail
        </button>
        
        <button
          onClick={connectOutlook}
          disabled={isConnecting}
          className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400"
        >
          <i className="ri-microsoft-line"></i>
          Connect Outlook
        </button>
      </div>
    </div>
  );
}
