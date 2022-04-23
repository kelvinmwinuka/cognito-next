import { CognitoIdentityProviderClient, SignUpCommand } from '@aws-sdk/client-cognito-identity-provider'
import { OAuth2Client } from 'google-auth-library'

const {
  COGNITO_REGION,
  COGNITO_APP_CLIENT_ID,
  GOOGLE_TOKEN_ISSUER,
  NEXT_PUBLIC_GOOGLE_CLIENT_ID,
} = process.env

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send()

  let googlePayload

  try {
    // Verify the id token from google
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

  // Register the user
  try {
    const params = {
      ClientId: COGNITO_APP_CLIENT_ID,
      Username: googlePayload.email.split("@")[0], // Username extracted from email address
      Password: googlePayload.sub,
      UserAttributes: [
        {
          Name: 'email',
          Value: googlePayload.email
        },
        {
          Name: 'custom:RegistrationMethod',
          Value: 'google'
        }
      ],
      ClientMetadata: {
        'EmailVerified': googlePayload.email_verified.toString()
      }
    }
    const cognitoClient = new CognitoIdentityProviderClient({
      region: COGNITO_REGION
    })
    const signUpCommand = new SignUpCommand(params)
    const response = await cognitoClient.send(signUpCommand)
    return res.status(response['$metadata'].httpStatusCode).send()
  } catch (err) {
    console.log(err)
    return res.status(err['$metadata'].httpStatusCode).json({ message: err.toString() })
  }
}