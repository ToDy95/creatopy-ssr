import React from 'react';

type ButtonLayerProps = {
  style: React.CSSProperties;
  labelStyle: React.CSSProperties;
  label: string;
  ariaLabel?: string;
};

const ButtonLayer = ({
  style,
  labelStyle,
  label,
  ariaLabel,
}: ButtonLayerProps) => {
  return (
    <button role="button" aria-label={ariaLabel || label} style={style}>
      <span style={labelStyle}>{label}</span>
    </button>
  );
};

export { ButtonLayer };
