import pathParser from 'parse-svg-path';
import simplify from 'simplify-js';
import { PathSimplificationConfigs, SvgElementType, SvgPathElement } from '../signature.types';

export const simplifyPath = ({
  d = '',
  tolerance = PathSimplificationConfigs.tolerance,
  highQuality = PathSimplificationConfigs.highQuality,
}): string => {
  const points = toCoordinatesArray(d);
  const simplifiedPoints = simplify(points, tolerance, highQuality);

  return fromCoordinatesArray(simplifiedPoints);
};

export const toCoordinatesArray = (d = ''): { x: number; y: number }[] => {
  const path = normalizePath(d);
  return pathParser(path).map(([_command, x, y]) => ({ x, y }));
};

export const fromCoordinatesArray = (points: { x: number; y: number }[]): string => {
  if (!points?.length) {
    return '';
  }

  const [firstPoint, ...restPoints] = points;
  const firstCommand = `M ${firstPoint.x} ${firstPoint.y}`;
  const restCommands = restPoints.map(({ x, y }) => `L ${x} ${y}`);

  return [firstCommand, ...restCommands].join(' ');
};

export const normalizePath = (d = '') => d?.trim().toUpperCase() ?? '';

export const buildPathElement = ({
  d = '',
  strokeColor = 'black',
  strokeWidth = 1,
  fill = 'none',
}): SvgPathElement => {
  const id = Date.now();
  const simplifiedPath = simplifyPath({ d });

  return {
    type: SvgElementType.path,
    d: simplifiedPath,
    strokeColor,
    strokeWidth,
    fill,
    id,
  };
};
