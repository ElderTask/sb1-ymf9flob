export interface WaitlistEntry {
  email: string;
  timestamp: string;
  source?: string;
}

export interface WaitlistResponse {
  success: boolean;
  message: string;
}