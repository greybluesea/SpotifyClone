import { UserContext, UserContextType } from "@/providers/UserContextProvider";
import { useContext } from "react";

const useUserContext = () => {
  const userContext: UserContextType | undefined = useContext(UserContext);
  if (userContext === undefined) {
    throw new Error(
      `useUserContext must be used within a UserContextProvider.`
    );
  }
  return userContext;
};

export default useUserContext;
