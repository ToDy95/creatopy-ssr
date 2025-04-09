import React from 'react';
import { render, screen } from '@testing-library/react';
import Renderer from './Renderer';
import type { JsonDesign } from '../types/JsonDesign.types';
import { TextDecorationEnum } from '../types/JsonDesign.types';

const mockDesign: JsonDesign = {
  properties: {
    name: 'Test Design',
    width: 800,
    height: 600,
    loop: false,
    lastId: 1,
    version: '1.0',
    showGuidelines: false,
    measureUnit: 'px',
    bannerUrl: '',
    useAsClickTag: false,
    backgroundColor: {
      type: 'solid',
      scolor: '#ffffff',
      borderColor: '#000000',
      useBorder: true,
    },
  },
  elements: [
    {
      type: 'slide',
      properties: {
        duration: 5,
        id: 1,
        stopSlide: false,
      },
      elements: [
        {
          type: 'layer',
          layerType: 'text',
          properties: {
            id: 1,
            layerName: 'Test Text',
            x: 100,
            y: 100,
            width: 200,
            height: 50,
            rotation: 0,
            opacity: 100,
            text: 'Hello, World!',
            alignment: 'center',
            contentHeightType: 'auto',
            fontSize: 16,
            lineHeight: 1.5,
            letterSpacing: 0,
            config: {
              type: 'slate',
              nodes: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      text: 'Hello, World!',
                      color: '#000000',
                      textScript: 'none',
                      textDecoration: TextDecorationEnum.NONE,
                      textTransform: 'none',
                      fontSettings: {
                        fontFamily: 'Roboto',
                        fontType: 'google',
                        fontStyle: 'normal',
                        fontPrefix: null,
                        fontWeight: 400,
                        fontUrl: null,
                        fontFaceUrl: null,
                      },
                      typography: 'heading',
                      fontSizePercent: 100,
                    },
                  ],
                },
              ],
            },
            visible: true,
          },
        },
        {
          type: 'layer',
          layerType: 'button',
          properties: {
            id: 2,
            layerName: 'Test Button',
            buttonLabel: 'Click Me',
            html: 'Click Me',
            x: 150,
            y: 150,
            width: 100,
            height: 50,
            rotation: 0,
            opacity: 100,
            visible: true,
            border: {
              radius: 5,
              color: '#00bff3',
              weight: 1,
            },
            labelStyle: {
              fontFamily: 'Roboto',
              fontSize: 16,
              color: '#00bff3',
              fontType: 'google',
              fontStyle: 'normal',
              fontPrefix: null,
              fontWeight: 400,
              fontUrl: null,
              fontFaceUrl: null,
            },
            labelOffsetX: 0,
            labelOffsetY: 0,
          },
        },
      ],
    },
  ],
};

describe('Renderer Component', () => {
  it('renders the Container with correct styles', () => {
    render(<Renderer design={mockDesign} />);
    const container = screen.getByRole('region', { name: 'Design Container' });
    expect(container).toHaveStyle({
      width: '800px',
      height: '600px',
      backgroundColor: '#ffffff',
      border: '1px solid #000000',
    });
  });

  it('renders SlideLayer with child layers', () => {
    render(<Renderer design={mockDesign} />);
    const slideLayer = screen.getByRole('group', { name: 'Slide Layer' });
    expect(slideLayer).toBeInTheDocument();
    expect(slideLayer).toHaveStyle({
      position: 'relative',
      width: '100%',
      height: '100%',
    });
  });

  it('renders TextLayer with correct text and styles', () => {
    render(<Renderer design={mockDesign} />);
    const textLayer = screen.getByRole('textbox', { name: 'Text Layer' });
    expect(textLayer).toBeInTheDocument();
    expect(textLayer).toHaveStyle({
      fontSize: '16px',
      textAlign: 'center',
      fontWeight: 'bold',
    });
  });

  it('renders ButtonLayer with correct label and styles', () => {
    render(<Renderer design={mockDesign} />);
    const buttonLayer = screen.getByRole('button', { name: 'Click Me' });
    expect(buttonLayer).toBeInTheDocument();
    expect(buttonLayer).toHaveStyle({
      borderRadius: '5px',
      border: '1px solid #00bff3',
    });
  });

  it('renders a placeholder for unsupported layer types', () => {
    const unsupportedDesign: JsonDesign = {
      ...mockDesign,
      elements: [
        {
          type: 'slide',
          properties: {
            duration: 5,
            id: 1,
            stopSlide: false,
          },
          elements: [
            {
              type: 'layer',
              layerType: 'unsupported' as any,
              properties: {
                id: 3,
                layerName: 'Unsupported Layer',
                x: 0,
                y: 0,
                width: 100,
                height: 100,
                rotation: 0,
                opacity: 100,
                visible: true,
              } as any,
            },
          ],
        },
      ],
    };

    render(<Renderer design={unsupportedDesign} />);
    expect(
      screen.getByText('Unsupported layer type: unsupported')
    ).toBeInTheDocument();
  });
});
