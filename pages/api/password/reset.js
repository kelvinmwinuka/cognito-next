import CognitoIdentityServiceProvider from "aws-sdk/clients/cognitoidentityserviceprovider";

const { COGNITO_REGION, COGNITO_APP_CLIENT_ID } = process.env

export default async function handler(req, res) {
	if (req.method !== 'POST') return res.status(400).json({ message: "Method not allowed." })

	const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider({
		region: COGNITO_REGION
	})

	const params = {
		ClientId: COGNITO_APP_CLIENT_ID,
		ConfirmationCode: req.body.code,
		Password: req.body.password,
		Username: req.body.username
	}

	try {
		await cognitoIdentityServiceProvider.confirmForgotPassword(params).promise()
		return res.status(200).send()
	} catch (err) {
		console.log(err)
		return res.status(err.statusCode).json({ message: err.toString() })
	}
}