import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (selectedOrder, searchKeyword, first) => {
  let principle = 'CREATED_AT';
  let order = 'DESC';

  if (selectedOrder) {
    switch (selectedOrder) {
      case 'Latest repositories':
        principle = 'CREATED_AT';
        order = 'DESC';
        break;
      case 'Oldest repositories':
        principle = 'CREATED_AT';
        order = 'ASC';
        break;
      case 'Highest rated repositories':
        principle = 'RATING_AVERAGE';
        order = 'DESC';
        break;
      case 'Lowest rated repositories':
        principle = 'RATING_AVERAGE';
        order = 'ASC';
        break;
      default:
        principle = '';
        order = '';
        break;
    }
  }

  const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      searchKeyword: searchKeyword,
      orderBy: principle,
      orderDirection: order,
      first: first
    }
  });


  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
      }
    });
  };

  const repositories = data ? data.repositories : [];

  return { repositories, loading, error, fetchMore: handleFetchMore };
};

export default useRepositories;