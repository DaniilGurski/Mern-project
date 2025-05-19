import { useEffect, type PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuth, setIsAuth } = useAuth();

  useEffect(() => {
    fetch("http://localhost:8000/auth/signed-in", {
      credentials: "include",
    })
      .then((res) => setIsAuth(res.ok))
      .catch(() => setIsAuth(false));
  }, []);

  if (isAuth === null) {
    return null;
  }

  return isAuth ? <> {children} </> : <Navigate to="/login" />;
}
