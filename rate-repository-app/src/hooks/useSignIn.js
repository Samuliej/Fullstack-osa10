import { useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {

    console.log(`Values at useSignIN: ${username} ${password}`);

    try {
      await mutate( {variables: { username, password } });
      console.log('usesignin', result);
    } catch (error) {
      console.log(error);
    }
  };

  return [signIn, result];
};

export default useSignIn;