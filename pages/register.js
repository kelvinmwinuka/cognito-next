import { Formik } from "formik";
import InputLayout from "../components/layouts/InputLayout";
import Label from "../components/Label";
import InputField from "../components/InputField";
import InputHelperText from "../components/InputHelperText";
import AuthLinkText from "../components/AuthLinkText";
import SubmitButton from "../components/SubmitButton";
import useValidationSchema from "../hooks/useValidationSchema";
import useRegister from '../hooks/useRegister'
import Link from "next/link";

export default function Register() {

	const { registerSchema } = useValidationSchema()
	const { register } = useRegister()

	return (
		<div style={{
			padding: "10px"
		}}>
			<Formik
				initialValues={{
					username: "",
					email: "",
					password: "",
					confirm_password: ""
				}}
				validationSchema={registerSchema}
				onSubmit={register}
				validateOnMount={false}
				validateOnChange={false}
				validateOnBlur={false}>
				{({
					isSubmitting,
					errors,
					values,
					handleSubmit,
					handleChange,
					handleBlur
				}) => (
					<form onSubmit={handleSubmit}>
						<InputLayout>
							<Label>Username</Label>
							<InputField
								type="text"
								name="username"
								placeholder="Username"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values?.username}
							/>
							<InputHelperText isError>{errors?.username}</InputHelperText>
						</InputLayout>
						<InputLayout>
							<Label>Email</Label>
							<InputField
								type="email"
								name="email"
								placeholder="Email"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values?.email}
							/>
							<InputHelperText isError>{errors?.email}</InputHelperText>
						</InputLayout>
						<InputLayout>
							<Label>Password</Label>
							<InputField
								type="password"
								name="password"
								placeholder="Password"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values?.password}
							/>
							<InputHelperText isError>{errors?.password}</InputHelperText>
						</InputLayout>
						<InputLayout>
							<Label>Confirm password</Label>
							<InputField
								type="password"
								name="confirm_password"
								placeholder="Confirm password"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values?.confirm_password}
							/>
							<InputHelperText isError>{errors?.confirm_password}</InputHelperText>
						</InputLayout>
						<InputLayout>
							<AuthLinkText href="/login">Already have an account? Log in</AuthLinkText>
						</InputLayout>
						<SubmitButton isSubmitting={isSubmitting} />
					</form>
				)}
			</Formik>
		</div>
	)
}