import { supabase } from '../../lib/supabase';

export async function sendBulkWelcomeEmails(): Promise<{
  success: boolean;
  message: string;
  details?: {
    total: number;
    sent: number;
    failed: number;
    errors: any[];
  };
}> {
  try {
    const { data, error } = await supabase.functions.invoke('send-bulk-welcome-emails');

    if (error) {
      console.error('Error sending bulk welcome emails:', error);
      return {
        success: false,
        message: 'Failed to send bulk welcome emails'
      };
    }

    return {
      success: true,
      message: `Successfully processed emails`,
      details: data
    };
  } catch (error) {
    console.error('Failed to send bulk welcome emails:', error);
    return {
      success: false,
      message: 'Failed to send bulk welcome emails'
    };
  }
}