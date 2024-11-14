import React, {
    createContext,
    useState,
    useEffect,
    ReactNode,
    useCallback,
  } from 'react';
  import {authorize, AuthorizeResult} from 'react-native-app-auth';
  import {
    deleteAzureToken,
    refreshAzureToken,
    retrieveAzureToken,
    storeAzureToken,
  } from '../Utils/keychainUtils';
import { config } from '../Auth/AuthConfig';
import { getUserData } from '../Graph/Schedules/Service';
  
  // Define the types for our AuthContext
  interface AuthContextProps {
    userToken: string | null;
    isLoading: boolean;
    SignIn: () => Promise<void>;
    SignOut: () => Promise<void>;
    activityState: string;
    setActivityState:(arg:string) => void
  }
  
  // Create the context with an initial empty state
  export const AuthContext = createContext<AuthContextProps>({
    userToken: null,
    isLoading: true,
    SignIn: async () => {},
    SignOut: async () => {},
    activityState: '',
    setActivityState:(arg:string) => {}
  });
  
  interface AuthProviderProps {
    children: ReactNode;
  }
  
  // Utility function to store token data
  const useTokenStorage = () => {
    return useCallback(
      async (tokenData: {
        userToken: string;
        refreshToken: string;
        expireTime: string;
        //id: string;
      }) => {
        try {
          await storeAzureToken(tokenData);
        } catch (error) {
          console.error('Failed to save token', error);
          throw error;
        }
      },
      [],
    );
  };
  
  // SignIn function using useCallback
  const useSignIn = (
    setUserToken: (token: string | null) => void,
    setIsLoading: (state: boolean) => void,
  ) => {
    const storeTokenData = useTokenStorage();
  
    return useCallback(async () => {
      try {
        setIsLoading(true);
        const result: AuthorizeResult = await authorize(config);
        if (result) {
          const {accessToken, refreshToken, accessTokenExpirationDate, idToken} = result;
          await storeTokenData({
            userToken: accessToken,
            refreshToken,
            expireTime: accessTokenExpirationDate,
            // id: idToken,
          });
          await getUserData();
          setUserToken(accessToken);
        }
      } catch (error) {
        console.error('SignIn failed', error);
      }
      setIsLoading(false);
    }, [setUserToken]);
  };
  
  // SignOut function using useCallback
  const useSignOut = ( setUserToken: (token: string | null) => void, setIsLoading: (state: boolean) => void) => {
    return useCallback(async () => {
      try {
        await deleteAzureToken();
        setIsLoading(true);
        setUserToken(null);
      } catch (error) {
        console.error('SignOut failed', error);
      }
      setIsLoading(false);
    }, [setUserToken]);
  };
  
  export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [userToken, setUserToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [activityState, setActivityState] = useState('');
  
    const loadToken = useCallback(async () => {
      try {
        const token = await retrieveAzureToken();
        if (token) {
          await refreshAzureToken();
          const parsedToken = JSON.parse(token);
          await getUserData();
          setUserToken(parsedToken?.userToken);
        }
      } catch (error: any) {
        if (error.message.includes('Network error')) {
          console.error('Network error. Please check your connection.');
          // Optionally, show a retry option to the user
        } else {
          console.log('Failed to load token:', error);
          // Optionally, force the user to reauthenticate
          setUserToken(null);
        }
      } finally {
        setIsLoading(false);
      }
    }, []);

  
    // Load token from storage on app launch
    useEffect(() => {
      loadToken();
    }, []);
  
    const SignIn = useSignIn(setUserToken, setIsLoading);
    const SignOut = useSignOut(setUserToken, setIsLoading);
  
    return (
      <AuthContext.Provider value={{userToken, activityState, setActivityState,  SignIn, SignOut, isLoading}}>
        {children}
      </AuthContext.Provider>
    );
  };
  