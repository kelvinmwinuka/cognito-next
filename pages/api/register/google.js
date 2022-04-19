import { CognitoIdentityProviderClient, SignUpCommand } from '@aws-sdk/client-cognito-identity-provider'
import { OAuth2Client } from 'google-auth-library'
import { promisify } from 'util'
import bcrypt from 'bcrypt'

const genSalt = promisify(bcrypt.genSalt)
const hash = promisify(bcrypt.hash)

const {
  COGNITO_REGION,
  COGNITO_APP_CLIENT_ID,
  NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  SALT_ROUNDS
} = process.env

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send()

  let googlePayload
  let password

  try {
    // Verify the id token from google
    const oauthClient = new OAuth2Client(NEXT_PUBLIC_GOOGLE_CLIENT_ID)
    const ticket = await oauthClient.verifyIdToken({
      idToken: req.body.id_token,
      audience: NEXT_PUBLIC_GOOGLE_CLIENT_ID
    })
    googlePayload = ticket.getPayload()
    console.log(googlePayload)

    // Generate password from a hash of googlePaylaod['sub']
    const salt = await genSalt(Number(SALT_ROUNDS))
    password = await hash(googlePayload['sub'], salt)
  } catch (err) {
    return res.status(422).json({ message: err.toString() })
  }

  // Register the user
  try {
    const params = {
      ClientId: COGNITO_APP_CLIENT_ID,
      Password: password, // Hash of googlePaylaod['sub']
      Username: googlePayload.email.split("@")[0], // Username extracted from email address
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