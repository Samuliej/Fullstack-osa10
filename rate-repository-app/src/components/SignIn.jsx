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

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const handleSignIn = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      if (data) {
        console.log('sign in success');
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSignIn}
        validationSchema={validationSchema}
      >
          {({ handleSubmit, isValid }) => (
            <>
              <FormikTextInput name='username' placeholder='username' />
              <FormikTextInput secureTextEntry={true} name='password' placeholder='password' />
              <Pressable
                style={styles.button}
                onPress={() => isValid ? handleSubmit() : null}
              >
                <Text style={styles.buttonText}>Sign in</Text>
              </Pressable>
            </>
          )}
      </Formik>
    </View>
  );
};

export default SignIn;