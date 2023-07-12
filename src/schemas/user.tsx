import * as yup from 'yup'

export const userSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .test('no-spaces', 'Username cannot have spaces', (value) => {
      return !value.includes(' ')
    }),
  name: yup.string().required('Name is required'),
})
