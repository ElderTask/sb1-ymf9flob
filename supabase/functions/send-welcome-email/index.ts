import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Resend } from 'https://esm.sh/resend'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

    // Get the email from the request
    const { email } = await req.json()

    // Send welcome email
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'PAVE <welcome@pave.dev>',
      to: email,
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
      throw emailError
    }

    // Update the waitlist entry to mark email as sent
    const { error: dbError } = await supabase
      .from('waitlist')
      .update({ email_sent: true })
      .eq('email', email)

    if (dbError) {
      throw dbError
    }

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})