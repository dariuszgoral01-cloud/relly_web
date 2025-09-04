import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox, // Use sandbox for development
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
});

// Temporary mock implementation for development
export const plaidClient = {
  linkTokenCreate: async (request: any) => ({
    data: {
      link_token: 'mock_link_token',
      expiration: new Date(Date.now() + 3600000).toISOString(),
      request_id: 'mock_request_id'
    }
  }),
  itemPublicTokenExchange: async (request: any) => ({
    data: {
      access_token: 'mock_access_token',
      item_id: 'mock_item_id'
    }
  }),
  accountsGet: async (request: any) => ({
    data: {
      accounts: [],
      item: {}
    }
  }),
  transactionsGet: async (request: any) => ({
    data: {
      transactions: [],
      accounts: []
    }
  }),
  institutionsGetById: async (request: any) => ({
    data: {
      institution: {
        name: 'Mock Bank',
        institution_id: 'mock_inst'
      }
    }
  })
};

export interface PlaidLinkTokenData {
  link_token: string;
  expiration: string;
  request_id: string;
}

export async function createLinkToken(userId: string): Promise<PlaidLinkTokenData> {
  const request = {
    user: {
      client_user_id: userId,
    },
    client_name: 'SubSense',
    products: ['transactions'],
    country_codes: ['US'],
    language: 'en',
    webhook: `${process.env.NEXT_PUBLIC_APP_URL}/api/plaid/webhook`,
  };

  const response = await plaidClient.linkTokenCreate(request);
  return response.data;
}

export async function exchangePublicToken(publicToken: string) {
  const request = {
    public_token: publicToken,
  };

  const response = await plaidClient.itemPublicTokenExchange(request);
  return response.data;
}

export async function getAccounts(accessToken: string) {
  const request = {
    access_token: accessToken,
  };

  const response = await plaidClient.accountsGet(request);
  return response.data;
}

export async function getTransactions(accessToken: string, startDate: string, endDate: string) {
  const request = {
    access_token: accessToken,
    start_date: startDate,
    end_date: endDate,
  };

  const response = await plaidClient.transactionsGet(request);
  return response.data;
}

export async function getInstitution(institutionId: string) {
  const request = {
    institution_id: institutionId,
    country_codes: ['US'],
  };

  const response = await plaidClient.institutionsGetById(request);
  return response.data.institution;
}
