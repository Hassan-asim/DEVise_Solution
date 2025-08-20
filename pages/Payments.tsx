import React from 'react';
import AnimatedSection from '../components/AnimatedSection';

const Payments: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <AnimatedSection className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary-dark to-secondary-dark dark:from-primary-light dark:to-secondary-light">Payments</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-light-text-secondary dark:text-dark-text-secondary">
          Securely process your payments through our trusted partners. Thank you for your business.
        </p>
      </AnimatedSection>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Stripe Card */}
        <AnimatedSection>
          <div className="p-8 bg-charcoal dark:bg-light-bg-secondary rounded-lg shadow-lg text-center h-full flex flex-col justify-between">
            <div>
                <img src="https://stripe.com/img/v3/home/social.png" alt="Stripe Logo" className="h-16 mx-auto mb-4 object-contain"/>
                <h2 className="text-2xl font-bold mb-2 text-white dark:text-charcoal">Pay with Stripe</h2>
                <p className="text-white dark:text-charcoal mb-6">
                    Ideal for credit/debit card payments. Secure, fast, and reliable.
                </p>
            </div>
            <a
              href="https://stripe.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full px-8 py-3 bg-light-bg-secondary dark:bg-dark-bg-secondary font-semibold rounded-md shadow-lg text-light-text dark:text-dark-text hover:ring-2 hover:ring-primary-DEFAULT transition-all transform hover:scale-105"
            >
              Go to Stripe
            </a>
          </div>
        </AnimatedSection>

        {/* Payoneer Card */}
        <AnimatedSection>
          <div className="p-8 bg-charcoal dark:bg-light-bg-secondary rounded-lg shadow-lg text-center h-full flex flex-col justify-between">
            <div>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Payoneer_logo.svg/1280px-Payoneer_logo.svg.png" alt="Payoneer Logo" className="h-16 mx-auto mb-4 object-contain dark:invert"/>
                <h2 className="text-2xl font-bold mb-2 text-white dark:text-charcoal">Pay with Payoneer</h2>
                <p className="text-white dark:text-charcoal mb-6">
                    Perfect for international bank transfers and other payment methods.
                </p>
            </div>
            <a
              href="https://payoneer.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full px-8 py-3 bg-light-bg-secondary dark:bg-dark-bg-secondary font-semibold rounded-md shadow-lg text-light-text dark:text-dark-text hover:ring-2 hover:ring-primary-DEFAULT transition-all transform hover:scale-105"
            >
              Go to Payoneer
            </a>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Payments;