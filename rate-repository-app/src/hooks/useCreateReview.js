import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

const useCreateReview = () => {
  const [mutate, { loading, error }] = useMutation(CREATE_REVIEW);

  const createReview = async (values) => {
    try {
      const { data } = await mutate({ variables: { review: {
        ownerName: values.repositoryOwner,
        rating: values.rating,
        repositoryName: values.repositoryName,
        text: values.text
      }}});
      return data.createReview;
    } catch (error) {
      console.log(error.message);
    }
  };


  return [createReview, { loading, error }];
};

export default useCreateReview;