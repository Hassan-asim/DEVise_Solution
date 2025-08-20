import React from 'react';
import { SERVICES } from '../constants';
import AnimatedSection from '../components/AnimatedSection';

const Services: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <AnimatedSection className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary-dark to-secondary-dark dark:from-primary-light dark:to-secondary-light">Our Services</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-light-text-secondary dark:text-dark-text-secondary">
          We provide end-to-end solutions to help you innovate, scale, and achieve your business goals.
        </p>
      </AnimatedSection>

      <div className="mt-16 space-y-16">
        {SERVICES.map((service, index) => (
          <AnimatedSection key={service.title}>
            <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className="md:w-1/2 p-8 flex justify-center items-center bg-charcoal dark:bg-light-bg-secondary rounded-lg shadow-lg relative group overflow-hidden border border-primary-DEFAULT hover:shadow-2xl hover:shadow-primary-light/20 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-DEFAULT/10 via-secondary-DEFAULT/10 to-transparent transform scale-150 rotate-45 translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:rotate-0 group-hover:scale-100 group-hover:translate-x-0 transition-all duration-700 ease-out"></div>
                  <div className="relative z-10 group-hover:scale-110 transition-transform duration-500">
                    {service.icon}
                  </div>
              </div>
              <div className="md:w-1/2">
                <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-dark to-secondary-dark dark:from-primary-light dark:to-secondary-light">{service.title}</h2>
                <p className="mt-4 text-lg text-light-text dark:text-dark-text">
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