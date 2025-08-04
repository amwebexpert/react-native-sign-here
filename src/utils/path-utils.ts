import pathParser from 'parse-svg-path';
import simplify from 'simplify-js';

import { PathSimplificationConfigs } from './constants';
import { XYCoordinates } from '../types/draw-here.types';

export const normalizePath = (d = '') => d?.trim().toUpperCase() ?? '';

export const toCoordinatesArray = (d = ''): XYCoordinates[] => {
  const path = normalizePath(d);
  return pathParser(path).map(([_command, x, y]) => ({ x, y }));
};

export const fromCoordinatesArray = (points: XYCoordinates[]): string => {
  'worklet';

  if (!points?.length) {
    return '';
  }

  const [firstPoint, ...restPoints] = points;
  const firstCommand = `M ${firstPoint.x} ${firstPoint.y}`;
  const restCommands = restPoints.map(({ x, y }) => `L ${x} ${y}`);

  return [firstCommand, ...restCommands].join(' ');
};

export const simplifyPath = ({
  d = '',
  tolerance = PathSimplificationConfigs.tolerance,
  highQuality = PathSimplificationConfigs.highQuality,
}): string => {
  const points = toCoordinatesArray(d);
  const simplifiedPoints = simplify(points, tolerance, highQuality);

  return fromCoordinatesArray(simplifiedPoints);
};

export const toDeviceIndependentPixel = ({ d = '', screenScale = 1 }) => applyScale({ d, scale: 1 / screenScale });
export const toDeviceDependentPixel = ({ d = '', screenScale = 1 }) => applyScale({ d, scale: screenScale });

export const applyScale = ({ d = '', scale = 1 }) => {
  const path = normalizePath(d);
  const commands = pathParser(path).map(([command, ...args]) => {
    const newArgs = args.map(arg => arg * scale);
    return [command, ...newArgs];
  });

  return commands
    .map(([command, ...args]) => `${command} ${args.join(' ')}`)
    .join(' ')
    .trim();
};
