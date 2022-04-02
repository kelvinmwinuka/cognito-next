import CognitoIdentityServiceProvider from 'aws-sdk/clients/cognitoidentityserviceprovider'

const { COGNITO_REGION, COGNITO_APP_CLIENT_ID } = process.env

export default async function handler (req, res) {
	if (req.method !== 'POST') return res.status(400).json({ message: "Method not allowed" })

	const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider({
		region: COGNITO_REGION
	})

	const params = {
		ClientId: COGNITO_APP_CLIENT_ID,
		Username: req.body.username
	}

	try {
		await cognitoIdentityServiceProvider.resendConfirmationCode(params).promise()
		return res.status(200).send()
	} catch (err) {
		console.log(err)
		return res.stat(err.statusCode).json({ message: err.toString() })
	}

	return res.status(200).json({ message: "Confirmation code sent." })
}