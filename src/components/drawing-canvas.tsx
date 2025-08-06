import React, { forwardRef, useImperativeHandle } from 'react';

import { StyleSheet, View } from 'react-native';
import { useDrawing } from '../draw.context';
import { DrawHereProps, DrawHereRef } from '../types/draw-here.types';
import { PathGestureDrawer } from './path-gesture-drawer';
import { useCanvasDimensions } from './use-canvas-dimensions';
import SvgViewer from './viewer/svg-viewer';

export const DrawingCanvas = forwardRef<DrawHereRef, DrawHereProps>(
  ({ strokeColor = 'black', strokeWidth = 1 }, ref) => {
    const { state, clear, undo, reset, exportSvg, importSvg } = useDrawing();
    const { dimensions, onLayout } = useCanvasDimensions();

    useImperativeHandle(ref, () => ({ clear, undo, reset, importSvg, exportSvg: () => exportSvg(dimensions) }));

    return (
      <View style={styles.container} onLayout={onLayout}>
        <PathGestureDrawer strokeColor={strokeColor} strokeWidth={strokeWidth} />
        <SvgViewer elements={state.elements} />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
