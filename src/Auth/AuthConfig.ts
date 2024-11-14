import { AuthConfiguration } from "react-native-app-auth";

export const AuthConfig = {
  appId: '3647ae69-24f7-43a8-a9e1-bdaa867c519b',
  tenantId: 'df39b915-b72f-429a-8164-4983c27bb320',
  appScopes: [
    'openid',
    'offline_access',
    'profile',
    'User.Read',
    'MailboxSettings.Read',
    "Calendars.Read",
    "Calendars.Read.Shared",
    "Calendars.ReadWrite",
    "Calendars.ReadWrite.Shared"
  ],
};


export const config: AuthConfiguration = {
  clientId: AuthConfig.appId,
  redirectUrl: 'assaabloy://react-native-auth/',
  scopes: AuthConfig.appScopes,
  additionalParameters: {prompt: 'select_account'},
  serviceConfiguration: {
    authorizationEndpoint: `https://login.microsoftonline.com/${AuthConfig.tenantId}/oauth2/v2.0/authorize`,
    tokenEndpoint: `https://login.microsoftonline.com/${AuthConfig.tenantId}/oauth2/v2.0/token`,
  },
};
