import { CognitoIdentityProviderClient, AdminInitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";
import { OAuth2Client } from "google-auth-library";

const {
  COGNITO_REGION,
  COGNITO_APP_CLIENT_ID,
  COGNITO_USER_POOL_ID,
  GOOGLE_TOKEN_ISSUER,
  NEXT_PUBLIC_GOOGLE_CLIENT_ID
} = process.env

export default async function handler(req, res){
  if (!req.method === 'POST') return res.status(405).send()

  let googlePayload

  try {
    const oauthClient = new OAuth2Client(NEXT_PUBLIC_GOOGLE_CLIENT_ID)
    const ticket = await oauthClient.verifyIdToken({
      idToken: req.body.id_token,
      audience: NEXT_PUBLIC_GOOGLE_CLIENT_ID
    })
    googlePayload = ticket.getPayload()
    if (
      !googlePayload?.iss === GOOGLE_TOKEN_ISSUER ||
      !googlePayload?.aud === NEXT_PUBLIC_GOOGLE_CLIENT_ID
    ) {
      throw new Error("Token issuer or audience invalid.")
    }
  } catch (err) {
    return res.status(422).json({ message: err.toString() })
  }

  // Sign the user in
  try {
    const params = {
      AuthFlow: 'ADMIN_USER_PASSWORD_AUTH',
      ClientId: COGNITO_APP_CLIENT_ID,
      UserPoolId: COGNITO_USER_POOL_ID,
      AuthParameters: {
        USERNAME: googlePayload?.email,
        PASSWORD: googlePayload?.sub
      }
    }
    const cognitoClient = new CognitoIdentityProviderClient({
      region: COGNITO_REGION
    })
    const adminInitiateAuthCommand = new AdminInitiateAuthCommand(params)
    const response = await cognitoClient.send(adminInitiateAuthCommand)
    return res.status(response['$metadata'].httpStatusCode).json({
      ...response.AuthenticationResult
    })
  } catch (err) {
    console.log(err)
    return res.status(err['$metadata'].httpStatusCode).json({ message: err.toString() })
  }
}