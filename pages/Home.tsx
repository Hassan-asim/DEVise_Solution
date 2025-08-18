import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { SERVICES } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Section */}
      <section className="relative text-center py-24 md:py-32 lg:py-40 bg-light-bg dark:bg-dark-bg overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center] dark:bg-grid-slate-400/[0.05] dark:bg-bottom_1px_center" style={{ maskImage: 'linear-gradient(to bottom, transparent, black, transparent)' }}></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-light-text dark:text-dark-text">
              DEV<span className="text-primary-DEFAULT">ise</span> Solutions
            </h1>
            <p className="mt-4 text-lg md:text-xl text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
              Your Vision, Our Code. We transform your ideas into powerful, scalable software solutions.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                to="/projects"
                className="inline-block px-8 py-3 font-semibold rounded-md shadow-lg text-white bg-gradient-to-r from-primary-DEFAULT to-secondary-DEFAULT bg-[size:200%] hover:bg-[position:100%_center] focus:ring-2 focus:ring-offset-2 focus:ring-primary-light dark:focus:ring-offset-dark-bg transition-all duration-500 transform hover:scale-105"
              >
                Our Work
              </Link>
              <Link
                to="/contact"
                className="inline-block px-8 py-3 bg-light-bg-secondary dark:bg-dark-bg-secondary font-semibold rounded-md shadow-lg hover:ring-2 hover:ring-primary-DEFAULT transition-all transform hover:scale-105"
              >
                Contact Us
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Overview */}
      <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-light-text dark:text-dark-text drop-shadow-[0_0_8px_rgba(0,255,255,0.3)]">What We Do</h2>
          <p className="mt-4 text-lg text-light-text-secondary dark:text-dark-text-secondary">
            We offer a comprehensive suite of services to bring your digital products to life.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service) => (
            <div key={service.title} className="group p-6 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg shadow-md hover:shadow-xl hover:shadow-primary-DEFAULT/20 dark:hover:shadow-secondary-DEFAULT/20 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-DEFAULT/20 to-secondary-DEFAULT/20 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex justify-center group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                <h3 className="mt-5 text-lg font-semibold text-center">{service.title}</h3>
                <p className="mt-2 text-sm text-light-text-secondary dark:text-dark-text-secondary text-center">
                  {service.description.substring(0, 100)}...
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
            <Link to="/services" className="font-semibold text-primary-DEFAULT hover:text-primary-dark dark:hover:text-primary-light">
                Explore All Services &rarr;
            </Link>
        </div>
      </AnimatedSection>
      
       {/* Call to Action */}
      <AnimatedSection className="bg-light-bg-secondary dark:bg-dark-bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Have a project in mind?</h2>
            <p className="mt-4 text-lg text-light-text-secondary dark:text-dark-text-secondary">Let's build something amazing together.</p>
            <div className="mt-8">
                 <Link
                    to="/contact"
                    className="inline-block px-8 py-3 font-semibold rounded-md shadow-lg text-white bg-gradient-to-r from-primary-DEFAULT to-secondary-DEFAULT bg-[size:200%] hover:bg-[position:100%_center] focus:ring-2 focus:ring-offset-2 focus:ring-primary-light dark:focus:ring-offset-dark-bg transition-all duration-500 transform hover:scale-105"
                 >
                    Start a Conversation
                </Link>
            </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Home;