import React from 'react';

type TextLayerProps = {
  style: React.CSSProperties;
  text: string;
};

const TextLayer = ({ style, text }: TextLayerProps) => {
  return (
    <div role="textbox" aria-label="Text Layer" style={style}>
      {text}
    </div>
  );
};

export { TextLayer };
