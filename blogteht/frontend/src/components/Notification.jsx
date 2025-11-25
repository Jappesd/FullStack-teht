//Success or error messages
const Notification = ({ notification }) => {
  if (!notification || !notification.message) return null;
  const classname = `blog-notification ${notification.type}`;
  return <div className={classname}>{notification.message}</div>;
};

export default Notification;
