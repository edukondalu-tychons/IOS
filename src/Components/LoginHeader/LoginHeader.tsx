import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { ViewStyle, Animated } from 'react-native';

type FadeInViewProps = PropsWithChildren<{ style?: ViewStyle, time: number }>;

const LoginHeader: React.FC<FadeInViewProps> = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: props.time,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
};

export default LoginHeader;
