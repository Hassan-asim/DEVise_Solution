# Vercel Deployment Guide

This guide will help you deploy your DEVise Solutions website to Vercel with Gmail API integration.

## 🚀 Environment Variables for Vercel

### Required Variables

Add these environment variables in your Vercel dashboard:

1. **Gmail API Configuration**:
   ```
   GMAIL_CLIENT_ID=1079937355180-b0knpfi0j5kqca2et6bvgse08svpotma.apps.googleusercontent.com
   GMAIL_CLIENT_SECRET=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
   GMAIL_REFRESH_TOKEN=your_gmail_refresh_token_here
   GMAIL_FROM_EMAIL=hassanasim337@gmail.com
   GMAIL_RECIPIENT_1=hassanalisajid786@gmail.com
   GMAIL_RECIPIENT_2=hassanasim337@gmail.com
   GMAIL_RECIPIENT_3=team@devisesolutions.co
   ```

2. **Optional - Gemini AI** (if you're using the chatbot):
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

## 📋 Step-by-Step Deployment

### Step 1: Prepare Your Repository

1. Make sure your `.gitignore` includes environment files:
   ```gitignore
   # Environment variables
   .env
   .env.local
   .env.development.local
   .env.test.local
   .env.production.local
   ```

2. Push your code to GitHub/GitLab/Bitbucket

### Step 2: Deploy to Vercel

1. **Go to Vercel**: Visit [vercel.com](https://vercel.com)
2. **Import Project**: Click "Import Project" and connect your repository
3. **Configure Project**: 
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Step 3: Add Environment Variables

In your Vercel dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add each variable one by one:

   **Variable Name** → **Value**
   ```
   GMAIL_CLIENT_ID → 1079937355180-b0knpfi0j5kqca2et6bvgse08svpotma.apps.googleusercontent.com
   GMAIL_CLIENT_SECRET → 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
   GMAIL_REFRESH_TOKEN → your_gmail_refresh_token_here
   GMAIL_FROM_EMAIL → hassanasim337@gmail.com
   GMAIL_RECIPIENT_1 → hassanalisajid786@gmail.com
   GMAIL_RECIPIENT_2 → hassanasim337@gmail.com
   GMAIL_RECIPIENT_3 → team@devisesolutions.co
   ```

3. **Environment**: Select "Production", "Preview", and "Development" for all variables

### Step 4: Deploy

1. Click **Deploy**
2. Wait for the build to complete
3. Test your contact form on the live site

## 🔧 Local Development Setup

For local development, create a `.env` file in your project root:

```env
# Gmail API Configuration
GMAIL_CLIENT_ID=1079937355180-b0knpfi0j5kqca2et6bvgse08svpotma.apps.googleusercontent.com
GMAIL_CLIENT_SECRET=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
GMAIL_REFRESH_TOKEN=your_gmail_refresh_token_here
GMAIL_FROM_EMAIL=hassanasim337@gmail.com
GMAIL_RECIPIENT_1=hassanalisajid786@gmail.com
GMAIL_RECIPIENT_2=hassanasim337@gmail.com
GMAIL_RECIPIENT_3=team@devisesolutions.co

# Gemini AI Configuration (optional)
GEMINI_API_KEY=your_gemini_api_key_here
```

**Important**: Never commit this `.env` file to version control!

## 🧪 Testing Your Deployment

### Test the Contact Form

1. Go to your deployed website
2. Scroll to the footer
3. Fill out the "Get in Touch" form:
   - **Name**: Test User
   - **Email**: your-email@example.com
   - **Message**: Testing the contact form
4. Click "Send via Gmail"
5. Check that emails arrive at all three recipient addresses

### Troubleshooting

1. **"Email service not configured"**:
   - Check that all environment variables are set in Vercel
   - Redeploy after adding environment variables

2. **Contact form not working**:
   - Check Vercel Function logs in the dashboard
   - Verify the refresh token is valid

3. **Build failures**:
   - Check the build logs in Vercel
   - Make sure all dependencies are in package.json

## 📊 Features Included

✅ **Automatic Email Sending**: Via Gmail API  
✅ **Professional Email Templates**: HTML formatted with your brand colors  
✅ **Form Validation**: Client and server-side validation  
✅ **Error Handling**: Graceful failure with fallbacks  
✅ **Multiple Recipients**: Sends to all three email addresses  
✅ **Automatic Sitemap**: Generated on every build  
✅ **SEO Optimized**: Proper meta tags and sitemap  
✅ **Mobile Responsive**: Works on all devices  
✅ **Dark Mode**: Matches your app's theme  

## 🔒 Security

- Environment variables are encrypted in Vercel
- No sensitive data exposed to client-side
- Input validation and sanitization
- Rate limiting can be added if needed

## 📱 Post-Deployment Checklist

- [ ] Contact form sends emails successfully
- [ ] All three recipients receive emails
- [ ] Form validation works properly
- [ ] Fallback email client option works
- [ ] Website loads correctly on mobile and desktop
- [ ] Sitemap is accessible at `/sitemap.xml`
- [ ] All pages load without errors

Your DEVise Solutions website is now ready for production with professional email functionality!
