import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';

const Blogs: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<string[]>([]);

  useEffect(() => {
    // In a real application, you would fetch the list of blog posts from a server.
    // For now, we will just list the files in the `blog` directory.
    // This is a simplified approach and will not work in production.
    const fetchBlogPosts = async () => {
      // This is a placeholder. We will replace this with a proper implementation later.
      const posts = ['sample-post.md'];
      setBlogPosts(posts);
    };

    fetchBlogPosts();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
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
              <div className="group p-6 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg shadow-md hover:shadow-xl hover:shadow-primary-DEFAULT/20 dark:hover:shadow-secondary-DEFAULT/20 transition-all duration-300 transform hover:-translate-y-1">
                <h2 className="text-xl font-bold">{post.replace('.md', '')}</h2>
              </div>
            </Link>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
};

export default Blogs;