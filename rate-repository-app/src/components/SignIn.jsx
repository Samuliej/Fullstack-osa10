import FormikTextInput from "./FormikTextInput";
import { View, StyleSheet, Pressable } from "react-native";
import { Formik } from "formik";
import Text from "./Text";
import * as yup from 'yup';
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router";

const initialValues = {
  username: '',
  password: ''
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 16
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
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
  const [signIn, result] = useSignIn();
  const navigate = useNavigate();

  const handleSignIn = async (values) => {
    const { username, password } = values;
    try {
      /**
       * Using result from useSignIn hook fixed a bug, that when signing in, the AppBar
       * updated correctly but the redirection only happened when pressing sign in the second time.
       */
      await signIn({ username, password });
      if (result) {
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SignInView onSubmit={handleSignIn} />
  );
};

export default SignIn;