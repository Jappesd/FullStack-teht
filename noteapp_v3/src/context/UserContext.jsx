import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("loggedUser")) || null
  );
  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem("loggedUser", JSON.stringify(userData));
  };
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("loggedUser");
  };
  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext);
