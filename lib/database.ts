
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BankAccount {
  id: string;
  userId: string;
  institutionId: string;
  institutionName: string;
  accountId: string;
  accountName: string;
  accountType: string;
  mask: string;
  plaidAccessToken: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmailAccount {
  id: string;
  userId: string;
  email: string;
  provider: 'gmail' | 'outlook' | 'yahoo' | 'other';
  accessToken?: string;
  refreshToken?: string;
  isActive: boolean;
  lastSyncAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Subscription {
  id: string;
  userId: string;
  name: string;
  provider: string;
  amount: number;
  currency: string;
  billingCycle: 'monthly' | 'yearly' | 'weekly' | 'quarterly';
  category: string;
  status: 'active' | 'cancelled' | 'paused' | 'trial';
  nextBillingDate?: Date;
  lastBillingDate?: Date;
  detectionMethod: 'bank' | 'email' | 'manual';
  sourceAccountId?: string;
  description?: string;
  website?: string;
  cancellationUrl?: string;
  isSubscriptionConfirmed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id: string;
  userId: string;
  subscriptionId?: string;
  bankAccountId?: string;
  amount: number;
  currency: string;
  description: string;
  merchantName?: string;
  date: Date;
  plaidTransactionId?: string;
  isProcessed: boolean;
  createdAt: Date;
}

export interface EmailScan {
  id: string;
  userId: string;
  emailAccountId: string;
  scanStatus: 'pending' | 'in_progress' | 'completed' | 'failed';
  foundSubscriptions: number;
  lastProcessedDate?: Date;
  errorMessage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSettings {
  id: string;
  userId: string;
  notificationsEnabled: boolean;
  emailAlertsEnabled: boolean;
  billRemindersEnabled: boolean;
  reminderDaysBefore: number;
  currency: string;
  timezone: string;
  autoScanEnabled: boolean;
  scanFrequency: 'daily' | 'weekly' | 'monthly';
  createdAt: Date;
  updatedAt: Date;
}
