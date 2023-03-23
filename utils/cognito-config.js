import { Amplify, Auth } from "aws-amplify";
const redirectSignIn = process.env.NEXT_PUBLIC_REDIRECT_SIGNIN_URI;
const redirectSignOut = process.env.NEXT_PUBLIC_REDIRECT_SIGNOUT_URI;

export const cognitoConfig = {
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: "us-east-2:939de7f6-03e1-4a73-bca6-c3c9b6cded14", //changed

    // REQUIRED - Amazon Cognito Region
    region: "us-east-2",

    // OPTIONAL - Amazon Cognito Federated Identity Pool Region
    // Required only if it's different from Amazon Cognito Region
    identityPoolRegion: "us-east-2",

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: "us-east-2_vrxiFfY7Z", //changed

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: "50ngpg4udjdvmo9h1rqn37cel7", //changed
    // userPoolWebClientSecret : "hbroibpv687cvs2kkf3u5p9peev1ho4lds3148kb1tejnafmkqa",
    // OPTIONAL - Hosted UI configuration
    oauth: {
      domain: "https://active-studio.vercel.app", //changed
      // scope: [
      //     'phone',
      //     'email',
      //     'profile',
      //     'openid'
      // ],
      redirectSignIn: "https://master.d3movrj7qooly.amplifyapp.com/", //'https://www.activetvonline.co.za/',   //        'http://localhost:3000/',
      redirectSignOut: "https://master.d3movrj7qooly.amplifyapp.com/login", //'https://www.activetvonline.co.za/signout/',//'http://localhost:3000/signup', //'https://www.activetvonline.co.za/signout/',    //'http://localhost:3000/signup',
      // redirectSignIn,
      // redirectSignOut,
      responseType: "code", // or 'token', note that REFRESH token will only be generated when the responseType is code
      // responseType:'code'
    },
  },
};
