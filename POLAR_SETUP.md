# Polar.sh Payment Integration Setup

This guide will help you set up Polar.sh payments in your DEVise Solutions application.

## 🚀 Quick Start

### 1. Create a Polar.sh Account

1. Visit [polar.sh](https://polar.sh) and create an account
2. Complete the onboarding process
3. Set up your organization profile

### 2. Get Your API Credentials

1. Go to your [Polar Dashboard](https://polar.sh/dashboard)
2. Navigate to **Settings** → **API Keys**
3. Create a new API key with the following permissions:
   - `products:read`
   - `checkout:write`
   - `customers:read`
   - `customers:write`

### 3. Configure Environment Variables

Create a `.env` file in your project root (or add to your existing `.env`):

```env
# Polar.sh Configuration
VITE_POLAR_ACCESS_TOKEN=polar_your_access_token_here
VITE_POLAR_ORGANIZATION_ID=your_organization_id_here
VITE_POLAR_WEBHOOK_SECRET=your_webhook_secret_here

# Existing configuration
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Create Products in Polar

1. In your Polar dashboard, go to **Products**
2. Click **Create Product**
3. Fill in product details:
   - **Name**: e.g., "Web Development Package"
   - **Description**: Brief description of your service
   - **Price**: Set your pricing
   - **Type**: Choose "one_time" or "subscription"
4. Save your product

### 5. Update Configuration

Edit `services/polarService.ts` and update the server setting:

```typescript
const polarClient = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN || import.meta.env.VITE_POLAR_ACCESS_TOKEN,
  server: 'production', // Change from 'sandbox' to 'production' when ready
});
```

## 🛠️ Features Included

### ✅ What's Working Now

- **Product Display**: Automatically fetches and displays your Polar products
- **Checkout Integration**: Seamless redirect to Polar checkout
- **Success/Cancel Pages**: Proper user feedback after payment attempts
- **Responsive Design**: Works on all device sizes
- **Dark Mode Support**: Matches your app's theme

### 🔄 Payment Flow

1. User visits `/payments` page
2. Polar products are loaded automatically
3. User clicks "Purchase" on desired product
4. Redirected to Polar checkout
5. After payment completion:
   - Success → `/payment-success`
   - Cancelled → `/payment-cancelled`

## 🎨 Customization

### Modify Product Display

Edit `components/PolarPayment.tsx` to change how products are displayed:

```typescript
// Custom product card styling
const formatPrice = (price: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(price / 100);
};
```

### Update Success/Cancel Pages

Modify `pages/PaymentSuccess.tsx` and `pages/PaymentCancelled.tsx` to match your business flow.

### Change Redirect URLs

Update the URLs in `services/polarService.ts`:

```typescript
const checkoutSession = await polarClient.checkout.create({
  productId: data.productId,
  successUrl: `${window.location.origin}/#/payment-success`,
  cancelUrl: `${window.location.origin}/#/payment-cancelled`,
  // ... other options
});
```

## 🔧 Advanced Configuration

### Webhook Setup (Optional)

For production use, set up webhooks to handle payment events:

1. In Polar dashboard, go to **Webhooks**
2. Add endpoint: `https://yourdomain.com/api/polar-webhook`
3. Select events: `checkout.session.completed`, `subscription.created`, etc.
4. Copy the webhook secret to your environment variables

### Customer Management

The integration supports customer tracking:

```typescript
await createCheckoutSession({
  productId: 'your-product-id',
  customerId: 'customer-123', // Optional: track returning customers
  metadata: {
    source: 'devise-solutions',
    campaign: 'website',
  },
});
```

### Subscription Management

For subscription products, users can manage billing:

```typescript
import { manageBilling } from '../services/polarService';

const handleManageBilling = async () => {
  const billingUrl = await manageBilling(customerId);
  window.location.href = billingUrl;
};
```

## 🚨 Production Checklist

Before going live:

- [ ] Create production Polar account
- [ ] Update `server: 'production'` in polarService.ts
- [ ] Set up real products with actual pricing
- [ ] Configure webhooks for payment handling
- [ ] Test the complete payment flow
- [ ] Update success/cancel page content
- [ ] Set up proper error monitoring

## 🆘 Troubleshooting

### Common Issues

1. **Products not loading**: Check API key permissions and network connectivity
2. **Checkout fails**: Verify product IDs and pricing configuration
3. **Redirects not working**: Ensure URLs are correctly formatted with hash routing

### Debug Mode

To enable debug logging:

```typescript
// In polarService.ts
console.log('Creating checkout session:', {
  productId: data.productId,
  successUrl: data.successUrl,
  cancelUrl: data.cancelUrl,
});
```

## 📞 Support

- **Polar.sh Documentation**: [docs.polar.sh](https://docs.polar.sh)
- **Polar.sh Support**: Contact through their dashboard
- **Integration Issues**: Check the browser console for error messages

## 🎉 You're All Set!

Your Polar.sh integration is now ready! Users can:

1. Browse available products on the payments page
2. Complete secure checkout through Polar
3. Receive proper confirmation and next steps

The integration handles both one-time payments and subscriptions automatically based on your product configuration in Polar.
