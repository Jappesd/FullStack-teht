import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });
  const showNotification = (message, type = "success", duration = 2000) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: null, type: null }), duration);
  };

  return (
    <NotificationContext.Provider value={{ notification, showNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
