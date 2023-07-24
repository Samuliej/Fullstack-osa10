import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../graphql/queries";

const useGetCurrentUser = (includeReviews) => {
  const { data, loading, error } = useQuery(GET_CURRENT_USER, {
    variables: {
      includeReviews: includeReviews
    },
    fetchPolicy: 'cache-and-network',
  });

  let user;

  if (loading) {
    return null;
  }

  if (error) {
    throw new Error(error.message);
  }

  if (!loading) {
    if (data) {
      user = data.me;
    }
  }

  return { user };
};

export default useGetCurrentUser;