import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';

const PaymentSuccess: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <AnimatedSection className="text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-400 mb-4">
            Payment Successful!
          </h1>
          
          <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary mb-8">
            Thank you for your payment. Your transaction has been processed successfully.
          </p>
        </div>

        <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-4">What's Next?</h2>
          <div className="space-y-3 text-left">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary-DEFAULT rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">1</span>
              </div>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                You will receive a confirmation email shortly with your receipt and purchase details.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary-DEFAULT rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">2</span>
              </div>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                Our team will contact you within 24 hours to discuss your project requirements.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary-DEFAULT rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">3</span>
              </div>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                We'll begin working on your project immediately after confirming all details.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-8 py-3 bg-gradient-to-r from-primary-dark to-secondary-dark text-white font-semibold rounded-md shadow-lg hover:ring-2 hover:ring-primary-DEFAULT transition-all transform hover:scale-105"
          >
            Back to Home
          </Link>
          <Link
            to="/contact"
            className="px-8 py-3 bg-light-bg-secondary dark:bg-dark-bg-secondary font-semibold rounded-md shadow-lg text-light-text dark:text-dark-text hover:ring-2 hover:ring-primary-DEFAULT transition-all transform hover:scale-105"
          >
            Contact Us
          </Link>
        </div>

        <div className="mt-12 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            <strong>Need help?</strong> If you have any questions about your purchase or payment, 
            please don't hesitate to contact our support team.
          </p>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default PaymentSuccess;
