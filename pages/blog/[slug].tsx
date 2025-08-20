import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import AnimatedSection from '../../components/AnimatedSection';

interface BlogData {
  title: string;
  imageUrl: string;
  introduction: string;
  body: string;
  references: { text: string; url: string }[];
}

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blogData, setBlogData] = useState<BlogData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogContent = async () => {
      try {
        const response = await fetch(`/api/get-blog-content?slug=${slug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch blog content');
        }
        const data: BlogData = await response.json();
        setBlogData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      }
    };

    if (slug) {
      fetchBlogContent();
    }
  }, [slug]);

  if (error) {
    return <div className="text-red-500 text-center py-10">Error: {error}</div>;
  }

  if (!blogData) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <article className="max-w-4xl mx-auto">
        <AnimatedSection>
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4">{blogData.title}</h1>
        </AnimatedSection>

        <AnimatedSection>
          <img src={blogData.imageUrl} alt={blogData.title} className="w-full h-auto object-cover rounded-lg shadow-lg my-8" />
        </AnimatedSection>

        <AnimatedSection>
          <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary mb-8">{blogData.introduction}</p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown
              components={{
                h1: ({node, ...props}) => <h1 className="text-3xl font-bold my-4" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-2xl font-bold my-4" {...props} />,
                p: ({node, ...props}) => <p className="my-4" {...props} />,
                a: ({node, ...props}) => <a className="text-primary-dark dark:text-primary-light hover:underline" {...props} />,
              }}
            >
              {blogData.body}
            </ReactMarkdown>
          </div>
        </AnimatedSection>

        {blogData.references && blogData.references.length > 0 && (
          <AnimatedSection>
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4">References</h2>
              <ul className="list-disc list-inside">
                {blogData.references.map((ref, index) => (
                  <li key={index}>
                    <a href={ref.url} target="_blank" rel="noopener noreferrer" className="text-primary-dark dark:text-primary-light hover:underline">
                      {ref.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        )}
      </article>
    </div>
  );
};

export default BlogPost;