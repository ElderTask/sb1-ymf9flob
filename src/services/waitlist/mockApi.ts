// Simulate API delay and response
export async function mockSubmitToWaitlist(email: string): Promise<boolean> {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}