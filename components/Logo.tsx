import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-DEFAULT rounded-md"
      aria-label="DEVise Solutions Home page"
    >
      <div className="flex-shrink-0">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Stylized left brace - Cyan */}
          <path
            d="M8 3H9C11.5 3 13 4.5 13 7C13 9.5 11.5 11 9 11H8M8 13H9C11.5 13 13 14.5 13 17C13 19.5 11.5 21 9 21H8"
            className="stroke-primary-DEFAULT transition-transform duration-300 group-hover:-translate-x-0.5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Stylized right brace - Adapts to theme */}
          <path
            d="M16 3H15C12.5 3 11 4.5 11 7C11 9.5 12.5 11 15 11H16M16 13H15C12.5 13 11 14.5 11 17C11 19.5 12.5 21 15 21H16"
            className="stroke-current text-light-text dark:text-dark-text transition-transform duration-300 group-hover:translate-x-0.5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="flex flex-col justify-center">
        <span className="text-xl font-bold text-light-text dark:text-dark-text leading-tight">
          <span className="text-primary-DEFAULT">DEV</span>ise
        </span>
        <span className="text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary tracking-[0.2em] uppercase leading-tight -mt-px">
          Solutions
        </span>
      </div>
    </Link>
  );
};

export default Logo;
