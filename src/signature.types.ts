export const SINGLE_TAP_MAX_DISTANCE = 5;

export const PathSimplificationConfigs = { tolerance: 0.2, highQuality: true } as const;

export enum SvgElementType {
  path = 'path',
  circle = 'circle',
}

export interface SvgElement {
  id: number;
  type: SvgElementType;
  strokeColor?: string;
  strokeWidth?: number;
  fill?: string;
}

export interface SvgPathElement extends SvgElement {
  type: SvgElementType.path;
  d: string;
}

export interface SvgCircleElement extends SvgElement {
  type: SvgElementType.circle;
  cx: number;
  cy: number;
  radius: number;
}

export const isPath = (element?: SvgElement): element is SvgPathElement => element?.type === SvgElementType.path;

export const isCircle = (element?: SvgElement): element is SvgCircleElement => element?.type === SvgElementType.circle;
