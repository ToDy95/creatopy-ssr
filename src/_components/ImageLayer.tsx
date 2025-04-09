import React from 'react';

type JsonShadow = {
  hShadow: number;
  vShadow: number;
  blur: number;
  color: string;
};

type ImageLayerProps = {
  style: React.CSSProperties;
  url: string;
  dropShadow?: JsonShadow;
  ariaLabel?: string;
};

const ImageLayer = ({ style, url, dropShadow, ariaLabel }: ImageLayerProps) => {
  const shadowStyle = dropShadow
    ? `drop-shadow(${dropShadow.hShadow || 0}px ${dropShadow.vShadow || 0}px ${
        dropShadow.blur || 10
      }px ${dropShadow.color || 'rgba(0,0,0,0.5)'})`
    : undefined;

  return (
    <div
      role="img"
      aria-label={ariaLabel}
      style={{
        ...style,
        backgroundImage: `url(${url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: shadowStyle,
      }}></div>
  );
};

export { ImageLayer };
