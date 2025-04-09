import React from 'react';

type SlideProps = {
  children: React.ReactNode;
  style: React.CSSProperties;
  ariaLabel?: string;
};

const SlideLayer = ({ children, style, ariaLabel }: SlideProps) => {
  return (
    <div role="group" aria-label={ariaLabel} style={style}>
      {children}
    </div>
  );
};

export { SlideLayer };
