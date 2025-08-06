import { FunctionComponent } from 'react';
import { SvgElement, SvgElementType } from '../../types/draw-here.types';
import { CircleViewer } from './circle-viewer';
import { PathViewer } from './path-viewer';

export const ELEMENT_VIEWERS: Map<SvgElementType, FunctionComponent<SvgElement>> = new Map([
  [SvgElementType.path, PathViewer],
  [SvgElementType.circle, CircleViewer],
]);
