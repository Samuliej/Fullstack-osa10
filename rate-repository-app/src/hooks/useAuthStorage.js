import { useContext } from "react";
import AuthStorageContext from "../context/AuthStorageContext";

export const useAuthStorage = () => {
  return useContext(AuthStorageContext);
};

export default AuthStorageContext;