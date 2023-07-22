import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (id) => {
  const { loading, error, data } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: id },
    fetchPolicy: 'cache-and-network'
  });

  if (loading) {
    return { loading: true };
  }

  if (error) {
    return { error };
  }

  // Check if data exists before accessing its properties
  if (!data || !data.repository) {
    return { error: { message: "Repository data not found" } };
  }

  const { repository } = data;

  return { data: repository };
};

export default useRepository;