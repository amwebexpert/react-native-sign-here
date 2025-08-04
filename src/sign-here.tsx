import React from 'react';

import { PathGestureDrawer } from './components/path-gesture-drawer';
import SvgViewer from './components/svg-viewer';
import { useSignature } from './signature.context';

interface SignHereProps {
  strokeColor?: string;
  strokeWidth?: number;
}

export const SignHere: React.FC<SignHereProps> = ({ strokeColor = 'black', strokeWidth = 1 }) => {
  const { state } = useSignature();

  return (
    <>
      <PathGestureDrawer strokeColor={strokeColor} strokeWidth={strokeWidth} />
      <SvgViewer elements={state.elements} />
    </>
  );
};
