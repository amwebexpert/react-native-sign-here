import React from 'react';
import { Path } from 'react-native-svg';

interface PathViewerProps {
  d?: string;
  strokeColor?: string;
  strokeWidth?: number;
  fill?: string;
}

export const PathViewer: React.FC<PathViewerProps> = ({
  d = '',
  strokeColor = 'black',
  strokeWidth = 1,
  fill = 'none',
}) => <Path d={d} stroke={strokeColor} strokeWidth={strokeWidth} fill={fill} />;
