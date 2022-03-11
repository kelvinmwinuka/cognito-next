import { Formik } from "formik";
import InputLayout from "../components/layouts/InputLayout";
import Label from "../components/Label";
import InputField from "../components/InputField";
import InputHelperText from "../components/InputHelperText";
import AuthLinkText from "../components/AuthLinkText";
import SubmitButton from "../components/SubmitButton";
import useAuth from "../hooks/useAuth";
import useValidationSchema from "../hooks/useValidationSchema";
import Link from "next/link"

export default function Login() {

  const { loginSchema } = useValidationSchema()
  const { login } = useAuth()

  return (
    <div style={{
      padding: "10px"
    }}>
      <Formik
        initialValues={{
          username: "",
          password: ""
        }}
        validationSchema={loginSchema}
        onSubmit={login}
        validateOnMount={false}
        validateOnChange={false}>
        {({
          isSubmitting,
          errors,
          values,
          handleChange,
          handleBlur,
          handleSubmit
        }) => (
          <form onSubmit={handleSubmit}>
            <InputLayout>
              <Label>Username</Label>
              <InputField
                type="text"
                name="username"
                placeholder="Username or email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.username}
              />
              <InputHelperText isError>{errors?.username}</InputHelperText>
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
              <AuthLinkText href="/register">Don't have an account? Register.</AuthLinkText>
            </InputLayout>
            <SubmitButton isSubmitting={isSubmitting} />
          </form>
        )}
      </Formik>
    </div>
  )
}