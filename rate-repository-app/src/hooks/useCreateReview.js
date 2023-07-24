import { useMutation } from "@apollo/client";
import { CREATE_REVIEW, GET_CURRENT_USER} from "../graphql/mutations";
import { gql } from "@apollo/client";

const useCreateReview = () => {
  const [mutate, { loading, error }] = useMutation(CREATE_REVIEW, {
    refetchQueries: [GET_CURRENT_USER],
    options: {
      awaitRefetchQueries: true
    },
  });

  const createReview = async (values) => {
    try {
      const { data } = await mutate({
        variables: { review: {
        ownerName: values.repositoryOwner,
        rating: values.rating,
        repositoryName: values.repositoryName,
        text: values.text
      }},update: (cache, { data }) => {
        // Make sure data.createReview is defined and contains the expected fields
        const newReview = data?.createReview;
        if (!newReview) {
          console.error("createReview mutation response does not contain a valid review.");
          return;
        }

        // Modify the cache to include the newly created review in the user's reviews
        cache.modify({
          id: cache.identify({ __typename: "User", id: newReview.repositoryId }), // Use the appropriate identifier for the user
          fields: {
            reviews(existingReviews = []) {
              const newReviewRef = cache.writeFragment({
                data: newReview,
                fragment: gql`
                  fragment NewReview on Review {
                    id
                    rating
                    text
                    createdAt
                    // Add any other necessary fields here
                  }
                `,
              });
              return [...existingReviews, newReviewRef];
            },
          },
        });
      },
    });
      return data.createReview;
    } catch (error) {
      console.log(error.message);
    }
  };


  return [createReview, { loading, error }];
};

export default useCreateReview;