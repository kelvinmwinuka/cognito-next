import * as yup from "yup"

export default function useValidationSchema(){
  return {
    registerSchema: yup.object().shape({
      username: yup.string().required('Please enter a username.'),
      email: yup.string().email().required('Please enter an email address.'),
      password: yup.string().required('Please create a password.')
      .min(8, 'Password needs to be at least 8 characters long.'),
      confirm_password: yup.string().required('Please confirm your password.')
      .oneOf([yup.ref('password')], 'Passwords do not match')
    }),

    loginSchema: yup.object().shape({
      username: yup.string().required('Username is required.'),
      password: yup.string().required('Password is required.')
    }),

    confirmSchema: yup.object().shape({
      username: yup.string().required('Username is required.'),
      code: yup.string().required('Confirmation code is required.')
    }),

    resetPasswordRequestSchema: yup.object().shape({
      username: yup.string().required('Username is required.')
    }),

    resetPasswordSchema: yup.object().shape({
      code: yup.string().required('Password reset code is required.'),
      password: yup.string().required('Please create a password.')
        .min(8, 'Password needs to be at least 8 characters long.'),
      confirm_password: yup.string().required('Please confirm your password.')
        .oneOf([yup.ref('password')], 'Passwords do not match')
    })
  }
}