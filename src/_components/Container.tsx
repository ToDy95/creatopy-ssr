import React from 'react';

type ContainerProps = {
  children: React.ReactNode;
  style: React.CSSProperties;
  ariaLabel?: string;
};

const Container = ({ children, style, ariaLabel }: ContainerProps) => {
  return (
    <div role="region" aria-label={ariaLabel} style={style}>
      {children}
    </div>
  );
};

export { Container };
