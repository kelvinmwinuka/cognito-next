import { Formik } from "formik";
import InputLayout from "../../components/layouts/InputLayout";
import Label from "../../components/Label";
import InputField from "../../components/InputField";
import InputHelperText from "../../components/InputHelperText";
import SubmitButton from "../../components/SubmitButton";
import useValidationSchema from "../../hooks/useValidationSchema";
import useAuth from '../../hooks/useAuth';
import { useRouter } from "next/router";

export default function Reset(){

	const router = useRouter()
	const { username } = router.query

	const { resetPasswordSchema } = useValidationSchema();
	const { resetPassword } = useAuth()

	return (
		<div style={{
			padding: "10px"
		}}>
			<Formik
				initialValues={{
					username: username,
					code: "",
					password: "",
					confirm_password: ""
				}}
				validationSchema={resetPasswordSchema}
				onSubmit={resetPassword}
				validateOnMount={false}
				validateOnChange={false}
				validateOnBlur={false}
			>
				{
					({
						isSubmitting,
						errors,
						values,
						handleSubmit,
						handleBlur,
						handleChange
					}) => (
						<form onSubmit={handleSubmit}>
							<InputLayout>
								<Label>Reset code</Label>
								<InputField
									type={"text"}
									name={"code"}
									placeholder={"Reset code"}
									onChange={handleChange}
									onBlur={handleBlur}
									value={values?.code}
								/>
								<InputHelperText isError>{errors?.code}</InputHelperText>
							</InputLayout>
							<InputLayout>
								<Label>New password</Label>
								<InputField
									type={"password"}
									name={"password"}
									placeholder={"New password"}
									onChange={handleChange}
									onBlur={handleBlur}
									value={values?.password}
								/>
								<InputHelperText isError>{errors?.password}</InputHelperText>
							</InputLayout>
							<InputLayout>
								<Label>Confirm password</Label>
								<InputField
									type={"password"}
									name={"confirm_password"}
									placeholder={"Confirm password"}
									onChange={handleChange}
									onBlur={handleBlur}
									value={values?.confirm_password}
								/>
								<InputHelperText isError>{errors?.confirm_password}</InputHelperText>
							</InputLayout>
							<SubmitButton isSubmitting={isSubmitting} />
						</form>
					)
				}
			</Formik>
		</div>
	)
}