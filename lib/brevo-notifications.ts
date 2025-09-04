
export interface NotificationData {
  userId: string;
  email: string;
  firstName?: string;
  type: 'bill_reminder' | 'new_subscription' | 'savings_opportunity' | 'weekly_summary';
  data: any;
}

export class BrevoNotificationService {
  private static apiKey = process.env.BREVO_API_KEY;
  private static apiUrl = 'https://api.brevo.com/v3';

  static async sendBillReminder(notification: NotificationData) {
    const { data } = notification;
    
    const emailData = {
      to: [{ email: notification.email, name: notification.firstName || 'User' }],
      templateId: 1, // Create template in Brevo dashboard
      params: {
        firstName: notification.firstName || 'there',
        subscriptionName: data.subscriptionName,
        amount: data.amount,
        billingDate: data.billingDate,
        daysUntilBilling: data.daysUntilBilling
      }
    };

    return this.sendTransactionalEmail(emailData);
  }

  static async sendNewSubscriptionAlert(notification: NotificationData) {
    const { data } = notification;
    
    const emailData = {
      to: [{ email: notification.email, name: notification.firstName || 'User' }],
      templateId: 2, // Create template in Brevo dashboard
      params: {
        firstName: notification.firstName || 'there',
        subscriptionName: data.subscriptionName,
        amount: data.amount,
        detectionMethod: data.detectionMethod
      }
    };

    return this.sendTransactionalEmail(emailData);
  }

  static async sendSavingsOpportunity(notification: NotificationData) {
    const { data } = notification;
    
    const emailData = {
      to: [{ email: notification.email, name: notification.firstName || 'User' }],
      templateId: 3, // Create template in Brevo dashboard
      params: {
        firstName: notification.firstName || 'there',
        potentialSavings: data.potentialSavings,
        recommendationCount: data.recommendations.length,
        topRecommendation: data.recommendations[0]
      }
    };

    return this.sendTransactionalEmail(emailData);
  }

  static async sendWeeklySummary(notification: NotificationData) {
    const { data } = notification;
    
    const emailData = {
      to: [{ email: notification.email, name: notification.firstName || 'User' }],
      templateId: 4, // Create template in Brevo dashboard
      params: {
        firstName: notification.firstName || 'there',
        totalSubscriptions: data.totalSubscriptions,
        monthlySpend: data.monthlySpend,
        newSubscriptions: data.newSubscriptions,
        potentialSavings: data.potentialSavings
      }
    };

    return this.sendTransactionalEmail(emailData);
  }

  private static async sendTransactionalEmail(emailData: any) {
    try {
      const response = await fetch(`${this.apiUrl}/smtp/email`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': this.apiKey!,
          'content-type': 'application/json'
        },
        body: JSON.stringify(emailData)
      });

      if (!response.ok) {
        throw new Error(`Brevo API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to send email via Brevo:', error);
      throw error;
    }
  }

  static async addContactToList(email: string, firstName?: string, lastName?: string) {
    try {
      const contactData = {
        email,
        attributes: {
          FIRSTNAME: firstName || '',
          LASTNAME: lastName || ''
        },
        listIds: [1] // Create a contact list in Brevo dashboard
      };

      const response = await fetch(`${this.apiUrl}/contacts`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': this.apiKey!,
          'content-type': 'application/json'
        },
        body: JSON.stringify(contactData)
      });

      if (!response.ok && response.status !== 400) { // 400 means contact already exists
        throw new Error(`Brevo API error: ${response.statusText}`);
      }

      return response.status !== 400 ? await response.json() : null;
    } catch (error) {
      console.error('Failed to add contact to Brevo:', error);
      throw error;
    }
  }
}
