import { SvgElement, isCircle, isEllipse, isPath, BoundingBox } from './types';
import { ZERO_BOUNDING_BOX } from './constants';
import {
  computeBoundingBoxOfCircleElement,
  computeBoundingBoxOfEllipseElement,
  computeBoundingBoxOfPathElement,
} from './geometry';
import { toCoordinatesArray } from './path-utils';

export const computeBoundingBox = (element: SvgElement): BoundingBox => {
  if (isPath(element)) {
    return computeBoundingBoxOfPathElement(element, toCoordinatesArray);
  }

  if (isCircle(element)) {
    return computeBoundingBoxOfCircleElement(element);
  }

  if (isEllipse(element)) {
    return computeBoundingBoxOfEllipseElement(element);
  }

  return ZERO_BOUNDING_BOX;
};
