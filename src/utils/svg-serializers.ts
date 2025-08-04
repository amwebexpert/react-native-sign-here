import { toDeviceDependentPixel, toDeviceIndependentPixel } from './path-utils';
import { SvgElement, SvgElementType, isCircle, isEllipse, isPath } from '../types/draw-here.types';

export type XmlAttributeName = `@_${string}`;
export type XmlAttributes = Record<XmlAttributeName, string>;

export type extractAttributeArgs<T extends XmlAttributes = XmlAttributes> = {
  xmlElementAttributes: T;
  key: keyof T;
};

export const extractNumericAttribute = <T extends XmlAttributes = XmlAttributes>({
  xmlElementAttributes,
  key,
}: extractAttributeArgs<T>): number | undefined => {
  return key in xmlElementAttributes ? Number(xmlElementAttributes[key]) : undefined;
};

export const extractColorAttribute = <T extends XmlAttributes = XmlAttributes>({
  xmlElementAttributes,
  key,
}: extractAttributeArgs<T>): string => {
  const attributeValue = (xmlElementAttributes[key] as string) ?? 'none';
  return attributeValue === 'undefined' ? 'none' : attributeValue;
};

export type SerializerInputs = {
  element: SvgElement;
  screenScale?: number;
};

export type DeserializerInputs = {
  xmlElementAttributes: XmlAttributes;
  screenScale?: number;
};

export type XmlSerializer = (inputs: SerializerInputs) => string;
export type XmlDeserializer = (inputs: DeserializerInputs) => SvgElement | undefined;

export type XmlSerializationHandler = {
  serializer: XmlSerializer;
  deserializer: XmlDeserializer;
};

// Path Serializer
export const pathSerializer: XmlSerializer = ({ element, screenScale = 1 }) => {
  if (!isPath(element)) {
    throw new Error(`Cannot serialize non-path element: ${JSON.stringify(element)}`);
  }

  const { id, d, strokeColor = 'black', strokeWidth = 1, fill = 'none' } = element;
  const normalizedPath = toDeviceIndependentPixel({ d, screenScale });

  return `<path id="${id}" d="${normalizedPath}" stroke="${strokeColor}" stroke-width="${strokeWidth}" fill="${fill}" />`;
};

export const pathDeserializer: XmlDeserializer = ({ xmlElementAttributes, screenScale = 1 }) => {
  const d = toDeviceDependentPixel({ d: xmlElementAttributes['@_d'], screenScale });
  const id = extractNumericAttribute({ xmlElementAttributes, key: '@_id' }) ?? 0;
  const strokeColor = extractColorAttribute({ xmlElementAttributes, key: '@_stroke' });
  const strokeWidth = extractNumericAttribute({ xmlElementAttributes, key: '@_stroke-width' }) ?? 0;
  const fill = extractColorAttribute({ xmlElementAttributes, key: '@_fill' });

  return { type: SvgElementType.path, id, d, strokeColor, strokeWidth, fill };
};

// Circle Serializer
export const circleSerializer: XmlSerializer = ({ element, screenScale = 1 }) => {
  if (!isCircle(element)) {
    throw new Error(`Cannot serialize non-circle element: ${JSON.stringify(element)}`);
  }

  const { id, cx, cy, radius, strokeColor = 'none', strokeWidth = 0, fill = 'none' } = element;
  const x = cx / screenScale;
  const y = cy / screenScale;
  const r = radius / screenScale;

  return `<circle id="${id}" cx="${x}" cy="${y}" r="${r}" stroke="${strokeColor}" stroke-width="${strokeWidth}" fill="${fill}" />`;
};

export const circleDeserializer: XmlDeserializer = ({ xmlElementAttributes, screenScale = 1 }) => {
  const cx = extractNumericAttribute({ xmlElementAttributes, key: '@_cx' }) ?? 0 * screenScale;
  const cy = extractNumericAttribute({ xmlElementAttributes, key: '@_cy' }) ?? 0 * screenScale;
  const radius = extractNumericAttribute({ xmlElementAttributes, key: '@_r' }) ?? 0 * screenScale;
  const id = extractNumericAttribute({ xmlElementAttributes, key: '@_id' }) ?? 0;
  const strokeColor = extractColorAttribute({ xmlElementAttributes, key: '@_stroke' });
  const strokeWidth = extractNumericAttribute({ xmlElementAttributes, key: '@_stroke-width' }) ?? 0;
  const fill = extractColorAttribute({ xmlElementAttributes, key: '@_fill' });

  return {
    type: SvgElementType.circle,
    id,
    cx: cx * screenScale,
    cy: cy * screenScale,
    radius: radius * screenScale,
    strokeColor,
    strokeWidth,
    fill,
  };
};

// Ellipse Serializer
export const ellipseSerializer: XmlSerializer = ({ element, screenScale = 1 }) => {
  if (!isEllipse(element)) {
    throw new Error(`Cannot serialize non-ellipse element: ${JSON.stringify(element)}`);
  }

  const { id, cx, cy, rx, ry, strokeColor = 'none', strokeWidth = 0, fill = 'none' } = element;
  const sCx = cx / screenScale;
  const sCy = cy / screenScale;
  const sRx = rx / screenScale;
  const sRy = ry / screenScale;

  return `<ellipse id="${id}" cx="${sCx}" cy="${sCy}" rx="${sRx}" ry="${sRy}" stroke="${strokeColor}" stroke-width="${strokeWidth}" fill="${fill}" />`;
};

export const ellipseDeserializer: XmlDeserializer = ({ xmlElementAttributes, screenScale = 1 }) => {
  const cx = extractNumericAttribute({ xmlElementAttributes, key: '@_cx' }) ?? 0 * screenScale;
  const cy = extractNumericAttribute({ xmlElementAttributes, key: '@_cy' }) ?? 0 * screenScale;
  const rx = extractNumericAttribute({ xmlElementAttributes, key: '@_rx' }) ?? 0 * screenScale;
  const ry = extractNumericAttribute({ xmlElementAttributes, key: '@_ry' }) ?? 0 * screenScale;
  const id = extractNumericAttribute({ xmlElementAttributes, key: '@_id' }) ?? 0;
  const strokeColor = extractColorAttribute({ xmlElementAttributes, key: '@_stroke' });
  const strokeWidth = extractNumericAttribute({ xmlElementAttributes, key: '@_stroke-width' }) ?? 0;
  const fill = extractColorAttribute({ xmlElementAttributes, key: '@_fill' });

  return {
    type: SvgElementType.ellipse,
    id,
    cx: cx * screenScale,
    cy: cy * screenScale,
    rx: rx * screenScale,
    ry: ry * screenScale,
    strokeColor,
    strokeWidth,
    fill,
  };
};

export const PATH_SERIALIZER: XmlSerializationHandler = { serializer: pathSerializer, deserializer: pathDeserializer };
export const CIRCLE_SERIALIZER: XmlSerializationHandler = {
  serializer: circleSerializer,
  deserializer: circleDeserializer,
};
export const ELLIPSE_SERIALIZER: XmlSerializationHandler = {
  serializer: ellipseSerializer,
  deserializer: ellipseDeserializer,
};
