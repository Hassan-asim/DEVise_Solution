import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { NAV_LINKS } from '../constants';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';

const Header: React.FC = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-lg flex-none transition-colors duration-500 lg:z-50 border-b border-slate-900/10 dark:border-slate-50/[0.06] bg-light-bg/80 dark:bg-dark-bg/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <Logo />
          <div className="hidden lg:flex items-center space-x-6">
            <nav className="flex space-x-6">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative text-sm font-medium transition-colors hover:text-primary-DEFAULT group ${
                      isActive
                        ? 'text-primary-DEFAULT'
                        : 'text-light-text-secondary dark:text-dark-text-secondary'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      <span className={`absolute bottom-[-2px] left-0 w-full h-0.5 bg-gradient-to-r from-primary-DEFAULT to-secondary-DEFAULT transform transition-transform duration-300 ease-out origin-center ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}></span>
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
            <ThemeToggle />
          </div>
          <div className="flex items-center lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="ml-4 p-2 rounded-md text-light-text-secondary dark:text-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-DEFAULT"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="lg:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 ${
                    isActive
                      ? 'text-primary-DEFAULT bg-gray-100 dark:bg-gray-800'
                      : 'text-light-text-secondary dark:text-dark-text-secondary'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
