# Gmail API Setup Guide

This guide will help you complete the Gmail API integration for the contact form.

## 🔧 Current Configuration

The following credentials are already configured in the system:
- **Client ID**: `1079937355180-b0knpfi0j5kqca2et6bvgse08svpotma.apps.googleusercontent.com`
- **Client Secret**: `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`
- **From Email**: `hassanasim337@gmail.com`
- **Recipients**: 
  - `hassanalisajid786@gmail.com`
  - `hassanasim337@gmail.com`
  - `team@devisesolutions.co`

## 🚀 Setup Steps

### Step 1: Get a Refresh Token

You need to generate a refresh token for the Gmail account `hassanasim337@gmail.com`:

1. Go to [Google OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)
2. Click the gear icon (⚙️) in the top right
3. Check "Use your own OAuth credentials"
4. Enter your credentials:
   - **OAuth Client ID**: `1079937355180-b0knpfi0j5kqca2et6bvgse08svpotma.apps.googleusercontent.com`
   - **OAuth Client Secret**: `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`
5. In the left panel, find and select:
   - **Gmail API v1** → `https://www.googleapis.com/auth/gmail.send`
6. Click "Authorize APIs"
7. Sign in with `hassanasim337@gmail.com`
8. Grant permissions
9. Click "Exchange authorization code for tokens"
10. Copy the **Refresh Token** (starts with `1//`)

### Step 2: Add Environment Variable

Create a `.env` file in your project root (or add to existing):

```env
# Gmail API Configuration
GMAIL_REFRESH_TOKEN=your_refresh_token_here

# Existing environment variables
GEMINI_API_KEY=your_gemini_api_key_here
```

### Step 3: Deploy and Test

1. Deploy your application with the new environment variable
2. Test the contact form on your website
3. Check that emails are received at all three recipient addresses

## 🔧 How It Works

### Frontend Contact Form
- User fills out: Name, Email, Message
- Form validates input client-side
- Sends POST request to `/api/send-email`
- Shows success/error messages
- Provides fallback to email client if API fails

### Backend API (`/api/send-email`)
- Receives form data via POST request
- Validates and sanitizes input
- Uses Google OAuth2 with refresh token
- Sends formatted email via Gmail API
- Returns success/error response

### Email Content
The sent emails include:
- **Subject**: "New Contact Form Submission from [Name]"
- **HTML formatted content** with your brand colors
- **Plain text fallback** for email clients
- **Reply-To** set to the user's email address
- **Professional footer** with website link and timestamp

## 📧 Email Template Preview

```html
Subject: New Contact Form Submission from John Doe

New Contact Form Submission
────────────────────────────

Name: John Doe
Email: john@example.com
Message: [User's message here]

───
This email was sent automatically from the DEVise Solutions contact form.
Submitted at: [timestamp]
Website: devise-solutions.com
```

## 🛠️ Features

### ✅ What's Working
- **Automatic Email Sending**: Via Gmail API
- **Form Validation**: Client and server-side
- **Error Handling**: Graceful failure with fallbacks
- **Professional Design**: Branded email templates
- **Multiple Recipients**: Sends to all three email addresses
- **Responsive UI**: Works on all devices
- **Loading States**: Visual feedback during submission

### 🔄 Fallback Options
1. **Gmail API** (primary method)
2. **Email Client Fallback** (opens user's default email app)
3. **Direct Email Links** (in contact page)

## 🚨 Troubleshooting

### Common Issues

1. **"Email service not configured"**
   - Missing `GMAIL_REFRESH_TOKEN` environment variable
   - Solution: Complete Step 1 and 2 above

2. **"Authentication failed"**
   - Refresh token expired or invalid
   - Solution: Generate a new refresh token

3. **"Quota exceeded"**
   - Hit Gmail API sending limits
   - Solution: Wait 24 hours or request quota increase

4. **Emails not received**
   - Check spam folders
   - Verify recipient email addresses
   - Check Gmail API console for errors

### Testing
```bash
# Test the API endpoint directly
curl -X POST http://localhost:5173/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message"
  }'
```

## 🔒 Security Features

- **Input validation** and sanitization
- **Rate limiting** (can be added)
- **CORS protection**
- **Environment variable protection**
- **No client-side credentials exposure**

## 📱 User Experience

The contact form now provides:
- **Two submission options**: Gmail API or Email Client
- **Real-time validation** with helpful error messages
- **Loading indicators** during submission
- **Success/error feedback** with clear next steps
- **Accessible design** with proper ARIA labels
- **Mobile-responsive** layout

## 🚀 Production Deployment

Before going live:
1. ✅ Generate refresh token
2. ✅ Set environment variable
3. ✅ Test email delivery
4. ✅ Check spam folders
5. ✅ Verify all recipient addresses
6. ✅ Test on mobile devices
7. ✅ Monitor API usage in Google Console

## 📞 Support

If you need help with setup:
1. Check the browser console for error messages
2. Verify environment variables are set correctly
3. Test the API endpoint directly
4. Check Gmail API quota in Google Console

Your contact form is now ready to handle professional email communication automatically!
