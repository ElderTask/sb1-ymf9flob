import { supabase } from '../../lib/supabase';

export async function checkExistingEmail(email: string) {
  try {
    const { data, error } = await supabase
      .from('waitlist')
      .select('email')
      .eq('email', email);

    if (error) throw error;
    return data && data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error('Error checking existing email:', error);
    throw error;
  }
}

export async function addToWaitlist(email: string) {
  try {
    const { error } = await supabase
      .from('waitlist')
      .insert([{ email }]);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    throw error;
  }
}