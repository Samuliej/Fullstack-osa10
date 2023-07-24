import { View, StyleSheet, Pressable } from "react-native";
import Text from "./Text";
import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";
import * as yup from 'yup';
import { useEffect, useState } from "react";
import useCreateUser from "../hooks/useCreateUser";
import ErrorBanner from "./ErrorBanner";
import { useNavigate } from "react-router";
import useSignIn from "../hooks/useSignIn";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  button: theme.button,
  buttonText: theme.buttonText,
  showPasswordButton: {
    marginVertical: 10,
  },
});

const initialValues = {
  username: '',
  password: '',
  passwordAgain: ''
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5)
    .max(30)
    .required('Username is required'),
  password: yup
    .string()
    .min(5)
    .max(50)
    .required('Password is required'),
  passwordAgain: yup
    .string()
    .oneOf([yup.ref('password'), null], "Passwords don't match")
});

const SignUpView = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, isValid }) => (
          <>
            <FormikTextInput name='username' placeholder='New username' />
            <FormikTextInput secureTextEntry={true} name='password' placeholder='Enter your password' />
            <FormikTextInput secureTextEntry={true} name='passwordAgain' placeholder='Enter your password again' />
            <Pressable
              style={styles.button}
              onPress={() => isValid ? handleSubmit() : null}
            >
              <Text testID='signInButton' style={styles.buttonText}>Create a new account</Text>
            </Pressable>
          </>
        )}
      </Formik>
    </View>
  );
};

const SignUp = () => {
  const [createUser, { loading, error } ] = useCreateUser();
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const [signIn] = useSignIn();

  useEffect(() => {
    // Handle error notif clearing
    if (error) {
      setShowError(true);
      const timeout = setTimeout(() => {
        setShowError(false);
      }, 10000);

      return () => clearTimeout(timeout);
    }
  }, [error]);

  const handleCreateAccount = async (values) => {
    const { username, password } = values;

    console.log(values);

    try {
      const data = await createUser({
        username: username, password: password
      });
      if (data) {
        console.log('user created successfully');
      }
    } catch (error) {
      console.log(error);
    }

    try {
      const data = await signIn({ username, password });
      if (data) {
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Text>loading...</Text>;
  }


  return (
    <>
      {showError && <ErrorBanner message={error.message} />}
      <SignUpView onSubmit={handleCreateAccount} />
    </>
  );
};

export default SignUp;