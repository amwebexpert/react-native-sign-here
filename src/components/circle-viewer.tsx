import React from "react";
import { Circle } from "react-native-svg";

interface CircleViewerProps {
  cx?: number;
  cy?: number;
  radius?: number;
  strokeColor?: string;
  strokeWidth?: number;
  fill?: string;
}

export const CircleViewer: React.FC<CircleViewerProps> = ({
  cx = 0,
  cy = 0,
  radius = 0,
  strokeColor = "black",
  strokeWidth = 1,
  fill,
}) => (
  <Circle
    cx={cx}
    cy={cy}
    r={radius}
    fill={fill}
    stroke={strokeColor}
    strokeWidth={strokeWidth}
  />
); 