import * as yup from 'yup'

export default yup.object().shape( {
    name: yup.string()
    .required('Name is required'),
    email: yup.string()
    .email('must be valid email')
    .required('Email is required'),
    password: yup.string() 
    .min(8, 'must be 8 characters or more'),
    terms: yup.boolean()
    .oneOf([true], 'you must accept terms'),
    
    
    
})