import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';

const PaymentCancelled: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <AnimatedSection className="text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-400 mb-4">
            Payment Cancelled
          </h1>
          
          <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary mb-8">
            Your payment was cancelled. No charges have been made to your account.
          </p>
        </div>

        <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-4">What happened?</h2>
          <div className="space-y-3 text-left">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">•</span>
              </div>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                You chose to cancel the payment process before completion.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">•</span>
              </div>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                No payment has been processed and no charges have been made.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">•</span>
              </div>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                You can try again anytime or contact us for assistance.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/payments"
            className="px-8 py-3 bg-gradient-to-r from-primary-dark to-secondary-dark text-white font-semibold rounded-md shadow-lg hover:ring-2 hover:ring-primary-DEFAULT transition-all transform hover:scale-105"
          >
            Try Payment Again
          </Link>
          <Link
            to="/contact"
            className="px-8 py-3 bg-light-bg-secondary dark:bg-dark-bg-secondary font-semibold rounded-md shadow-lg text-light-text dark:text-dark-text hover:ring-2 hover:ring-primary-DEFAULT transition-all transform hover:scale-105"
          >
            Contact Support
          </Link>
        </div>

        <div className="mt-12 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            <strong>Need assistance?</strong> If you're experiencing issues with payment or have questions about our services, 
            our team is here to help. Feel free to reach out to us.
          </p>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default PaymentCancelled;
