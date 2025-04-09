import React from 'react';

type UnsupportedLayerProps = {
  layerType: string;
  style?: React.CSSProperties;
};

const UnsupportedLayer = ({ layerType, style }: UnsupportedLayerProps) => {
  return (
    <div
      role="region"
      aria-label="Unsupported Layer"
      style={{ color: 'red', ...style }}>
      Unsupported layer type: {layerType}
    </div>
  );
};

export { UnsupportedLayer };
