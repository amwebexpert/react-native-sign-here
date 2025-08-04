import pathParser from 'parse-svg-path';

import { SINGLE_TAP_MAX_DISTANCE } from './constants';
import { computeDistance } from './geometry';
import { normalizePath, simplifyPath } from './path-utils';
import { SvgCircleElement, SvgElement, SvgElementType, SvgPathElement } from '../types/draw-here.types';

export const createElementFromPathGesture = ({ d = '', strokeColor = 'black', strokeWidth = 1 }): SvgElement => {
  if (isSimpleTapPath(d)) {
    return buildCircleElementFromSingleTapPath({ d, strokeColor, strokeWidth });
  }

  return buildPathElement({ d, strokeColor, strokeWidth });
};

export const buildPathElement = ({ d = '', strokeColor = 'black', strokeWidth = 1, fill = 'none' }): SvgPathElement => {
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

export const buildCircleElementFromSingleTapPath = ({
  d = '',
  strokeColor = 'black',
  strokeWidth = 1,
}): SvgCircleElement => {
  const commands = pathParser(normalizePath(d));
  const [firstCommand] = commands;
  const [_command, cx, cy] = firstCommand;

  return {
    type: SvgElementType.circle,
    cx,
    cy,
    radius: strokeWidth / 2,
    fill: strokeColor,
    strokeColor,
    strokeWidth: 0,
    id: Date.now(),
  };
};

export const isSimpleTapPath = (d = '') => {
  const commands = pathParser(normalizePath(d));
  if (commands.length !== 2) {
    return false;
  }

  // only M and L commands are allowed for a simple tap
  if (commands.some(([command]) => !['M', 'L'].includes(command))) {
    return false;
  }

  const points = commands.map(([_command, x, y]) => ({ x, y }));
  const [p1, p2] = points;
  const distance = computeDistance({ p1, p2 });

  return distance < SINGLE_TAP_MAX_DISTANCE;
};
