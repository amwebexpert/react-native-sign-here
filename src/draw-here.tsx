import React, { forwardRef } from 'react';
import { DrawingCanvas } from './components/drawing-canvas';
import { DrawingProvider } from './draw.context';
import { DrawHereProps, DrawHereRef } from './types/draw-here.types';

const DrawHere = forwardRef<DrawHereRef, DrawHereProps>((props, ref) => {
  const { onChange, ...otherProps } = props;

  return (
    <DrawingProvider onChange={onChange}>
      <DrawingCanvas ref={ref} {...otherProps} />
    </DrawingProvider>
  );
});

export default DrawHere;
