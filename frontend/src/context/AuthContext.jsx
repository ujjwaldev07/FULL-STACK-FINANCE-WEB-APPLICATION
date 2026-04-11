import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { fetchMe, loginUser, signupUser } from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetchMe();
        setUser(response.user);
      } catch (error) {
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const response = await loginUser({ email, password });
    localStorage.setItem("token", response.token);
    setUser(response.user);
    return response;
  };

  const signup = async (name, email, password) => {
    const response = await signupUser({ name, email, password });
    localStorage.setItem("token", response.token);
    setUser(response.user);
    return response;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, loading, login, signup, logout }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
