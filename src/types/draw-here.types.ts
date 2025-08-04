import { DrawingState } from '../draw.context';

export type AspectRatio = { width: number; height: number };
export const DEFAULT_ASPECT_RATIO: Readonly<AspectRatio> = { width: 9, height: 16 };

export type CanvasSurface = { width: number; height: number };
export type CanvasDimensions = CanvasSurface & { snapshotScale: number; screenScale: number };

export type XYCoordinates = { x: number; y: number };

export type BoundingBox = { left: number; top: number; width: number; height: number };

export enum SvgElementType {
  path = 'path',
  circle = 'circle',
  rect = 'rect',
  ellipse = 'ellipse',
  line = 'line',
  polyline = 'polyline',
  polygon = 'polygon',
  text = 'text',
}

export interface SvgElement {
  id: number;
  type: SvgElementType;
  strokeColor?: string;
  strokeWidth?: number;
  fill?: string;
  isSelected?: boolean;
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

export interface SvgEllipseElement extends SvgElement {
  type: SvgElementType.ellipse;
  cx: number;
  cy: number;
  rx: number;
  ry: number;
}

export const isPath = (element?: SvgElement): element is SvgPathElement => element?.type === SvgElementType.path;

export const isCircle = (element?: SvgElement): element is SvgCircleElement => element?.type === SvgElementType.circle;

export const isEllipse = (element?: SvgElement): element is SvgEllipseElement =>
  element?.type === SvgElementType.ellipse;

export enum CanvasMode {
  ZOOM_PAN = 'ZOOM_PAN',
  DRAW = 'DRAW',
  SELECTOR = 'SELECTOR',
  TRANSFORM = 'TRANSFORM',
}

export interface DrawHereProps {
  strokeColor?: string;
  strokeWidth?: number;
  onChange?: (state: DrawingState) => void;
}

export enum ExportFormat {
  SVG = 'svg',
  // PNG = 'png', // Not supported yet (stay tuned)
}

export interface DrawHereRef {
  clear: () => void;
  undo: () => void;
  reset: (elements?: SvgElement[]) => void;
  exportAs: (format: ExportFormat) => Promise<string>;
  importSvg: (svg: string) => void;
}

// SignHere is a wrapper around DrawHere that may add additional functionality later
export interface SignHereRef extends DrawHereRef {}
export interface SignHereProps extends DrawHereProps {}
