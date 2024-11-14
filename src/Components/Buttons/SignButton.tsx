import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  GestureResponderEvent,
} from 'react-native';
// import Microsoft from '../../Images/Svg/microsoft_icon.svg';

interface SignInWithMicrosoftButtonProps {
  onPress: (event: GestureResponderEvent) => void;
}

const SignInWithMicrosoftButton: React.FC<SignInWithMicrosoftButtonProps> = ({
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.iconWrapper}>
        {/* <Microsoft height={10} width={10} color={'#000'}/> */}
        <Image source={require('../../Images/microsoft-icon.png')} style={styles.icon} />
      </View>
      <Text style={styles.text}>Sign in with Microsoft</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 3,
    paddingHorizontal: 15,
    borderRadius: 5,
    // borderWidth: 1,
    // borderColor: '#2F2F2F',
  },
  iconWrapper: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  icon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  text: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SignInWithMicrosoftButton;
