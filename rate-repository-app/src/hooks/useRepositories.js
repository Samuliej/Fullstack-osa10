import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (selectedOrder) => {
  console.log(selectedOrder);
  let principle;
  let order;
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

  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      orderBy: principle,
      orderDirection: order
    }
  });

  if (loading) {
    return { repositories: [] };
  }

  if (error) {
    return { repositories: [] };
  }

  const repositories = data ? data.repositories : [];

  return { repositories };
};

export default useRepositories;