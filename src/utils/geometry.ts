import { AspectRatio, BoundingBox, CanvasDimensions, XYCoordinates } from './types';
import { ZERO_BOUNDING_BOX } from './constants';
import { DEFAULT_CANVAS_DIMENSIONS, SVG_SNAPSHOT_SCALE_FACTOR, ZERO_COORDINATES } from './constants';

type MaxDimensionsForAspectRatioInputTypes = {
  width: number;
  height: number;
  targetDimensionsForScale?: AspectRatio;
};

export const computeMaxDimensionsForAspectRatio = (inputs: MaxDimensionsForAspectRatioInputTypes): CanvasDimensions => {
  const { width, height, targetDimensionsForScale = DEFAULT_CANVAS_DIMENSIONS } = inputs;
  const computedHeightBasedOnWidth = (width * targetDimensionsForScale.height) / targetDimensionsForScale.width;
  const computedWidthBasedOnHeight = (height * targetDimensionsForScale.width) / targetDimensionsForScale.height;

  if (computedHeightBasedOnWidth <= height) {
    // take full width and adjust height
    const screenScale = width / targetDimensionsForScale.width;
    const snapshotScale = (targetDimensionsForScale.width / width) * SVG_SNAPSHOT_SCALE_FACTOR;
    return { width, height: computedHeightBasedOnWidth, snapshotScale, screenScale };
  }

  // take full height and adjust width
  const screenScale = height / targetDimensionsForScale.height;
  const snapshotScale = (targetDimensionsForScale.height / height) * SVG_SNAPSHOT_SCALE_FACTOR;
  return { width: computedWidthBasedOnHeight, height, snapshotScale, screenScale };
};

export const computeDistance = ({ p1, p2 }: { p1?: XYCoordinates; p2?: XYCoordinates } = {}) => {
  const point1 = p1 ?? ZERO_COORDINATES;
  const point2 = p2 ?? ZERO_COORDINATES;

  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;

  return Math.sqrt(dx ** 2 + dy ** 2);
};

export const computeBoundingBoxOfCircleElement = (element: {
  cx?: number;
  cy?: number;
  radius?: number;
}): BoundingBox => {
  const radius = element.radius ?? 0;
  if (radius <= 0) {
    return ZERO_BOUNDING_BOX;
  }

  const size = radius * 2;

  return {
    left: (element.cx ?? 0) - radius,
    top: (element.cy ?? 0) - radius,
    width: size,
    height: size,
  };
};

export const computeBoundingBoxOfEllipseElement = (element: {
  cx?: number;
  cy?: number;
  rx?: number;
  ry?: number;
}): BoundingBox => {
  const rx = element.rx ?? 0;
  const ry = element.ry ?? 0;

  if (rx <= 0 || ry <= 0) {
    return ZERO_BOUNDING_BOX;
  }

  return {
    left: (element.cx ?? 0) - rx,
    top: (element.cy ?? 0) - ry,
    width: rx * 2,
    height: ry * 2,
  };
};

export const computeBoundingBoxOfPathElement = (
  element: { d: string },
  toCoordinatesArray: (d: string) => XYCoordinates[]
): BoundingBox => {
  const points = toCoordinatesArray(element.d);
  const [firstPoint, ...rest] = points;

  const { x, y } = firstPoint;
  const initialInfo = { minX: x, minY: y, maxX: x, maxY: y };

  const infos = rest.reduce(
    (acc, { x, y }) => ({
      minX: Math.min(acc.minX, x),
      minY: Math.min(acc.minY, y),
      maxX: Math.max(acc.maxX, x),
      maxY: Math.max(acc.maxY, y),
    }),
    initialInfo
  );

  const { minX, minY, maxX, maxY } = infos;

  return {
    left: minX,
    top: minY,
    width: maxX - minX,
    height: maxY - minY,
  };
};
