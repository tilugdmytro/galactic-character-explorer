import React, { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface CustomLinkProps {
  to: string;
  children: ReactNode;
}

export const CustomLink: React.FC<CustomLinkProps> = ({ to, children }) => {
  return (
    <RouterLink to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
      {children}
    </RouterLink>
  );
};
