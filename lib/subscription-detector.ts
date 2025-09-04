
import { Transaction, Subscription } from './database';

// Common subscription keywords and patterns
const SUBSCRIPTION_KEYWORDS = [
  'netflix', 'spotify', 'apple music', 'amazon prime', 'hulu', 'disney',
  'adobe', 'microsoft', 'google', 'dropbox', 'slack', 'zoom',
  'gym', 'fitness', 'subscription', 'monthly', 'annual',
  'premium', 'plus', 'pro', 'membership'
];

const RECURRING_MERCHANTS = [
  'NETFLIX.COM', 'SPOTIFY', 'APPLE.COM/BILL', 'AMAZON PRIME',
  'ADOBE', 'MICROSOFT', 'GOOGLE', 'DROPBOX', 'SLACK',
  'ZOOM.US', 'PAYPAL', 'STRIPE'
];

export interface DetectedSubscription {
  merchantName: string;
  amount: number;
  frequency: 'monthly' | 'yearly' | 'weekly';
  lastSeen: Date;
  transactionCount: number;
  confidence: number;
  category: string;
}

export class SubscriptionDetector {
  
  static detectFromTransactions(transactions: Transaction[]): DetectedSubscription[] {
    const merchantGroups = this.groupTransactionsByMerchant(transactions);
    const detectedSubscriptions: DetectedSubscription[] = [];

    for (const [merchantName, merchantTransactions] of merchantGroups) {
      const detection = this.analyzeTransactionPattern(merchantName, merchantTransactions);
      if (detection) {
        detectedSubscriptions.push(detection);
      }
    }

    return detectedSubscriptions.sort((a, b) => b.confidence - a.confidence);
  }

  private static groupTransactionsByMerchant(transactions: Transaction[]): Map<string, Transaction[]> {
    const groups = new Map<string, Transaction[]>();
    
    for (const transaction of transactions) {
      const merchantName = this.normalizeMerchantName(transaction.merchantName || transaction.description);
      
      if (!groups.has(merchantName)) {
        groups.set(merchantName, []);
      }
      groups.get(merchantName)!.push(transaction);
    }

    return groups;
  }

  private static analyzeTransactionPattern(merchantName: string, transactions: Transaction[]): DetectedSubscription | null {
    if (transactions.length < 2) return null;

    // Sort by date
    transactions.sort((a, b) => a.date.getTime() - b.date.getTime());

    // Check for recurring patterns
    const amounts = transactions.map(t => Math.abs(t.amount));
    const uniqueAmounts = [...new Set(amounts)];
    
    // Must have consistent amounts (allow for small variations)
    if (uniqueAmounts.length > 2) return null;

    const avgAmount = amounts.reduce((sum, amt) => sum + amt, 0) / amounts.length;
    
    // Calculate intervals between transactions
    const intervals: number[] = [];
    for (let i = 1; i < transactions.length; i++) {
      const daysDiff = Math.round((transactions[i].date.getTime() - transactions[i-1].date.getTime()) / (1000 * 60 * 60 * 24));
      intervals.push(daysDiff);
    }

    // Determine frequency
    const avgInterval = intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length;
    let frequency: 'monthly' | 'yearly' | 'weekly';
    
    if (avgInterval >= 350 && avgInterval <= 380) {
      frequency = 'yearly';
    } else if (avgInterval >= 28 && avgInterval <= 32) {
      frequency = 'monthly';
    } else if (avgInterval >= 6 && avgInterval <= 8) {
      frequency = 'weekly';
    } else {
      return null; // Not a clear recurring pattern
    }

    // Calculate confidence score
    let confidence = 0.5;
    
    // Boost confidence for known subscription merchants
    if (RECURRING_MERCHANTS.some(merchant => merchantName.toLowerCase().includes(merchant.toLowerCase()))) {
      confidence += 0.3;
    }
    
    // Boost confidence for subscription keywords
    if (SUBSCRIPTION_KEYWORDS.some(keyword => merchantName.toLowerCase().includes(keyword))) {
      confidence += 0.2;
    }
    
    // Boost confidence for consistent amounts
    const amountVariation = Math.max(...amounts) - Math.min(...amounts);
    if (amountVariation < avgAmount * 0.1) {
      confidence += 0.2;
    }
    
    // Boost confidence for regular intervals
    const intervalVariation = Math.max(...intervals) - Math.min(...intervals);
    if (intervalVariation <= 3) {
      confidence += 0.2;
    }

    // Must meet minimum confidence threshold
    if (confidence < 0.6) return null;

    return {
      merchantName,
      amount: avgAmount,
      frequency,
      lastSeen: transactions[transactions.length - 1].date,
      transactionCount: transactions.length,
      confidence: Math.min(confidence, 1.0),
      category: this.categorizeSubscription(merchantName)
    };
  }

  private static normalizeMerchantName(name: string): string {
    return name
      .toUpperCase()
      .replace(/[^A-Z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private static categorizeSubscription(merchantName: string): string {
    const name = merchantName.toLowerCase();
    
    if (name.includes('netflix') || name.includes('hulu') || name.includes('disney') || name.includes('prime video')) {
      return 'Streaming';
    }
    if (name.includes('spotify') || name.includes('apple music') || name.includes('pandora')) {
      return 'Music';
    }
    if (name.includes('adobe') || name.includes('microsoft') || name.includes('slack') || name.includes('zoom')) {
      return 'Software';
    }
    if (name.includes('gym') || name.includes('fitness') || name.includes('workout')) {
      return 'Fitness';
    }
    if (name.includes('cloud') || name.includes('dropbox') || name.includes('google drive')) {
      return 'Cloud Storage';
    }
    
    return 'Other';
  }
}
