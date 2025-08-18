import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { FOUNDERS } from '../constants';

const Contact: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <AnimatedSection className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Contact Us</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-light-text-secondary dark:text-dark-text-secondary">
          We'd love to hear about your project. Reach out to us and let's start a conversation.
        </p>
      </AnimatedSection>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <AnimatedSection>
            <div className="p-8 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg h-full">
                <h2 className="text-2xl font-bold mb-4">Direct Contact</h2>
                {FOUNDERS.map(founder => (
                    <div key={founder.name} className="mb-4">
                        <h3 className="font-semibold">{founder.name}</h3>
                        <a href={`mailto:${founder.email}`} className="text-primary-DEFAULT hover:underline">{founder.email}</a>
                    </div>
                ))}
                <p className="mt-8 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    For general inquiries, please use the contact form. For a more interactive experience, try our AI assistant!
                </p>
            </div>
        </AnimatedSection>
        <AnimatedSection>
             <div className="p-8 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg h-full">
                <h2 className="text-2xl font-bold mb-4">Send Us a Message</h2>
                <p className="text-light-text-secondary dark:text-dark-text-secondary">
                    Have a question or a project proposal? Fill out the form in our footer, and our team will get back to you as soon as possible. We look forward to collaborating with you!
                </p>
                <button 
                    onClick={() => document.getElementById('footer-form')?.scrollIntoView({ behavior: 'smooth' })}
                    className="mt-6 inline-block px-8 py-3 font-semibold rounded-md shadow-lg text-white bg-gradient-to-r from-primary-DEFAULT to-secondary-DEFAULT bg-[size:200%] hover:bg-[position:100%_center] focus:ring-2 focus:ring-offset-2 focus:ring-primary-light dark:focus:ring-offset-dark-bg transition-all duration-500 transform hover:scale-105"
                >
                    Go to Form
                </button>
             </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Contact;