import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";

const useCreateUser = () => {
  const [mutate, { loading, error }] = useMutation(CREATE_USER);

  const createUser = async (values) => {
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