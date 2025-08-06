/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'react-native-svg' {
  import React, { Component } from 'react';

  export interface SvgProps {
    width?: number | string;
    height?: number | string;
    viewBox?: string;
    children?: React.ReactNode;
    style?: any;
    ref?: any;
  }

  export interface PathProps {
    d?: string;
    stroke?: string;
    strokeWidth?: number | string;
    fill?: string;
    children?: React.ReactNode;
  }

  export interface CircleProps {
    cx?: number | string;
    cy?: number | string;
    r?: number | string;
    stroke?: string;
    strokeWidth?: number | string;
    fill?: string;
    children?: React.ReactNode;
  }

  export interface RectProps {
    x?: number | string;
    y?: number | string;
    width?: number | string;
    height?: number | string;
    stroke?: string;
    strokeWidth?: number | string;
    fill?: string;
    children?: React.ReactNode;
  }

  export interface GProps {
    scale?: number;
    children?: React.ReactNode;
  }

  export interface SvgRef {
    toDataURL: (callback: (base64: string) => void, dimensions: { width: number; height: number }) => void;
    props: SvgProps;
  }

  const Svg: React.ComponentType<SvgProps>;
  const Path: React.ComponentType<PathProps>;
  const Circle: React.ComponentType<CircleProps>;
  const Rect: React.ComponentType<RectProps>;
  const G: React.ComponentType<GProps>;

  export { Svg, Path, Circle, Rect, G };
  export default Svg;
}

declare module 'react-native-gesture-handler' {
  import React, { Component } from 'react';

  export interface GestureDetectorProps {
    gesture: any;
    children: React.ReactNode;
  }

  export class GestureDetector extends Component<GestureDetectorProps> {}

  export class Gesture {
    static Pan(): any;
    static Tap(): any;
    static Race(...gestures: any[]): any;
  }
}

declare module 'react-native-reanimated' {
  import React, { Component } from 'react';

  export interface SharedValue<T> {
    value: T;
  }

  export function useSharedValue<T>(initialValue: T): SharedValue<T>;
  export function runOnJS<T extends (...args: any[]) => any>(fn: T): T;
  export function useAnimatedProps<T>(props: T): T;

  export default class Animated extends Component<any> {
    static createAnimatedComponent(component: any): any;
    static View: any;
  }
}
