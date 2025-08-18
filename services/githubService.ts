
import { Project } from '../types';

const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    name: 'AI-Powered E-commerce Analytics',
    description: 'A comprehensive dashboard that uses machine learning to predict sales trends, analyze customer behavior, and provide actionable insights for an e-commerce platform. Built with React, D3.js, and a Python backend.',
    media: ['https://picsum.photos/seed/project1/600/400'],
    githubUrl: 'https://github.com/Hassan-Asim',
    liveUrl: '#',
    tags: ['AI/ML', 'React', 'Python', 'E-commerce'],
  },
  {
    id: 2,
    name: 'TaskFlow - Automation Suite',
    description: 'A custom business process automation tool designed to streamline internal workflows, from data entry to report generation. Integrated with various third-party APIs to create a seamless operational flow.',
    media: ['https://picsum.photos/seed/project2/600/400'],
    githubUrl: 'https://github.com/HassanAliSajid',
    tags: ['Automation', 'Node.js', 'API Integration'],
  },
  {
    id: 3,
    name: 'HealthConnect Mobile App',
    description: 'A cross-platform mobile application for patients to connect with doctors, book appointments, and manage their health records securely. Developed using React Native for a consistent experience on iOS and Android.',
    media: ['https://picsum.photos/seed/project3/600/400'],
    githubUrl: 'https://github.com/Hassan-Asim',
    liveUrl: '#',
    tags: ['Mobile App', 'React Native', 'Healthcare'],
  },
  {
    id: 4,
    name: 'DEVise Solutions Official Website',
    description: 'The very website you are browsing now. A modern, performant, and responsive showcase of our capabilities, built with React, TypeScript, and Tailwind CSS, featuring a Gemini-powered chatbot.',
    media: ['https://picsum.photos/seed/project4/600/400'],
    githubUrl: 'https://github.com/HassanAliSajid',
    liveUrl: '#',
    tags: ['Web Dev', 'React', 'Gemini API', 'Portfolio'],
  },
];

export const fetchProjects = async (): Promise<Project[]> => {
  // In a real application, this would be an API call to GitHub
  // e.g., using Octokit.js to fetch repositories and their contents.
  console.log('Fetching mock project data...');
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(MOCK_PROJECTS);
    }, 500); // Simulate network delay
  });
};
