import { VercelRequest, VercelResponse } from "@vercel/node";
import { google } from 'googleapis';

// Gmail configuration
const GMAIL_CONFIG = {
  clientId: process.env.GMAIL_CLIENT_ID,
  clientSecret: process.env.GMAIL_CLIENT_SECRET,
  refreshToken: process.env.GMAIL_REFRESH_TOKEN,
  fromEmail: process.env.GMAIL_FROM_EMAIL || 'hassanasim337@gmail.com',
  recipients: [
    process.env.GMAIL_RECIPIENT_1 || 'hassanalisajid786@gmail.com',
    process.env.GMAIL_RECIPIENT_2 || 'hassanasim337@gmail.com',
    process.env.GMAIL_RECIPIENT_3 || 'team@devisesolutions.co'
  ]
};

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Create OAuth2 client
const createOAuth2Client = () => {
  const oauth2Client = new google.auth.OAuth2(
    GMAIL_CONFIG.clientId,
    GMAIL_CONFIG.clientSecret,
    'https://developers.google.com/oauthplayground' // redirect URI used to get refresh token
  );

  oauth2Client.setCredentials({
    refresh_token: GMAIL_CONFIG.refreshToken
  });

  return oauth2Client;
};

// Create email content
const createEmailContent = (formData: ContactFormData): string => {
  const subject = `New Contact Form Submission from ${formData.name}`;
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #00FFFF; border-bottom: 2px solid #F021B5; padding-bottom: 10px;">
        New Contact Form Submission
      </h2>
      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
        <p><strong>Message:</strong></p>
        <div style="background-color: white; padding: 15px; border-left: 4px solid #00FFFF; margin-top: 10px;">
          ${formData.message.replace(/\n/g, '<br>')}
        </div>
      </div>
      <hr style="border: 1px solid #eee; margin: 30px 0;">
      <p style="color: #666; font-size: 12px;">
        This email was sent automatically from the DEVise Solutions contact form.<br>
        Submitted at: ${new Date().toLocaleString()}<br>
        Website: <a href="https://devise-solutions.com">devise-solutions.com</a>
      </p>
    </div>
  `;

  const textBody = `
New contact form submission from DEVise Solutions website:

Name: ${formData.name}
Email: ${formData.email}
Message: ${formData.message}

---
This email was sent automatically from the DEVise Solutions contact form.
Submitted at: ${new Date().toLocaleString()}
Website: https://devise-solutions.com
  `.trim();

  // Create email in RFC 2822 format
  const email = [
    `To: ${GMAIL_CONFIG.recipients.join(', ')}`,
    `From: DEVise Solutions <${GMAIL_CONFIG.fromEmail}>`,
    `Reply-To: ${formData.email}`,
    `Subject: ${subject}`,
    `Content-Type: multipart/alternative; boundary="boundary123"`,
    '',
    '--boundary123',
    'Content-Type: text/plain; charset=utf-8',
    '',
    textBody,
    '',
    '--boundary123',
    'Content-Type: text/html; charset=utf-8',
    '',
    htmlBody,
    '',
    '--boundary123--'
  ].join('\n');

  // Encode to base64url
  return Buffer.from(email).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formData: ContactFormData = request.body;

    // Validate form data
    if (!formData.name || !formData.email || !formData.message) {
      return response.status(400).json({ 
        error: 'Missing required fields: name, email, and message are required' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return response.status(400).json({ 
        error: 'Invalid email format' 
      });
    }

    // Check if all Gmail configuration is present
    if (!GMAIL_CONFIG.clientId || !GMAIL_CONFIG.clientSecret || !GMAIL_CONFIG.refreshToken) {
      console.error('Gmail configuration incomplete:', {
        hasClientId: !!GMAIL_CONFIG.clientId,
        hasClientSecret: !!GMAIL_CONFIG.clientSecret,
        hasRefreshToken: !!GMAIL_CONFIG.refreshToken
      });
      return response.status(500).json({ 
        error: 'Email service not configured. Please contact us directly.' 
      });
    }

    // Create OAuth2 client and Gmail API instance
    const oauth2Client = createOAuth2Client();
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    // Create email content
    const emailContent = createEmailContent(formData);

    // Send email
    const result = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: emailContent
      }
    });

    if (result.status === 200) {
      return response.status(200).json({
        success: true,
        message: 'Email sent successfully! We will get back to you soon.',
        messageId: result.data.id
      });
    } else {
      throw new Error('Failed to send email');
    }

  } catch (error) {
    console.error('Error sending email:', error);
    
    // Return appropriate error message
    if (error.code === 401) {
      return response.status(500).json({
        error: 'Email authentication failed. Please contact us directly.'
      });
    } else if (error.code === 403) {
      return response.status(500).json({
        error: 'Email service quota exceeded. Please contact us directly.'
      });
    } else {
      return response.status(500).json({
        error: 'Failed to send email. Please try again or contact us directly.'
      });
    }
  }
}
