import { supabase } from '../../lib/supabase';
import { EmailResult } from './types';

export async function sendWelcomeEmail(email: string): Promise<EmailResult> {
  try {
    const { data, error } = await supabase.functions.invoke('send-welcome-email', {
      body: { email }
    });

    if (error) {
      console.error('Error sending welcome email:', error);
      return { 
        success: false, 
        error: 'Unable to send welcome email at this time.'
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    return { 
      success: false, 
      error: 'Unable to send welcome email at this time.'
    };
  }
}