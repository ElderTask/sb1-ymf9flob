import { sendBulkWelcomeEmails } from './bulkEmailService';

export async function sendTestEmails() {
  const result = await sendBulkWelcomeEmails();
  console.log('Bulk email sending results:', result);
  return result;
}