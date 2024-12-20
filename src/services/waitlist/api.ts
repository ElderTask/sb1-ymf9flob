import { WaitlistResponse } from './types';
import { checkExistingEmail, addToWaitlist } from './db';

export async function submitToWaitlist(email: string): Promise<WaitlistResponse> {
  try {
    // Check for existing email
    const existingEntry = await checkExistingEmail(email);
    
    if (existingEntry) {
      return {
        success: false,
        message: 'This email is already on our waitlist!'
      };
    }

    // Add to waitlist
    await addToWaitlist(email);

    return {
      success: true,
      message: 'Successfully Joined'
    };
  } catch (error) {
    console.error('Waitlist submission error:', error);
    return {
      success: false,
      message: 'Unable to join waitlist at this time. Please try again later.'
    };
  }
}