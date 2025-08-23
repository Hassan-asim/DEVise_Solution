import React from 'react';
import AnimatedSection from '../components/AnimatedSection';

const Payments: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <AnimatedSection className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary-dark to-secondary-dark dark:from-primary-light dark:to-secondary-light">Payments</h1>
      </AnimatedSection>

      <div className="mt-16 flex items-center justify-center min-h-[400px]">
        <AnimatedSection className="text-center">
          <div className="text-8xl md:text-9xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary-dark to-secondary-dark dark:from-primary-light dark:to-secondary-light mb-8">
            COMING SOON
          </div>
          <p className="text-xl md:text-2xl text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
            We're working on setting up secure payment processing. Check back soon for multiple payment options!
          </p>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Payments;