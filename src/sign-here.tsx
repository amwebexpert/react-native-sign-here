import React, { useEffect } from 'react';
import { useSharedValue } from 'react-native-reanimated';

import { PathGestureDrawer } from './components/path-gesture-drawer';
import SvgViewer from './components/svg-viewer';
import { useSignature } from './signature.context';
import { createElementFromPathGesture } from './utils/canvas.utils';

interface SignHereProps {
  color?: string;
  brushSize?: number;
}

export const SignHere: React.FC<SignHereProps> = ({ color = 'black', brushSize = 1 }) => {
  const { state, addDrawElement, setDirty } = useSignature();
  const { elements, isDrawGestureDirty } = state;
  const gesturePoints = useSharedValue<string[]>([]);

  useEffect(() => {
    if (isDrawGestureDirty) {
      if (gesturePoints.value.length > 0) {
        gesturePoints.value = [];
      }
      setDirty(false);
    }
  }, [isDrawGestureDirty, setDirty]);

  const addElementFromGesture = (d = '') => {
    const newElement = createElementFromPathGesture({
      d,
      strokeColor: color,
      strokeWidth: brushSize,
    });
    addDrawElement(newElement);
  };

  return (
    <>
      <PathGestureDrawer
        gesturePoints={gesturePoints}
        strokeColor={color}
        strokeWidth={brushSize}
        addElementFromGesture={addElementFromGesture}
      />

      <SvgViewer elements={elements} />
    </>
  );
};
