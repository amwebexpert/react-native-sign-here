import { Platform, useWindowDimensions } from 'react-native';
import Svg, { G, Rect, SvgRef } from 'react-native-svg';

import { FunctionComponent } from 'react';
import { SvgElement } from '../types/draw-here.types';
import { DEFAULT_CANVAS_DIMENSIONS } from '../utils/constants';
import { ELEMENT_VIEWERS } from './viewer.constants';

type SvgSnapshotProps = {
  elements?: SvgElement[];
  scale?: number;
  onBase64Generated?: (base64: string) => void;
};

const SvgSnapshot: FunctionComponent<SvgSnapshotProps> = ({
  elements = [],
  scale = 1,
  onBase64Generated = () => {},
}) => {
  const { width } = useWindowDimensions();
  const offScreenStyle = { position: 'absolute', left: width, top: 0 };

  // as soon as we have a ref to the generated svg, we can take a
  // snapshot and callback onBase64Generated with the result
  const onRefUpdate = (ref?: SvgRef | null) => {
    if (!ref?.props?.width) return;

    if (Platform.OS === 'ios') {
      // Dont know why if we do not log this, the ref does not get updated
      console.log('====>>> onRefUpdate', { elements: elements.length, scale, width: ref.props.width });
    }
    ref.toDataURL(onBase64Generated, DEFAULT_CANVAS_DIMENSIONS);
  };

  return (
    <Svg style={offScreenStyle} height="100%" width="100%" ref={onRefUpdate}>
      <Rect x="0" y="0" height="100%" width="100%" stroke="black" strokeWidth="4" fill="white" />

      <G scale={scale}>
        {elements.map(item => {
          const ElementViewer = ELEMENT_VIEWERS.get(item.type);
          return ElementViewer ? <ElementViewer key={item.id} {...item} /> : null;
        })}
      </G>
    </Svg>
  );
};

export default SvgSnapshot;
