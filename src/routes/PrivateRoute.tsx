import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { api } from "../services/api";
import Cookies from "js-cookie";

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState<null | boolean>(null);

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      setIsAuth(false);
      return;
    }

    api
      .get("/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => setIsAuth(true))
      .catch(() => setIsAuth(false));
  }, []);

  if (isAuth === null) return <p>Carregando...</p>;
  if (!isAuth) return <Navigate to="/" replace />;

  return <>{children}</>;
};
