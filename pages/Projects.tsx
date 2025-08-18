import React, { useState, useEffect } from 'react';
import { fetchProjects } from '../services/githubService';
import { Project } from '../types';
import AnimatedSection from '../components/AnimatedSection';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    return (
        <div className="group bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg shadow-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl hover:shadow-primary-DEFAULT/20 dark:hover:shadow-secondary-DEFAULT/20">
            <div className="overflow-hidden">
                <img src={project.media[0]} alt={project.name} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 text-xs font-semibold text-dark-bg bg-gradient-to-r from-primary-light to-primary-dark rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
                <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4 h-24 overflow-hidden">
                    {project.description}
                </p>
                <div className="flex justify-between items-center mt-4">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-light-text dark:text-dark-text hover:text-primary-DEFAULT transition-colors group/link inline-flex items-center gap-2">
                        View on GitHub
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 transition-transform group-hover/link:translate-x-1"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                    </a>
                    {project.liveUrl && project.liveUrl !== '#' && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-charcoal text-white dark:bg-primary-DEFAULT dark:text-dark-bg text-sm font-semibold rounded-md hover:opacity-90 dark:hover:bg-primary-dark transition-transform transform hover:scale-105">
                            Live Demo
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};


const Projects: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const data = await fetchProjects();
                setProjects(data);
            } catch (error) {
                console.error("Failed to fetch projects:", error);
            } finally {
                setLoading(false);
            }
        };
        loadProjects();
    }, []);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <AnimatedSection className="text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Our Portfolio</h1>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-light-text-secondary dark:text-dark-text-secondary">
                    A selection of projects that showcase our skills, creativity, and commitment to quality.
                </p>
            </AnimatedSection>
            
            <div className="mt-16">
                {loading ? (
                    <div className="text-center">Loading projects...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {projects.map((project, index) => (
                            <AnimatedSection key={project.id}>
                                <ProjectCard project={project} />
                            </AnimatedSection>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Projects;