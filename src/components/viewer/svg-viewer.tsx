import React, { FunctionComponent } from 'react';
import { StyleSheet } from 'react-native';
import Svg from 'react-native-svg';

import { SvgElement } from '../../types/draw-here.types';
import { ELEMENT_VIEWERS } from './viewer.constants';

interface SvgViewerProps {
  elements?: SvgElement[];
}

const SvgViewer: FunctionComponent<SvgViewerProps> = ({ elements = [] }) => (
  <Svg style={styles.container} height="100%" width="100%">
    {elements.map(item => {
      const ElementViewer = ELEMENT_VIEWERS.get(item.type);
      return ElementViewer ? <ElementViewer key={item.id} {...item} /> : null;
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
