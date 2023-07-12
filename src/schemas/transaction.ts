import * as yup from 'yup'

export const transactionSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  price: yup
    .string()
    .required('Price is required')
    .matches(/^\d+(\.\d{1,2})?$/, 'Price must be a number'),
  description: yup.string(),
})
