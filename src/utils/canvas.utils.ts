import pathParser from 'parse-svg-path';
import { SINGLE_TAP_MAX_DISTANCE, SvgElement } from '../signature.types';
import { buildCircleElementFromSingleTapPath } from './svg-circle.utils';
import { buildPathElement, normalizePath } from './svg-path.utils';

export const computeDistance = ({ p1 = { x: 0, y: 0 }, p2 = { x: 0, y: 0 } }) => {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;

  return Math.sqrt(dx ** 2 + dy ** 2);
};

export const isSimpleTapPath = (d = '') => {
  const commands = pathParser(normalizePath(d));
  if (commands.length !== 2) {
    return false;
  }

  // only M and L commands are allowed for a simple tap
  if (commands.some(([command]: [string, number, number]) => !['M', 'L'].includes(command))) {
    return false;
  }

  const points = commands.map(([_command, x, y]: [string, number, number]) => ({ x, y }));
  const [p1, p2] = points;
  const distance = computeDistance({ p1, p2 });

  return distance < SINGLE_TAP_MAX_DISTANCE;
};

export const createElementFromPathGesture = ({ d = '', strokeColor = 'black', strokeWidth = 1 }): SvgElement => {
  if (isSimpleTapPath(d)) {
    return buildCircleElementFromSingleTapPath({ d, strokeColor, strokeWidth });
  }

  return buildPathElement({ d, strokeColor, strokeWidth });
};
