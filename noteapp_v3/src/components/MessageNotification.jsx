import { Alert } from "@mui/material";

const MessageNotification = ({ notification }) => {
  if (!notification.message) return null;

  const severity = notification.type === "error" ? "error" : "success";
  return (
    <Alert
      severity={severity}
      style={{ marginBottom: "10px", fontSize: "1.2em" }}
    >
      {notification.message}
    </Alert>
  );
};

export default MessageNotification;
