import { PixelRatio, Platform } from 'react-native';
import { DEFAULT_ASPECT_RATIO } from './types';

// @see https://github.com/software-mansion/react-native-svg/issues/855#issuecomment-445340830
export const SVG_SNAPSHOT_SCALE_FACTOR = Platform.select({ ios: 1, android: 1 / PixelRatio.get() }) ?? 1;

// @see https://www.selfemployedartist.com/blog/best-canvas-sizes
export const DEFAULT_CANVAS_DIMENSIONS = {
  width: DEFAULT_ASPECT_RATIO.width * 100,
  height: DEFAULT_ASPECT_RATIO.height * 100,
  snapshotScale: SVG_SNAPSHOT_SCALE_FACTOR,
  screenScale: 1,
} as const;

export const ZERO_DIMENSIONS = { width: 0, height: 0, snapshotScale: 1, screenScale: 1 } as const;
export const ZERO_BOUNDING_BOX = { left: 0, top: 0, width: 0, height: 0 } as const;
export const CANVAS_WRAPPER_PADDING = 8;

export const ZERO_COORDINATES = { x: 0, y: 0 } as const;

export const SINGLE_TAP_MAX_DISTANCE = 5;

export const DEFAULT_SELECTION_DASH_ARRAY = '3, 3';

// @see http://mourner.github.io/simplify-js/
export const PathSimplificationConfigs = Object.freeze({ tolerance: 0.2, highQuality: true });
