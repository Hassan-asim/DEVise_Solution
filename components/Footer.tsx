import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FOUNDERS } from '../constants';
import { sendContactEmail, sendEmailFallback, validateContactForm, ContactFormData } from '../services/gmailService';

const Footer: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('');
    setErrors([]);

    try {
      // Validate form data
      const validation = validateContactForm(formData);
      if (!validation.isValid) {
        setErrors(validation.errors);
        setIsLoading(false);
        return;
      }

      // Send email via Gmail API
      const result = await sendContactEmail(formData);

      if (result.success) {
        setStatus(result.message);
        setFormData({ name: '', email: '', message: '' });
        // Clear success message after 8 seconds
        setTimeout(() => setStatus(''), 8000);
      } else {
        setErrors([result.message]);
      }

    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors(['An unexpected error occurred. Please try again.']);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailFallback = () => {
    // Validate first
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    // Use mailto fallback
    sendEmailFallback(formData);
    setStatus('Opening your email client... Please send the email from there.');
    setTimeout(() => setStatus(''), 5000);
  };

  return (
    <footer id="footer-form" className="bg-light-bg-secondary dark:bg-dark-bg-secondary relative border-t border-slate-200 dark:border-slate-800">
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-DEFAULT to-secondary-DEFAULT"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold text-light-text dark:text-dark-text">
              DEV<span className="text-primary-DEFAULT">ise</span> Solutions
            </h3>
            <p className="mt-4 text-light-text-secondary dark:text-dark-text-secondary">
              Your Vision, Our Code.
            </p>
            <div className="mt-6 flex space-x-4">
              {FOUNDERS.map(founder => (
                 <div key={founder.name} className="flex space-x-3">
                    <a href={founder.github} target="_blank" rel="noopener noreferrer" className="text-light-text-secondary hover:text-primary-DEFAULT dark:text-dark-text-secondary dark:hover:text-primary-light transition-colors">
                        <span className="sr-only">GitHub</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                        </svg>
                    </a>
                    <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" className="text-light-text-secondary hover:text-primary-DEFAULT dark:text-dark-text-secondary dark:hover:text-primary-light transition-colors">
                        <span className="sr-only">LinkedIn</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                    </a>
                 </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text">Get in Touch</h3>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-2 bg-light-bg dark:bg-dark-bg border border-slate-300 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-primary-DEFAULT focus:border-transparent transition"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-2 bg-light-bg dark:bg-dark-bg border border-slate-300 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-primary-DEFAULT focus:border-transparent transition"
                />
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows={4}
                required
                className="w-full px-4 py-2 bg-light-bg dark:bg-dark-bg border border-slate-300 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-primary-DEFAULT focus:border-transparent transition"
              ></textarea>
                            <div className="space-y-4">
                {/* Error Messages */}
                {errors.length > 0 && (
                  <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 rounded-md">
                    <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                      {errors.map((error, index) => (
                        <li key={index}>• {error}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Success Message */}
                {status && (
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-600 rounded-md">
                    <p className="text-sm text-green-700 dark:text-green-300">{status}</p>
                  </div>
                )}

                {/* Submit Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`flex-1 px-6 py-3 font-semibold rounded-md shadow-lg transition-all transform hover:scale-105 ${
                      isLoading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-primary-dark to-secondary-dark text-white hover:ring-2 hover:ring-primary-DEFAULT'
                    }`}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Send message'
                    )}
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleEmailFallback}
                    className="px-6 py-3 bg-light-bg dark:bg-dark-bg-secondary font-semibold rounded-md shadow-lg text-light-text dark:text-dark-text hover:ring-2 hover:ring-primary-DEFAULT transition-all transform hover:scale-105 border border-slate-300 dark:border-slate-600"
                  >
                    Send via Email
                  </button>
                </div>

                <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                  Having trouble? Try the "Use Email Client" option or contact us directly at{' '}
                  <a href="mailto:team@devisesolutions.co" className="text-primary-dark dark:text-primary-light hover:underline">
                    team@devisesolutions.co
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;