import React, { forwardRef, useImperativeHandle } from 'react';

import { useDrawing } from '../draw.context';
import { DrawHereProps, DrawHereRef } from '../types/draw-here.types';
import { PathGestureDrawer } from './path-gesture-drawer';
import SvgViewer from './svg-viewer';

export const DrawingCanvas = forwardRef<DrawHereRef, DrawHereProps>(
  ({ strokeColor = 'black', strokeWidth = 1 }, ref) => {
    const { state, clear, undo, reset, exportAs, importSvg } = useDrawing();

    useImperativeHandle(ref, () => ({ clear, undo, reset, exportAs, importSvg }));

    return (
      <>
        <PathGestureDrawer strokeColor={strokeColor} strokeWidth={strokeWidth} />
        <SvgViewer elements={state.elements} />
      </>
    );
  }
);
