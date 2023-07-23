import FormikTextInput from "./FormikTextInput";
import { View, StyleSheet, Pressable } from "react-native";
import { Formik } from "formik";
import Text from "./Text";
import * as yup from 'yup';
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router";
import theme from "../theme";
import { useEffect, useState } from "react";
import ErrorBanner from "./ErrorBanner";

const initialValues = {
  username: '',
  password: ''
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  button: theme.button,
  buttonText: theme.buttonText,
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required.'),
  password: yup
    .string()
    .required('Password is required')
});

export const SignInView = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
        {({ handleSubmit, isValid }) => (
          <>
            <FormikTextInput name='username' placeholder='Username' />
            <FormikTextInput secureTextEntry={true} name='password' placeholder='Password' />
            <Pressable
              style={styles.button}
              onPress={() => isValid ? handleSubmit() : null}
            >
              <Text testID='signInButton' style={styles.buttonText}>Sign in</Text>
            </Pressable>
          </>
        )}
    </Formik>
  </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError(null);
      }, 10000);

      return () => clearTimeout(timeout);
    }
  }, [error]);

  const handleSignIn = async (values) => {
    const { username, password } = values;
    try {
      /**
       * Using result from useSignIn hook fixed a bug, that when signing in, the AppBar
       * updated correctly but the redirection only happened when pressing sign in the second time.
       */
      const data = await signIn({ username, password });
      if (data) {
        navigate('/');
      }
    } catch (error) {
      console.log('dsadsa');
      console.log(error.message);
      setError(error.message);
    }
  };

  return (
    <>
      {error && <ErrorBanner message={error} />}
      <SignInView onSubmit={handleSignIn} />
    </>
  );
};

export default SignIn;