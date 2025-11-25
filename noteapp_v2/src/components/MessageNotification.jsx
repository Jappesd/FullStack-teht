const MessageNotification = ({ notification }) => {
  if (!notification.message) return null;

  const style = {
    color: notification.type === "error" ? "red" : "green",
    background: "#eee",
    fontSize: "1.2em",
    padding: "10px",
    border: `2px solid ${notification.type === "error" ? "red" : "green"}`,
    borderRadius: "5px",
    marginBottom: "10px",
  };

  return (
    <div className={`notification ${notification.type}`} style={style}>
      {notification.message}
    </div>
  );
};

export default MessageNotification;
