import FormikTextInput from "./FormikTextInput";
import { View, StyleSheet, Pressable } from "react-native";
import { Formik } from "formik";
import Text from "./Text";

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
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

const SignIn = () => {

  const handleSignIn = (values) => {
    console.log(values);
  };

  return (
    <View style={styles.container}>
      <Formik initialValues={initialValues} onSubmit={handleSignIn}>
          {({ handleSubmit }) => (
            <>
              <FormikTextInput name='username' placeholder='username' />
              <FormikTextInput secureTextEntry={true} name='password' placeholder='password' />
              <Pressable style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Sign in</Text>
              </Pressable>
            </>
          )}
      </Formik>
    </View>
  );
};

export default SignIn;