import {
  createContext,
  useState,
  type PropsWithChildren,
  type Dispatch,
  type SetStateAction,
  useContext,
} from "react";

type AuthContextType = {
  isAuth: boolean | null;
  setIsAuth: Dispatch<SetStateAction<null | boolean>>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

type AuthContextProviderProps = PropsWithChildren;

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      "useAuth hook should only be used inside AuthContextProvider",
    );
  }

  return context;
};

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [isAuth, setIsAuth] = useState<null | boolean>(null);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
