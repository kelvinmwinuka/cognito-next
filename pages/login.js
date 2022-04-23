import { Formik } from "formik";
import InputLayout from "../components/layouts/InputLayout";
import Label from "../components/Label";
import InputField from "../components/InputField";
import InputHelperText from "../components/InputHelperText";
import AuthLinkText from "../components/AuthLinkText";
import SubmitButton from "../components/SubmitButton";
import useAuth from "../hooks/useAuth";
import useValidationSchema from "../hooks/useValidationSchema";
import { useRouter } from "next/router";
import GoogleLogin from "react-google-login";

export default function Login() {

  const router = useRouter();
  const { success } = router.query;

  const { loginSchema } = useValidationSchema();
  const { login, googleSignInSuccess, googleSignInFailure } = useAuth();

  return (
    <div style={{
      padding: "10px"
    }}>
      {
        success === "true" &&
        <div style={{
          paddingTop: "10px",
          paddingBottom: "10px",
          color: "green"
        }}>
          {'You\'re signed up!'}
        </div>
      }
      <Formik
        initialValues={{
          username: "",
          password: ""
        }}
        validationSchema={loginSchema}
        onSubmit={login}
        validateOnMount={false}
        validateOnChange={false}
        validateOnBlur={false}>
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
              <AuthLinkText href="/password/reset_code">{'Forgot password?'}</AuthLinkText>
            </InputLayout>
            <InputLayout>
              <AuthLinkText href="/register">{'Don\'t have an account? Register.'}</AuthLinkText>
            </InputLayout>
            <InputLayout>
              <GoogleLogin 
								clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
								buttonText="Login with Google"
								onSuccess={googleSignInSuccess}
								onFailure={googleSignInFailure}
              />
            </InputLayout>
            <SubmitButton isSubmitting={isSubmitting} />
          </form>
        )}
      </Formik>
    </div>
  );
}