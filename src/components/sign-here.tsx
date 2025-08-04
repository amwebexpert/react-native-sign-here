import React, { forwardRef } from 'react';
import { DrawingProvider } from '../draw.context';
import { DrawHereProps, DrawHereRef } from '../types/draw-here.types';
import { DrawingCanvas } from './drawing-canvas';

export const SignHere = forwardRef<DrawHereRef, DrawHereProps>((props, ref) => {
  return (
    <DrawingProvider>
      <DrawingCanvas ref={ref} {...props} />
    </DrawingProvider>
  );
});

SignHere.displayName = 'SignHere';
