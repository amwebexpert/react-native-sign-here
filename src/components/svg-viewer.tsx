import React from 'react';
import { StyleSheet } from 'react-native';
import Svg from 'react-native-svg';

import { SvgElement, isCircle, isPath } from '../signature.types';
import { CircleViewer } from './circle-viewer';
import { PathViewer } from './path-viewer';

interface SvgViewerProps {
  elements?: SvgElement[];
}

const SvgViewer: React.FC<SvgViewerProps> = ({ elements = [] }) => (
  <Svg style={styles.container} height="100%" width="100%">
    {elements.map(item => {
      if (isPath(item)) {
        return (
          <PathViewer
            key={item.id}
            d={item.d}
            strokeColor={item.strokeColor}
            strokeWidth={item.strokeWidth}
            fill={item.fill}
          />
        );
      }

      if (isCircle(item)) {
        return (
          <CircleViewer
            key={item.id}
            cx={item.cx}
            cy={item.cy}
            radius={item.radius}
            strokeColor={item.strokeColor}
            strokeWidth={item.strokeWidth}
            fill={item.fill}
          />
        );
      }

      return null;
    })}
  </Svg>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    borderColor: 'black',
    borderWidth: StyleSheet.hairlineWidth,
    elevation: 5,
    position: 'absolute',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    zIndex: -1,
  },
});

export default SvgViewer;
