
import { EmailAccount } from './database';

export interface EmailSubscriptionData {
  merchantName: string;
  amount: number;
  currency: string;
  billingDate: Date;
  nextBillingDate?: Date;
  planName?: string;
  email: string;
  confidence: number;
}

// Email patterns for subscription detection
const SUBSCRIPTION_EMAIL_PATTERNS = [
  {
    pattern: /receipt.*(\$[\d,]+\.?\d*)/i,
    type: 'receipt'
  },
  {
    pattern: /subscription.*renewed.*(\$[\d,]+\.?\d*)/i,
    type: 'renewal'
  },
  {
    pattern: /your.*(\$[\d,]+\.?\d*).*payment.*processed/i,
    type: 'payment'
  },
  {
    pattern: /billing.*statement.*(\$[\d,]+\.?\d*)/i,
    type: 'billing'
  }
];

const SUBSCRIPTION_MERCHANTS = [
  { name: 'Netflix', domains: ['netflix.com'], keywords: ['netflix'] },
  { name: 'Spotify', domains: ['spotify.com'], keywords: ['spotify'] },
  { name: 'Adobe', domains: ['adobe.com'], keywords: ['adobe', 'creative cloud'] },
  { name: 'Microsoft', domains: ['microsoft.com', 'office.com'], keywords: ['microsoft', 'office 365'] },
  { name: 'Google', domains: ['google.com', 'googleworkspace.com'], keywords: ['google', 'workspace'] },
  { name: 'Apple', domains: ['apple.com'], keywords: ['apple', 'icloud', 'app store'] },
  { name: 'Amazon', domains: ['amazon.com', 'primevideo.com'], keywords: ['amazon', 'prime'] },
  { name: 'Dropbox', domains: ['dropbox.com'], keywords: ['dropbox'] }
];

export class EmailScanner {
  
  static async scanGmailAccount(emailAccount: EmailAccount): Promise<EmailSubscriptionData[]> {
    if (!emailAccount.accessToken) {
      throw new Error('Gmail access token required');
    }

    const subscriptions: EmailSubscriptionData[] = [];
    
    try {
      // Search for subscription-related emails
      const searchQueries = [
        'from:(noreply@netflix.com OR billing@spotify.com OR adobe.com OR microsoft.com)',
        'subject:(receipt OR subscription OR billing OR payment)',
        'body:(subscription renewed OR payment processed OR billing statement)'
      ];

      for (const query of searchQueries) {
        const emails = await this.searchGmailEmails(emailAccount.accessToken, query);
        
        for (const email of emails) {
          const subscriptionData = await this.parseEmailForSubscription(email);
          if (subscriptionData) {
            subscriptions.push(subscriptionData);
          }
        }
      }

      // Remove duplicates and return top confidence matches
      return this.deduplicateSubscriptions(subscriptions);
      
    } catch (error) {
      console.error('Gmail scanning error:', error);
      throw new Error('Failed to scan Gmail account');
    }
  }

  private static async searchGmailEmails(accessToken: string, query: string) {
    const response = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages?q=${encodeURIComponent(query)}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Gmail API request failed');
    }

    const data = await response.json();
    return data.messages || [];
  }

  private static async getGmailMessage(accessToken: string, messageId: string) {
    const response = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch Gmail message');
    }

    return response.json();
  }

  private static async parseEmailForSubscription(emailMessage: any): Promise<EmailSubscriptionData | null> {
    try {
      // Extract email content
      const headers = emailMessage.payload?.headers || [];
      const fromHeader = headers.find((h: any) => h.name === 'From')?.value || '';
      const subjectHeader = headers.find((h: any) => h.name === 'Subject')?.value || '';
      const dateHeader = headers.find((h: any) => h.name === 'Date')?.value || '';
      
      // Get email body
      let bodyText = '';
      if (emailMessage.payload?.parts) {
        for (const part of emailMessage.payload.parts) {
          if (part.mimeType === 'text/plain' && part.body?.data) {
            bodyText += Buffer.from(part.body.data, 'base64').toString();
          }
        }
      } else if (emailMessage.payload?.body?.data) {
        bodyText = Buffer.from(emailMessage.payload.body.data, 'base64').toString();
      }

      const fullContent = `${fromHeader} ${subjectHeader} ${bodyText}`.toLowerCase();

      // Identify merchant
      const merchant = this.identifyMerchant(fromHeader, fullContent);
      if (!merchant) return null;

      // Extract amount
      const amount = this.extractAmount(fullContent);
      if (!amount) return null;

      // Extract currency
      const currency = this.extractCurrency(fullContent) || 'USD';

      // Parse date
      const billingDate = dateHeader ? new Date(dateHeader) : new Date();

      // Calculate confidence
      let confidence = 0.5;
      
      // Known merchant boost
      if (merchant) confidence += 0.3;
      
      // Subscription keywords boost
      if (fullContent.includes('subscription') || fullContent.includes('billing') || fullContent.includes('renewal')) {
        confidence += 0.2;
      }
      
      // Receipt/payment confirmation boost
      if (fullContent.includes('receipt') || fullContent.includes('payment processed')) {
        confidence += 0.2;
      }

      return {
        merchantName: merchant,
        amount,
        currency,
        billingDate,
        email: fromHeader,
        confidence: Math.min(confidence, 1.0)
      };

    } catch (error) {
      console.error('Email parsing error:', error);
      return null;
    }
  }

  private static identifyMerchant(fromEmail: string, content: string): string | null {
    for (const merchant of SUBSCRIPTION_MERCHANTS) {
      // Check domain
      if (merchant.domains.some(domain => fromEmail.toLowerCase().includes(domain))) {
        return merchant.name;
      }
      
      // Check keywords
      if (merchant.keywords.some(keyword => content.includes(keyword))) {
        return merchant.name;
      }
    }
    
    return null;
  }

  private static extractAmount(content: string): number | null {
    const amountPatterns = [
      /\$(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/,
      /(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)\s*(?:usd|dollars?)/i,
      /total.*?(\d+\.\d{2})/i,
      /amount.*?(\d+\.\d{2})/i
    ];

    for (const pattern of amountPatterns) {
      const match = content.match(pattern);
      if (match) {
        return parseFloat(match[1].replace(/,/g, ''));
      }
    }

    return null;
  }

  private static extractCurrency(content: string): string | null {
    if (content.includes('$') || content.includes('usd') || content.includes('dollar')) {
      return 'USD';
    }
    if (content.includes('€') || content.includes('eur') || content.includes('euro')) {
      return 'EUR';
    }
    if (content.includes('£') || content.includes('gbp') || content.includes('pound')) {
      return 'GBP';
    }
    
    return null;
  }

  private static deduplicateSubscriptions(subscriptions: EmailSubscriptionData[]): EmailSubscriptionData[] {
    const uniqueSubscriptions = new Map<string, EmailSubscriptionData>();

    for (const subscription of subscriptions) {
      const key = `${subscription.merchantName}-${subscription.amount}`;
      
      if (!uniqueSubscriptions.has(key) || subscription.confidence > uniqueSubscriptions.get(key)!.confidence) {
        uniqueSubscriptions.set(key, subscription);
      }
    }

    return Array.from(uniqueSubscriptions.values())
      .filter(sub => sub.confidence >= 0.6)
      .sort((a, b) => b.confidence - a.confidence);
  }
}
