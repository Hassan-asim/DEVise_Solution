import React from 'react';
import banner from './horizontal banner.jpg';

const FooterBanner: React.FC = () => {
  return (
    <div 
      className="relative h-48 bg-cover bg-center"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="absolute inset-0 bg-black/60 dark:bg-black/70"></div>
      <div className="absolute bottom-4 left-4 z-10 text-sm text-white">
        <p>&copy; {new Date().getFullYear()} DEVise Solutions. All rights reserved.</p>
      </div>
    </div>
  );
};

export default FooterBanner;