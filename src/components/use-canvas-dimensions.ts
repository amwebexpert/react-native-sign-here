import { useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { Dimensions } from '../types/draw-here.types';

export const useCanvasDimensions = () => {
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 });

  const onLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    const { width = 0, height = 0 } = nativeEvent?.layout ?? {};
    setDimensions({ width, height });
  };

  return { dimensions, onLayout };
};
