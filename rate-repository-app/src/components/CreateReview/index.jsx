import { Formik } from "formik";
import FormikTextInput from "../FormikTextInput";
import * as yup from 'yup';
import { Pressable, StyleSheet, View } from "react-native";
import theme from "../../theme";
import Text from "../Text";
import useCreateReview from "../../hooks/useCreateReview";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import ErrorBanner from "../ErrorBanner";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  button: theme.button,
  buttonText: theme.buttonText
});

const initialValues = {
  repositoryOwner: '',
  repositoryName: '',
  rating: '',
  text: ''
};

const validationSchema = yup.object().shape({
  repositoryOwner: yup
    .string()
    .required('Repository owner name is required.'),
  repositoryName: yup
    .string()
    .required('Repository name is required.'),
  rating: yup
    .number()
    .integer()
    .min(0)
    .max(100)
    .required('Rating is required.'),
  text: yup
    .string()
});



const CreateReview = () => {
  const [createReview, { loading, error } ] = useCreateReview();
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);

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

  const handleCreateReview = async (values) => {
    const rating = Number(values.rating);

    if (isNaN(rating)) {
      console.log('Invalid rating. Please provide a valid number.');
      return;
    }

    try {
      const data = await createReview({...values, rating: rating});
      console.log('createReview');
      console.log(data.repositoryId);
      navigate(`/${data.repositoryId}`);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Text>loading...</Text>;
  }


  return (
    <View style={styles.container}>
      {showError && <ErrorBanner message={error.message} />}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleCreateReview}
      >
        {({ handleSubmit, isValid }) => (
          <>
            <FormikTextInput name='repositoryOwner' placeholder='Repository name' />
            <FormikTextInput name='repositoryName' placeholder='Repository name' />
            <FormikTextInput name='rating' placeholder='Rating between 0 and 100' />
            <FormikTextInput name='text' placeholder='Review' />
            <Pressable
              style={styles.button}
              onPress={() => isValid ? handleSubmit() : null}
            >
              <Text testID='signInButton' style={styles.buttonText}>Create a review</Text>
            </Pressable>
          </>
        )}
      </Formik>
    </View>
  );
};

export default CreateReview;