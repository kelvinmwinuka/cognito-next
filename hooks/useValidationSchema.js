import * as yup from "yup"

export default function useValidationSchema(){
  return {
    registerSchema: yup.object().shape({
      username: yup.string().required('Please enter a username.'),
      email: yup.string().email().required('Please enter an email address.'),
      password: yup.string().required('Please create a password.'),
      confirm_password: yup.string().required('Please confirm your password.')
      .oneOf([yup.ref('password')], 'Passwords do not match')
    }),

    loginSchema: yup.object().shape({
      username: yup.string().required('Username is required.'),
      password: yup.string().required('Password is required.')
    })
  }
}