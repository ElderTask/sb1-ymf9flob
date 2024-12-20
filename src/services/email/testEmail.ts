import { submitToWaitlist } from '../waitlist/api';

export async function testEmailSetup() {
  const testEmail = 'noahr5434@gmail.com';
  const result = await submitToWaitlist(testEmail);
  console.log('Test email result:', result);
  return result;
}