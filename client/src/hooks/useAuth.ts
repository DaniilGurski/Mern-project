import { useContext } from "react";
import { AuthContext } from "../components/AuthContextProvider";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      "useAuth hook should only be used inside AuthContextProvider",
    );
  }

  return context;
};