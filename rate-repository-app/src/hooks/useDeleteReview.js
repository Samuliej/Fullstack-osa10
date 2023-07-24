import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";
import { GET_CURRENT_USER } from "../graphql/queries";


const useDeleteReview = () => {
  const [mutate, { loading, error }] = useMutation(DELETE_REVIEW, {
    refetchQueries: [GET_CURRENT_USER],
  });

  const deleteReview = async (reviewId) => {
    try {
      const { data } = await mutate({
        variables: {
          deleteReviewId: reviewId,
        },
      });
      return data.deleteReview;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return { deleteReview, loading, error };
};

export default useDeleteReview;