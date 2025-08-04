import React, { useEffect } from 'react';
import { type ColorValue, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedProps, useSharedValue } from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { useSignature } from '../signature.context';
import { SINGLE_TAP_MAX_DISTANCE } from '../signature.types';
import { createElementFromPathGesture } from '../utils/canvas.utils';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

interface PathGestureDrawerProps {
  strokeColor?: ColorValue;
  strokeWidth?: number;
  fill?: ColorValue;
}

export const PathGestureDrawer: React.FC<PathGestureDrawerProps> = ({
  strokeColor = 'black',
  strokeWidth = 1,
  fill = 'none',
}) => {
  const { state, addDrawElement, setDirty } = useSignature();
  const { isDrawGestureDirty } = state;
  const currentPath = useSharedValue('');

  useEffect(() => {
    if (isDrawGestureDirty) {
      currentPath.value = '';
      setDirty(false);
    }
  }, [isDrawGestureDirty, setDirty]);

  const addElementFromGesture = (d = '') => {
    const newElement = createElementFromPathGesture({ d, strokeColor: strokeColor as string, strokeWidth });
    addDrawElement(newElement);
  };

  const finalizePath = (pathString: string) => addElementFromGesture(pathString);

  const panGesture = Gesture.Pan()
    .minDistance(SINGLE_TAP_MAX_DISTANCE + 1)
    .onStart(({ x, y }) => {
      'worklet';

      const pathSegment = `M ${x},${y}`; // M = "move to"
      currentPath.value = pathSegment;
    })
    .onUpdate(({ x, y }) => {
      'worklet';

      const pathSegment = `L ${x},${y}`; // L = "line to"
      currentPath.value = `${currentPath.value} ${pathSegment}`;
    })
    .onEnd(() => {
      'worklet';

      runOnJS(finalizePath)(currentPath.value);
    });

  const tapGesture = Gesture.Tap()
    .maxDistance(SINGLE_TAP_MAX_DISTANCE)
    .onStart(({ x, y }) => {
      'worklet';

      const pathSegment = `M ${x},${y} L ${x},${y}`;
      currentPath.value = pathSegment;
    })
    .onEnd(() => {
      'worklet';

      runOnJS(finalizePath)(currentPath.value);
    });

  const animatedProps = useAnimatedProps(() => {
    'worklet';

    return { d: currentPath.value };
  });

  return (
    <View style={styles.container}>
      <GestureDetector gesture={Gesture.Race(tapGesture, panGesture)}>
        <Animated.View style={styles.container}>
          <AnimatedSvg height="100%" width="100%">
            <AnimatedPath
              animatedProps={animatedProps}
              fill={fill}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </AnimatedSvg>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
