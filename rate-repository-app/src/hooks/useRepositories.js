import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network'
  });

  if (loading) {
    return { repositories: [] };
  }

  if (error) {
    return { repositories: [] };
  }

  const repositories = data ? data.repositories.edges : [];

  return { repositories };
};

export default useRepositories;