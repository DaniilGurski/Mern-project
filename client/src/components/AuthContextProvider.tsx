import {
  createContext,
  useState,
  useEffect,
  type PropsWithChildren,
  type Dispatch,
  type SetStateAction,
} from "react";

type AuthContextType = {
  isAuth: boolean | null;
  setIsAuth: Dispatch<SetStateAction<null | boolean>>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

type AuthContextProviderProps = PropsWithChildren;

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [isAuth, setIsAuth] = useState<null | boolean>(null);

  useEffect(() => {
    fetch("http://localhost:8000/auth/signed-in", {
      credentials: "include",
    })
      .then((res) => setIsAuth(res.ok))
      .catch(() => setIsAuth(false));
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
