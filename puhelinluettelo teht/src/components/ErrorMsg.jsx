const errorMessage = ({ messaged }) => {
  if (!messaged) return null;
  return <div className="errori">{messaged}</div>;
};
export default errorMessage;
