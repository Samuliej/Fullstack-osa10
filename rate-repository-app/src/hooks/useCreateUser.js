import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";

const useCreateUser = () => {
  const [mutate, { loading, error }] = useMutation(CREATE_USER, {
    fetchPolicy: 'cache-and-network',
  });

  const createUser = async (values) => {
    console.log('values hookissa');
    console.log(values);
    try {
      const { data } = await mutate({ variables: { user: {
        username: values.username,
        password: values.password
      }}});
      return data.createUser;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return [createUser, { loading, error }];
};

export default useCreateUser;