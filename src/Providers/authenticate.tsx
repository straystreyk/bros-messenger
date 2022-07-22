import * as React from "react";

interface AuthContextProps {
  isAuthenticate: boolean;
  setIsAuthenticate: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = React.createContext<AuthContextProps>(null);

export const useAuth = () => {
  const { isAuthenticate, setIsAuthenticate } = React.useContext(AuthContext);

  return {
    isAuthenticate,
    setIsAuthenticate,
  };
};
