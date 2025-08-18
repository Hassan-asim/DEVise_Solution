import React from 'react';
import { SERVICES } from './constants';
import AnimatedSection from './components/AnimatedSection';

const Services: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <AnimatedSection className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Our Services</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-light-text-secondary dark:text-dark-text-secondary">
          We provide end-to-end solutions to help you innovate, scale, and achieve your business goals.
        </p>
      </AnimatedSection>

      <div className="mt-16 space-y-16">
        {SERVICES.map((service, index) => (
          <AnimatedSection key={service.title}>
            <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className="md:w-1/2 p-8 flex justify-center items-center bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg shadow-lg">
                  {service.icon}
              </div>
              <div className="md:w-1/2">
                <h2 className="text-2xl md:text-3xl font-bold text-primary-DEFAULT">{service.title}</h2>
                <p className="mt-4 text-lg text-light-text-secondary dark:text-dark-text-secondary">
                  {service.description}
                </p>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
};

export default Services;
