import { Polar } from '@polar-sh/sdk';

// Polar client configuration
const polarClient = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN || import.meta.env.VITE_POLAR_ACCESS_TOKEN,
  server: 'sandbox', // Change to 'production' when ready to go live
});

export interface CheckoutSessionData {
  productId: string;
  successUrl?: string;
  cancelUrl?: string;
  customerId?: string;
  metadata?: Record<string, string>;
}

export interface PolarProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  type: 'one_time' | 'subscription';
}

// Create a checkout session for a product
export const createCheckoutSession = async (data: CheckoutSessionData): Promise<string> => {
  try {
    const checkoutSession = await polarClient.checkout.create({
      productId: data.productId,
      successUrl: data.successUrl || `${window.location.origin}/#/payment-success`,
      cancelUrl: data.cancelUrl || `${window.location.origin}/#/payment-cancelled`,
      customerId: data.customerId,
      metadata: data.metadata,
    });
    
    return checkoutSession.url;
  } catch (error) {
    console.error('Error creating Polar checkout session:', error);
    throw new Error('Failed to create checkout session');
  }
};

// Get available products from Polar
export const getProducts = async (): Promise<PolarProduct[]> => {
  try {
    const products = await polarClient.products.list();
    return products.items.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description || '',
      price: product.prices[0]?.amount || 0,
      currency: product.prices[0]?.currency || 'USD',
      type: product.type,
    }));
  } catch (error) {
    console.error('Error fetching Polar products:', error);
    return [];
  }
};

// Handle subscription management
export const manageBilling = async (customerId: string): Promise<string> => {
  try {
    const billingPortal = await polarClient.customers.createBillingPortal({
      customerId,
      returnUrl: `${window.location.origin}/#/payments`,
    });
    
    return billingPortal.url;
  } catch (error) {
    console.error('Error creating billing portal:', error);
    throw new Error('Failed to access billing portal');
  }
};

// Webhook verification utility (for server-side use)
export const verifyWebhookSignature = (
  payload: string,
  signature: string,
  secret: string
): boolean => {
  try {
    // This would typically be done on a server
    // For client-side apps, webhook handling should be done on your backend
    return true; // Placeholder
  } catch (error) {
    console.error('Error verifying webhook signature:', error);
    return false;
  }
};

export default polarClient;
