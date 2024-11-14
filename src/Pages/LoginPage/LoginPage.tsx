import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScaledSize,
} from 'react-native';
import { AuthContext } from '../../Context/AuthContext';
import LoginHeader from '../../Components/LoginHeader/LoginHeader';
import SignInWithMicrosoftButton from '../../Components/Buttons/SignButton';
import Footer from '../../Components/FloatingButton/Footer';

const LoginPage: React.FC = () => {
  const { SignIn } = useContext(AuthContext);
  const [width, setWidth] = useState<number>(Dimensions.get('window').width);

  useEffect(() => {
      const handleDimensionsChange = ({ window: { width } }: { window: ScaledSize }) => {
          setWidth(width);
      };

      const subscription = Dimensions.addEventListener('change', handleDimensionsChange);

      return () => {
          subscription?.remove();
      };
  }, []);


  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go Exit ?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => BackHandler.exitApp(),
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <ImageBackground
      source={require('../../Images/login-bg.jpg')}
      resizeMode="cover"
      style={[styles.loginContainer, {}]}>
      <LoginHeader time={1000}>
        <ImageBackground
          source={require('../../Images/logo.png')}
          resizeMode="cover"
          style={{height: 100, width: 200}}
        />
      </LoginHeader>

      <LoginHeader time={2000}>
        <SignInWithMicrosoftButton onPress={SignIn} />
      </LoginHeader>

      <Footer />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    display: 'flex',
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default LoginPage;
