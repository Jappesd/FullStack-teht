import { createContext, useReducer, useContext } from "react";

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "CLEAR":
      return "";
    default:
      return state;
  }
};

export const NotificationProvider = ({ children }) => {
  const [message, dispatchMsg] = useReducer(notificationReducer, "");
  return (
    <NotificationContext.Provider value={{ message, dispatchMsg }}>
      {children}
    </NotificationContext.Provider>
  );
};
export const useNotification = () => useContext(NotificationContext);
