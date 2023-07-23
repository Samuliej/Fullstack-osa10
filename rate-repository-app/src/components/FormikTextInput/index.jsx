import { StyleSheet } from "react-native";
import { useField } from "formik";

import TextInput from "./TextInput";

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
    marginTop:16
  },
  errorText: {
    marginTop: 3,
    color: "red"
  },
});

const FormikTextInput = ({ name, secureTextEntry, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;


  return (
    <>
      <TextInput
        secureTextEntry={secureTextEntry}
        style={[styles.input]}
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError ? meta.error : null}
        {...props}
      />
    </>
  );
};

export default FormikTextInput;