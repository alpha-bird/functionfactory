import { CognitoUserPool } from 'amazon-cognito-identity-js';
import 'amazon-cognito-js'
var AWS = require('aws-sdk/dist/aws-sdk-react-native');

const REGION = "us-east-1"
const USER_POOL_ID = 'us-east-1_VCbIk9IOC'
const CLIENT_ID = 'mqji7nlndbt0leg58o0a44foq'

AWS.config.update({
	region: REGION
})
const userData = {
    UserPoolId : USER_POOL_ID,
    ClientId : CLIENT_ID
}

export const BUCKET_NAME = 'kangzeroo-complete-aws-tutorial-pics'
export const userPool = new CognitoUserPool(userData);
export const USERPOOL_ID = 'cognito-idp.'+REGION+'.amazonaws.com/'+USER_POOL_ID
export const IDENTITY_POOL_ID = 'us-east-1:65bd1e7d-546c-4f8c-b1bc-9e3e571cfaa7'
