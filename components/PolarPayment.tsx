import React, { useState, useEffect } from 'react';
import { createCheckoutSession, getProducts, PolarProduct } from '../services/polarService';
import AnimatedSection from './AnimatedSection';

interface PolarPaymentProps {
  className?: string;
}

const PolarPayment: React.FC<PolarPaymentProps> = ({ className = '' }) => {
  const [products, setProducts] = useState<PolarProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const productList = await getProducts();
      setProducts(productList);
    } catch (err) {
      setError('Failed to load products');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (productId: string) => {
    try {
      setProcessing(productId);
      setError(null);

      const checkoutUrl = await createCheckoutSession({
        productId,
        successUrl: `${window.location.origin}/#/payment-success`,
        cancelUrl: `${window.location.origin}/#/payments`,
        metadata: {
          source: 'devise-solutions',
          timestamp: new Date().toISOString(),
        },
      });

      // Redirect to Polar checkout
      window.location.href = checkoutUrl;
    } catch (err) {
      setError('Failed to initiate payment. Please try again.');
      console.error('Error creating checkout:', err);
    } finally {
      setProcessing(null);
    }
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(price / 100); // Polar prices are in cents
  };

  if (loading) {
    return (
      <div className={`p-8 bg-charcoal dark:bg-light-bg-secondary rounded-lg shadow-lg ${className}`}>
        <div className="text-center text-white dark:text-charcoal">
          <div className="animate-pulse">Loading Polar products...</div>
        </div>
      </div>
    );
  }

  if (error && products.length === 0) {
    return (
      <div className={`p-8 bg-charcoal dark:bg-light-bg-secondary rounded-lg shadow-lg ${className}`}>
        <div className="text-center">
          <div className="h-16 mx-auto mb-4 flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-white dark:text-charcoal">Polar.sh Payments</h2>
          <p className="text-white dark:text-charcoal mb-6">
            Products will be available here once configured in your Polar dashboard.
          </p>
          <a
            href="https://polar.sh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-md shadow-lg hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-105"
          >
            Configure on Polar.sh
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Default Polar.sh Card */}
      <div className="p-8 bg-charcoal dark:bg-light-bg-secondary rounded-lg shadow-lg text-center h-full flex flex-col justify-between mb-6">
        <div>
          <div className="h-16 mx-auto mb-4 flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-white dark:text-charcoal">Pay with Polar.sh</h2>
          <p className="text-white dark:text-charcoal mb-6">
            Modern payment processing for developers and creators. Support subscriptions and one-time payments.
          </p>
        </div>
        <a
          href="https://polar.sh"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-md shadow-lg hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-105"
        >
          Visit Polar.sh
        </a>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Products List */}
      {products.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-center text-light-text dark:text-dark-text mb-4">
            Available Products
          </h3>
          {products.map((product) => (
            <div
              key={product.id}
              className="p-6 bg-light-bg dark:bg-dark-bg-secondary rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-light-text dark:text-dark-text">
                    {product.name}
                  </h4>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary mt-1">
                    {product.description}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xl font-bold text-primary-dark dark:text-primary-light">
                      {formatPrice(product.price, product.currency)}
                    </span>
                    <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
                      {product.type === 'subscription' ? 'Monthly' : 'One-time'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handlePurchase(product.id)}
                  disabled={processing === product.id}
                  className={`px-6 py-2 font-semibold rounded-md transition-all transform hover:scale-105 ${
                    processing === product.id
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg'
                  }`}
                >
                  {processing === product.id ? 'Processing...' : 'Purchase'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PolarPayment;
