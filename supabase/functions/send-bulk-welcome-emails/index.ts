import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Resend } from 'https://esm.sh/resend'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Validate Resend API key
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY is not set in environment variables');
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const resend = new Resend(resendApiKey)

    // Get all waitlist entries where email hasn't been sent
    const { data: waitlistEntries, error: fetchError } = await supabase
      .from('waitlist')
      .select('email')
      .eq('email_sent', false)

    if (fetchError) {
      throw new Error(`Failed to fetch waitlist entries: ${fetchError.message}`);
    }

    if (!waitlistEntries?.length) {
      return new Response(
        JSON.stringify({ 
          message: 'No pending emails found',
          details: { total: 0, sent: 0, failed: 0, errors: [] }
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    }

    const results = {
      total: waitlistEntries.length,
      sent: 0,
      failed: 0,
      errors: []
    }

    // Process each email with a small delay to avoid rate limits
    for (const entry of waitlistEntries) {
      try {
        await new Promise(resolve => setTimeout(resolve, 200)) // 200ms delay between emails

        const { error: emailError } = await resend.emails.send({
          from: 'PAVE <welcome@pave.dev>',
          to: entry.email,
          subject: 'Welcome to PAVE Waitlist',
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Welcome to PAVE</title>
              </head>
              <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="text-align: center; margin-bottom: 30px;">
                  <h1 style="color: #4F46E5; margin-bottom: 10px;">Welcome to PAVE!</h1>
                  <p style="font-size: 18px; color: #666;">Thank you for joining our waitlist</p>
                </div>
                
                <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                  <p>We're thrilled to have you on board! You're now part of an exclusive group that will be first to experience PAVE's revolutionary blockchain infrastructure.</p>
                  
                  <h2 style="color: #4F46E5; margin-top: 20px;">What's Next?</h2>
                  <ul style="list-style: none; padding: 0;">
                    <li style="margin-bottom: 10px;">✨ Early access to the platform</li>
                    <li style="margin-bottom: 10px;">📫 Regular updates on our progress</li>
                    <li style="margin-bottom: 10px;">🎁 Exclusive benefits for waitlist members</li>
                  </ul>
                </div>
                
                <div style="text-align: center; color: #666; font-size: 14px;">
                  <p>Stay tuned for updates and exclusive early access opportunities.</p>
                  <p style="margin-top: 30px;">Best regards,<br>The PAVE Team</p>
                </div>
              </body>
            </html>
          `
        })

        if (emailError) {
          throw new Error(`Failed to send email: ${emailError.message}`);
        }

        // Mark email as sent
        const { error: updateError } = await supabase
          .from('waitlist')
          .update({ email_sent: true })
          .eq('email', entry.email)

        if (updateError) {
          throw new Error(`Failed to update email status: ${updateError.message}`);
        }

        results.sent++
      } catch (error) {
        results.failed++
        results.errors.push({
          email: entry.email,
          error: error.message
        })
        console.error(`Failed to process email for ${entry.email}:`, error);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Processed ${results.total} emails: ${results.sent} sent, ${results.failed} failed`,
        details: results
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Function error:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        message: error.message,
        details: { sent: 0, failed: 0, errors: [error.message] }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})