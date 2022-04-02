import CognitoIdentityServiceProvider from "aws-sdk/clients/cognitoidentityserviceprovider";

const { COGNITO_REGION, COGNITO_APP_CLIENT_ID } = process.env

export default async function handler(req, res) {
	if (req.method !== 'POST') return res.status(405).send()

	const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider({
		region: COGNITO_REGION
	})

	const params = {
		AuthFlow: 'USER_PASSWORD_AUTH',
		ClientId: COGNITO_APP_CLIENT_ID,
		AuthParameters: {
			USERNAME: req.body.username,
			PASSWORD: req.body.password
		}
	}

	try {
		const result = await cognitoIdentityServiceProvider.initiateAuth(params).promise()
		return res.status(200).json({
			...result.AuthenticationResult
		})
	} catch(err) {
		console.log(err)
		const message = err.toString()
		return res.status(err.statusCode).json({ message })
	}
}