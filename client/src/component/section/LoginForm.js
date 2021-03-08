import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Avatar,
  Box,
  Input,
  FormControl,
  FormHelperText,
  FormLabel,
  Button,
} from '@chakra-ui/react';

const LoginForm = () => {
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup.string().max(255).required('Password is required'),
    }),
    onSubmit: ({ email, password }) => {
      console.log(`${email} ${password}`);
    },
  });

  return (
    <Box className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <Box mb={3} align="center">
          <Avatar bg="teal.500" />
        </Box>
        <FormControl mt="2em" id="username" isInvalid={Boolean(touched.email && errors.email)}>
          <FormLabel>User Name</FormLabel>
          <Input
            type="email"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
          />
          <FormHelperText>{touched.email && errors.email}</FormHelperText>
        </FormControl>
        <FormControl mt="2em" id="password" isInvalid={Boolean(touched.password && errors.password)}>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
          />
          <FormHelperText>{touched.password && errors.password}</FormHelperText>
        </FormControl>

        <Box mb={3} align="center">
          <Button mt="2em" width="10em" colorScheme="teal" type="submit">
            Log In
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default LoginForm;
