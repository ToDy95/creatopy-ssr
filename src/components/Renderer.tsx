import React from 'react';
import {
  hasText,
  isButton,
  isElement,
  isImage,
  isJsonTextSlateConfigChildren,
  isSlide,
  isText,
  type JsonDesign,
  type JsonElement,
} from '../types/JsonDesign.types';
import { Container } from '../_components/Container';
import { SlideLayer } from '../_components/SlideLayer';
import { TextLayer } from '../_components/TextLayer';
import { ImageLayer } from '../_components/ImageLayer';
import { ButtonLayer } from '../_components/ButtonLayer';
import { UnsupportedLayer } from '../_components/UnsupportedLayer';

type RendererProps = {
  design: JsonDesign;
};

const Renderer = ({ design }: RendererProps) => {
  if (!design || !design.properties) {
    return <div>Error: Invalid design data</div>;
  }

  const { width, height, backgroundColor, name } = design.properties;

  const backgroundStyle: React.CSSProperties = {
    ...(backgroundColor?.type === 'solid' && {
      backgroundColor: backgroundColor.scolor,
    }),
    ...(backgroundColor?.type === 'none' && {
      backgroundColor: 'transparent',
    }),
    ...(backgroundColor?.type === 'image' && {
      backgroundImage: `url(${backgroundColor.url})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }),
  };

  return (
    <Container
      ariaLabel="Design Container"
      style={{
        position: 'relative',
        width: `${width}px`,
        height: `${height}px`,
        overflow: 'hidden',
        ...backgroundStyle,
        border: `1px solid ${backgroundColor?.borderColor || '#000'}`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}>
      {design.elements.map((slide, slideIndex) => {
        if (isSlide(slide)) {
          return (
            <SlideLayer
              key={slideIndex}
              ariaLabel="Slide Layer"
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
              }}>
              {slide.elements.map((layer, layerIndex) => {
                if (isElement(layer)) {
                  const { x, y, width, height, rotation, id } =
                    layer.properties;

                  const style: React.CSSProperties = {
                    position: 'absolute',
                    left: `${x}px`,
                    top: `${y}px`,
                    width: `${width}px`,
                    height: `${height}px`,
                    transform: rotation ? `rotate(${rotation}deg)` : undefined,
                  };

                  switch (layer.layerType) {
                    case 'text':
                      return (
                        <TextLayer
                          key={id || layerIndex}
                          style={{
                            ...style,
                            fontFamily:
                              layer.properties.config?.nodes[0]
                                ?.defaultFontSettings?.fontFamily || 'Arial',
                            fontSize: `${layer.properties.fontSize || 24}px`,
                            color: isJsonTextSlateConfigChildren(
                              layer.properties.config?.nodes[0]?.children[0]
                            )
                              ? layer.properties.config?.nodes[0]?.children[0]
                                  ?.color || '#000'
                              : '#000',
                            textAlign: 'center',
                            fontWeight: 'bold',
                          }}
                          text={
                            isJsonTextSlateConfigChildren(
                              layer.properties.config?.nodes[0]?.children[0]
                            ) &&
                            hasText(
                              layer.properties.config?.nodes[0]?.children[0]
                            )
                              ? layer.properties.config?.nodes[0]?.children[0]
                                  ?.text
                              : 'Placeholder Text'
                          }
                        />
                      );

                    case 'image':
                      return (
                        <ImageLayer
                          key={id || layerIndex}
                          style={style}
                          url={`${process.env.API_IMAGE_URL}/${layer.properties.url}`}
                          dropShadow={layer.properties.dropShadow}
                          ariaLabel={'Image Layer'}
                        />
                      );

                    case 'button':
                      return (
                        <ButtonLayer
                          key={id || layerIndex}
                          style={{
                            ...style,
                            backgroundColor: 'white',
                            borderRadius: `${
                              layer.properties.border?.radius || 5
                            }px`,
                            border: `1px solid ${
                              layer.properties.border?.color || '#00bff3'
                            }`,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          labelStyle={{
                            fontFamily:
                              layer.properties.labelStyle?.fontFamily ||
                              'Roboto',
                            fontSize: `${
                              layer.properties.labelStyle?.fontSize || 16
                            }px`,
                            color:
                              layer.properties.labelStyle?.color || '#00bff3',
                            fontWeight: 'bold',
                          }}
                          label={layer.properties.buttonLabel || 'Button'}
                          ariaLabel={layer.properties.buttonLabel || 'Button'}
                        />
                      );

                    default:
                      return (
                        <UnsupportedLayer
                          key={id || layerIndex}
                          style={style}
                          layerType={layer.layerType}
                        />
                      );
                  }
                } else {
                  return (
                    <UnsupportedLayer
                      key={layerIndex}
                      style={{ color: 'red' }}
                      layerType="Unknown element type"
                    />
                  );
                }
              })}
            </SlideLayer>
          );
        } else {
          return (
            <UnsupportedLayer
              key={slideIndex}
              style={{ color: 'red' }}
              layerType="Unknown slide type"
            />
          );
        }
      })}
    </Container>
  );
};

export default Renderer;
