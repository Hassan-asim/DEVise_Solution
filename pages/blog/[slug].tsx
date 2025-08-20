import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AnimatedSection from '../../components/AnimatedSection';

interface BlogPost {
  title: string;
  imageUrl: string;
  introduction: string;
  body: string;
  references: { text: string; url: string }[];
}

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // In a real application, you would fetch the markdown content from a server.
        // For now, we will fetch it from the local `blog` directory.
        const response = await fetch(`/blog/${slug}.md`);
        if (!response.ok) {
          throw new Error('Blog post not found');
        }
        const markdownContent = await response.text();

        const apiResponse = await fetch('/api/generate-blog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ markdownContent }),
        });

        if (!apiResponse.ok) {
          throw new Error('Failed to generate blog post');
        }

        const data = await apiResponse.json();
        setPost(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (isLoading) {
    return <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center text-red-500">{error}</div>;
  }

  if (!post) {
    return <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">Blog post not found</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <AnimatedSection>
        <article>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary-dark to-secondary-dark dark:from-primary-light dark:to-secondary-light text-center">
            {post.title}
          </h1>
          <img src={post.imageUrl} alt={post.title} className="mt-8 rounded-lg shadow-lg w-full" />
          <div className="mt-8 prose lg:prose-xl max-w-none">
            <p className="lead">{post.introduction}</p>
            <div dangerouslySetInnerHTML={{ __html: post.body }} />
            <h2 className="text-2xl font-bold mt-8">References</h2>
            <ul>
              {post.references.map((ref, index) => (
                <li key={index}>
                  <a href={ref.url} target="_blank" rel="noopener noreferrer" className="text-primary-DEFAULT hover:underline">
                    {ref.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </AnimatedSection>
    </div>
  );
};

export default BlogPostPage;