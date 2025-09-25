// context/AuthContext.jsx
import { createContext, useContext, useState } from "react";
const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const login = (t) => { setToken(t); localStorage.setItem("token", t); };
  const logout = () => { setToken(null); localStorage.removeItem("token"); };

  return (
    <AuthCtx.Provider value={{ token, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}
