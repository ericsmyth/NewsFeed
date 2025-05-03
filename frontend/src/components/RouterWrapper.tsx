import { HashRouter } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';

interface RouterWrapperProps {
  children: ReactNode;
}

export const RouterWrapper = ({ children }: RouterWrapperProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <HashRouter>{children}</HashRouter>;
};

export default RouterWrapper; 