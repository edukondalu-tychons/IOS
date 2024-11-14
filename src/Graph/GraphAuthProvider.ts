import {Client} from '@microsoft/microsoft-graph-client';
import {retrieveAzureToken} from '../Utils/keychainUtils';
// //const { userToken} = useContext(AuthContext)
// // // Used by Graph client to get access tokens

// // // See https://github.com/microsoftgraph/msgraph-sdk-javascript/blob/dev/docs/CustomAuthenticationProvider.md
export class GraphAuthProvider {
  getAccessToken = async () => {
    const token: any = await retrieveAzureToken();
    const parsedToken = JSON.parse(token);
    return parsedToken?.userToken || '';
  };
}

const clientOptions = {
  authProvider: {
    getAccessToken: async () => {
      const token: any = await retrieveAzureToken();
      const parsedToken = JSON.parse(token);
      //console.log(`token`, parsedToken?.userToken);
      return parsedToken?.userToken;
    },
  },
};

// Initialize the client
const graphClient = Client.initWithMiddleware(clientOptions);

export default graphClient;
