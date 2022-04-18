import { CognitoIdentityProviderClient, InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider"

const { COGNITO_REGION, COGNITO_APP_CLIENT_ID } = process.env

export default async function handler(req, res) {
	if (req.method !== 'POST') return res.status(405).send()

	const params = {
		AuthFlow: 'USER_PASSWORD_AUTH',
		ClientId: COGNITO_APP_CLIENT_ID,
		AuthParameters: {
			USERNAME: req.body.username,
			PASSWORD: req.body.password
		}
	}

	const cognitoClient = new CognitoIdentityProviderClient({
		region: COGNITO_REGION
	})
	const initiateAuthCommand = new InitiateAuthCommand(params)

	try {
		const response = await cognitoClient.send(initiateAuthCommand)
		console.log(response)
		return res.status(response['$metadata'].httpStatusCode).json({
			...response.AuthenticationResult
		})
	} catch(err) {
		console.log(err)
		return res.status(err['$metadata'].httpStatusCode).json({ message: err.toString() })
	}
}