import { Formik } from "formik";
import InputLayout from "../components/layouts/InputLayout";
import Label from "../components/Label";
import InputField from "../components/InputField";
import InputHelperText from "../components/InputHelperText";
import SubmitButton from "../components/SubmitButton";
import useValidationSchema from "../hooks/useValidationSchema";
import useRegister from "../hooks/useRegister";
import { useRouter } from "next/router";

export default function Confirm(){

	const router = useRouter();
	const { username } = router.query;

	const { confirm } = useRegister();
	const { confirmSchema } = useValidationSchema();

	return (
		<div style={{
			padding: "10px"
		}}>
			<Formik
				initialValues={{
					username: username,
					code: ""
				}}
				onSubmit={confirm}
				validationSchema={confirmSchema}
				validateOnMount={false}
				validateOnChange={false}
				validateOnBlur={false}>
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
								<Label>Confirmation Code</Label>
								<InputField
									type={"text"}
									name={"code"}
									placeholder={"Code"}
									onChange={handleChange}
									onBlur={handleBlur}
									value={values?.code}
								/>
								<InputHelperText isError>{errors?.code}</InputHelperText>
							</InputLayout>
							<SubmitButton isSubmitting={isSubmitting} />
						</form>
					)
				}
			</Formik>
		</div>
	)
}