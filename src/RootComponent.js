import React from 'react';
import { Analytics } from '@vercel/analytics/react';

const RootComponent = ({ children }) => {
  return (
    <div>
      {children}
      <Analytics />
    </div>
  );
};

export default RootComponent;
