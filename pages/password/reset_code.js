import { Formik } from "formik";
import InputLayout from "../../components/layouts/InputLayout";
import Label from "../../components/Label";
import InputField from "../../components/InputField";
import InputHelperText from "../../components/InputHelperText";
import SubmitButton from "../../components/SubmitButton";
import useValidationSchema from "../../hooks/useValidationSchema";
import useAuth from '../../hooks/useAuth';

export default function ResetCode(){

	const { resetPasswordRequestSchema } = useValidationSchema();
	const { resetPasswordRequest } = useAuth();

	return (
		<div style={{
			padding: "10px"
		}}>
			<Formik
				initialValues={{
					username: ""
				}}
				onSubmit={resetPasswordRequest}
				validationSchema={resetPasswordRequestSchema}
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
						handleChange,
						handleBlur
					}) => (
						<form onSubmit={handleSubmit}>
							<InputLayout>
								<Label>Username</Label>
								<InputField
									type={"text"}
									name={"username"}
									placeholder={"Username"}
									onChange={handleChange}
									onBlur={handleBlur}
									value={values?.username}
								/>
								<InputHelperText isError>{errors?.username}</InputHelperText>
							</InputLayout>
							<SubmitButton isSubmitting={isSubmitting} />
						</form>
					)
				}
			</Formik>
		</div>
	)
}