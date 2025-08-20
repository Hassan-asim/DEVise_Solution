import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.jpg';

const Logo: React.FC = () => {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-DEFAULT rounded-md"
      aria-label="DEVise Solutions Home page"
    >
      <div className="flex-shrink-0">
        <img src={logo} alt="DEVise Solutions Logo" className="h-8 w-auto rounded-full" />
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