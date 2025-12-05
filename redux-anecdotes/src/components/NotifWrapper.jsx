import { useNotification } from "./NotificationContext";
import Notification from "./Notification";
export const NotificationWrapper = () => {
  const { message } = useNotification();
  return <Notification message={message} />;
};
