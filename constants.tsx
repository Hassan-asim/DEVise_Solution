import React from 'react';
import { Founder, Service } from './types';
import SufiImg from './components/sufi_hassan_asim.png';
import HassanImg from './components/hassan_ali_sajid.png';

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Projects', path: '/projects' },
  { name: 'About Us', path: '/about' },
  { name: 'Founders', path: '/founders' },
  { name: 'Payments', path: '/payments' },
  { name: 'Blog', path: '/blogs' },
  { name: 'Contact', path: '/contact' },
];

export const FOUNDERS: Founder[] = [
  {
    name: 'Sufi Hassan Asim',
    email: 'hassanasim337@gmail.com',
    phone: '0330-5241433',
    linkedin: 'https://www.linkedin.com/in/sufi-hassan-asim',
    github: 'https://github.com/Hassan-Asim',
    image: SufiImg,
  },
  {
    name: 'Hassan Ali Sajid',
    email: 'hassanalisajid786@gmail.com',
    phone: '03008070639',
    linkedin: 'https://www.linkedin.com/in/hassan-ali-sajid',
    github: 'https://github.com/HassanAliSajid',
    image: HassanImg,
  },
];

const CodeBracketSquareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-white dark:text-dark-bg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
    </svg>
);

const CpuChipIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-white dark:text-dark-bg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 21v-1.5M15.75 3v1.5m0 16.5v-1.5m3.75-12H21m-3.75 0h1.5m-1.5 0H21m-3.75 0h1.5m-1.5 4.5H21m-3.75 0h1.5m-1.5 0H21m-3.75 0h1.5m-1.5 4.5H21m-3.75 0h1.5M12 21v-1.5m0-16.5V3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 6.375a1.5 1.5 0 0 0-1.5 1.5v1.5m1.5-3v3m0 0a1.5 1.5 0 0 1-1.5 1.5v1.5m1.5-3v3m0 0a1.5 1.5 0 0 1-1.5 1.5v1.5m1.5-3v3M12 5.25a1.5 1.5 0 0 0-1.5 1.5v12a1.5 1.5 0 0 0 1.5 1.5m0-15a1.5 1.5 0 0 1 1.5 1.5v12a1.5 1.5 0 0 1-1.5 1.5m0-15V3.75m0 16.5V21" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25h.008v.008H12V8.25Zm0 3.75h.008v.008H12v-.008Zm0 3.75h.008v.008H12v-.008Z" />
    </svg>
);

const CogIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-white dark:text-dark-bg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m18 0h-1.5m-15 0H3m18 0h-1.5m-15 0H3m18 0h-1.5m-15 0H3m18 0h-1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" />
    </svg>
);

const LightBulbIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-white dark:text-dark-bg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-1.5c1.4-1.4 1.5-3.375 0-4.5A5.964 5.964 0 0 0 12 3c-1.68 0-3.23.7-4.5 2.25-1.5 1.5-1.4 3.375 0 4.5 1.05.9 2.5 1.5 4.5 1.5Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z" />
    </svg>
);


export const SERVICES: Service[] = [
  {
    title: 'AI & Machine Learning',
    description: 'Leverage the power of artificial intelligence and machine learning to build smart applications, automate processes, and derive actionable insights from your data.',
    icon: <CpuChipIcon />,
  },
  {
    title: 'Web & App Development',
    description: 'We build beautiful, responsive, and high-performance websites and mobile applications tailored to your specific business needs, using the latest technologies.',
    icon: <CodeBracketSquareIcon />,
  },
  {
    title: 'Process Automation',
    description: 'Streamline your business operations, reduce manual effort, and increase efficiency with our custom automation solutions.',
    icon: <CogIcon />,
  },
  {
    title: 'Product Development',
    description: 'From idea to launch, we guide you through the entire product development lifecycle, ensuring a successful and market-ready product.',
    icon: <LightBulbIcon />,
  },
];