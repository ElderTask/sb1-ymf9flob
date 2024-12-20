import { whitepaperContent } from './whitepaperContent';

export const downloadWhitepaper = () => {
  // Create a Blob with the whitepaper content
  const content = JSON.stringify(whitepaperContent, null, 2);
  const blob = new Blob([content], { type: 'application/pdf' });
  
  // Create a temporary URL for the Blob
  const url = window.URL.createObjectURL(blob);
  
  // Create a temporary link element
  const link = document.createElement('a');
  link.href = url;
  link.download = 'PAVE_Whitepaper.pdf';
  
  // Append to document, click, and cleanup
  document.body.appendChild(link);
  link.click();
  
  // Cleanup
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};