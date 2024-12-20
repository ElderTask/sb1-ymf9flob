import { supabase } from '../../lib/supabase';

export async function checkEmailConfiguration(): Promise<boolean> {
  try {
    const { data, error } = await supabase.functions.invoke('test-email-config');
    if (error) throw error;
    return data?.configured || false;
  } catch (error) {
    console.error('Email configuration check failed:', error);
    return false;
  }
}

export function handleEmailError(error: any): string {
  if (error?.message?.includes('RESEND_API_KEY')) {
    return 'Email service is not properly configured. Please contact support.';
  }
  return 'An unexpected error occurred. Please try again later.';
}