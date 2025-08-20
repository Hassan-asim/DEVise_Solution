import React from 'react';
import { FOUNDERS } from '../constants';
import AnimatedSection from '../components/AnimatedSection';

const FounderCard: React.FC<{ founder: typeof FOUNDERS[0] }> = ({ founder }) => {
  return (
    <div className="group text-center p-6 bg-charcoal dark:bg-light-bg-secondary rounded-lg shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-DEFAULT/40 dark:hover:shadow-secondary-DEFAULT/30 border border-primary-DEFAULT">
      <img
        className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full shadow-md border-4 border-primary-DEFAULT/50 transition-all duration-300 group-hover:border-secondary-DEFAULT"
        src={founder.image}
        alt={founder.name}
      />
      <h3 className="mt-6 text-xl font-bold text-white dark:text-charcoal">{founder.name}</h3>
      <p className="mt-1 text-primary-DEFAULT group-hover:text-secondary-DEFAULT transition-colors duration-300">Co-Founder</p>
      <div className="mt-4 flex justify-center space-x-4">
        <a href={founder.github} target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-DEFAULT dark:text-charcoal dark:hover:text-primary-light transition-colors">
            <span className="sr-only">GitHub</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" /></svg>
        </a>
        <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-DEFAULT dark:text-charcoal dark:hover:text-primary-light transition-colors">
            <span className="sr-only">LinkedIn</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
        </a>
      </div>
    </div>
  );
};

const Founders: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <AnimatedSection className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary-dark to-secondary-dark dark:from-primary-light dark:to-secondary-light">Our Founders</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-light-text-secondary dark:text-dark-text-secondary">
          The architects of our vision. A dynamic duo blending technical mastery with entrepreneurial spirit.
        </p>
      </AnimatedSection>
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {FOUNDERS.map((founder) => (
          <AnimatedSection key={founder.name}>
            <FounderCard founder={founder} />
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
};

export default Founders;