import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
type NavigationProps = {
  navigation: NavigationProp<any>;
};

function withNavigation<P>(WrappedComponent: any) {
  return function WithNavigationComponent(props: P) {
    const navigation = useNavigation<NavigationProp<any>>();
    return <WrappedComponent {...(props as P)} navigation={navigation} />;
  };
}

export default withNavigation;
