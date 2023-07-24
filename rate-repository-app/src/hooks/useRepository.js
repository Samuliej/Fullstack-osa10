import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (id, first) => {
  const { loading, error, data, fetchMore } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: id, first: first },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return { loading: true };
  }

  if (error) {
    return { error };
  }

  // Check if data exists before accessing its properties
  if (!data || !data.repository) {
    throw new Error('Repository data not found');
  }

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
      }
    });
  };

  const { repository } = data;
  return { repository, loading, error, fetchMore: handleFetchMore };
};

export default useRepository;