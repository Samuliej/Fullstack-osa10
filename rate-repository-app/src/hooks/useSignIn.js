import { useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    try {
      await mutate( {variables: { username, password } });
      // Should have been like this in 10.13, but correct now
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  return [signIn, result];
};

export default useSignIn;