
import { createClient, User } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface UserProfile {
  id: string
  email: string
  first_name?: string
  last_name?: string
  created_at: string
  updated_at: string
}

export interface BankAccount {
  id: string
  user_id: string
  institution_id: string
  institution_name: string
  account_id: string
  account_name: string
  account_type: string
  mask: string
  plaid_access_token?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Subscription {
  id: string
  user_id: string
  name: string
  provider: string
  amount: number
  currency: string
  billing_cycle: 'monthly' | 'yearly' | 'weekly' | 'quarterly'
  category?: string
  status: 'active' | 'cancelled' | 'paused' | 'trial'
  next_billing_date?: string
  last_billing_date?: string
  detection_method: 'bank' | 'email' | 'manual'
  source_account_id?: string
  description?: string
  website?: string
  cancellation_url?: string
  is_subscription_confirmed: boolean
  created_at: string
  updated_at: string
}

export interface EmailAccount {
  id: string
  user_id: string
  email: string
  provider: 'gmail' | 'outlook' | 'yahoo' | 'other'
  access_token?: string
  refresh_token?: string
  is_active: boolean
  last_sync_at?: string
  created_at: string
  updated_at: string
}

export const getCurrentUser = async (): Promise<User | null> => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export const signUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      }
    }
  })
  if (error) throw error
  return data
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) throw error
  return data
}

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) throw error
  return data
}

export const updateUserProfile = async (userId: string, updates: Partial<UserProfile>) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)
    .select()
    .single()

  if (error) throw error
  return data
}

export const getUserSubscriptions = async (userId: string): Promise<Subscription[]> => {
  const { data, error } = await supabase
    .from('user_subscriptions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export const createSubscription = async (subscription: Omit<Subscription, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('user_subscriptions')
    .insert([subscription])
    .select()
    .single()

  if (error) throw error
  return data
}

export const updateSubscription = async (id: string, updates: Partial<Subscription>) => {
  const { data, error } = await supabase
    .from('user_subscriptions')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export const deleteSubscription = async (id: string) => {
  const { error } = await supabase
    .from('user_subscriptions')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export const getUserBankAccounts = async (userId: string): Promise<BankAccount[]> => {
  const { data, error } = await supabase
    .from('bank_accounts')
    .select('*')
    .eq('user_id', userId)
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export const createBankAccount = async (bankAccount: Omit<BankAccount, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('bank_accounts')
    .insert([bankAccount])
    .select()
    .single()

  if (error) throw error
  return data
}

export const getUserEmailAccounts = async (userId: string): Promise<EmailAccount[]> => {
  const { data, error } = await supabase
    .from('email_accounts')
    .select('*')
    .eq('user_id', userId)
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export const createEmailAccount = async (emailAccount: Omit<EmailAccount, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('email_accounts')
    .insert([emailAccount])
    .select()
    .single()

  if (error) throw error
  return data
}
