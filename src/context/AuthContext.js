import { createContext, useContext, useState, useEffect } from "react";
 
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const profile = localStorage.getItem("userProfile");

    if (token && profile) {
      setUser(JSON.parse(profile));
    }

    setIsReady(true);
  }, []);

  const login = (profile, token) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("userProfile", JSON.stringify(profile));
    setUser(profile);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userProfile");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        logout,
      }}
    >
      {isReady && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
