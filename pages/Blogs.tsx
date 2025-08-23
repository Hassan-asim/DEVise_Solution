import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import TechLogosBackground from '../components/TechLogosBackground';

const Blogs: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<string[]>([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('/api/list-blogs');
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        const data = await response.json();
        setBlogPosts(data.files);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        // Optionally, set an error state or display a message to the user
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <div className="relative">
      <TechLogosBackground />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative">
        <AnimatedSection className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary-dark to-secondary-dark dark:from-primary-light dark:to-secondary-light">
            Our Blog
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-light-text-secondary dark:text-dark-text-secondary">
            Insights, tutorials, and news from the DEVise team.
          </p>
        </AnimatedSection>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <AnimatedSection key={post}>
              <Link to={`/blog/${post.replace('.md', '')}`}>
                <div className="group p-6 bg-charcoal dark:bg-light-bg-secondary rounded-lg shadow-md hover:shadow-xl hover:shadow-primary-DEFAULT/20 dark:hover:shadow-secondary-DEFAULT/20 transition-all duration-300 transform hover:-translate-y-1">
                  <h2 className="text-xl font-bold text-white dark:text-charcoal">{post.replace('.md', '')}</h2>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;