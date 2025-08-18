import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <AnimatedSection className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">About DEVise Solutions</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-light-text-secondary dark:text-dark-text-secondary">
          Fusing innovation with execution to build the future of software.
        </p>
      </AnimatedSection>
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <AnimatedSection>
          <img src="https://picsum.photos/seed/about/600/400" alt="Team working" className="rounded-lg shadow-xl"/>
        </AnimatedSection>
        <AnimatedSection>
          <h2 className="text-3xl font-bold">Our Mission</h2>
          <p className="mt-4 text-light-text-secondary dark:text-dark-text-secondary">
            Our mission is to empower businesses and individuals by transforming their visions into tangible, high-quality software. We are committed to delivering innovative and reliable solutions that drive growth, efficiency, and success for our clients. We believe in the power of code to solve complex problems and create meaningful impact.
          </p>
        </AnimatedSection>
      </div>

      <div className="mt-20">
        <AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-8 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg">
              <h3 className="text-2xl font-bold text-primary-DEFAULT">Innovation</h3>
              <p className="mt-2 text-light-text-secondary dark:text-dark-text-secondary">
                We constantly explore new technologies and approaches to deliver cutting-edge solutions.
              </p>
            </div>
            <div className="p-8 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg">
              <h3 className="text-2xl font-bold text-primary-DEFAULT">Partnership</h3>
              <p className="mt-2 text-light-text-secondary dark:text-dark-text-secondary">
                We work as an extension of your team, fostering collaboration and transparency.
              </p>
            </div>
            <div className="p-8 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg">
              <h3 className="text-2xl font-bold text-primary-DEFAULT">Quality</h3>
              <p className="mt-2 text-light-text-secondary dark:text-dark-text-secondary">
                Our commitment to excellence ensures robust, scalable, and maintainable software.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>

      <AnimatedSection className="mt-20 text-center">
         <h2 className="text-3xl font-bold">Meet the Minds Behind the Magic</h2>
         <p className="mt-4 text-lg text-light-text-secondary dark:text-dark-text-secondary">
            Our leadership team combines technical expertise with a passion for innovation.
         </p>
         <div className="mt-8">
            <Link
                to="/founders"
                className="inline-block px-8 py-3 font-semibold rounded-md shadow-lg text-white bg-gradient-to-r from-primary-DEFAULT to-secondary-DEFAULT bg-[size:200%] hover:bg-[position:100%_center] focus:ring-2 focus:ring-offset-2 focus:ring-primary-light dark:focus:ring-offset-dark-bg transition-all duration-500 transform hover:scale-105"
            >
                Meet Our Founders
            </Link>
         </div>
      </AnimatedSection>

    </div>
  );
};

export default About;