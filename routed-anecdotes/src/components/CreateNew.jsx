import { useState } from "react";
import { useField } from "../hooks";
const CreateNew = ({ addNew }) => {
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");
  const fields = { content, author, info };
  // const [content, setContent] = useState("");
  // const [author, setAuthor] = useState("");
  // const [info, setInfo] = useState("");
  const resetAll = () => {
    Object.values(fields).forEach((h) => {
      if (h.reset) h.reset();
    });
  };
  const handleSubmit = (e) => {
    const newAnec = {
      content: content.value,
      author: author.value,
      info: info.value,
    };
    e.preventDefault();
    addNew({ ...newAnec, votes: 0 });
  };
  return (
    <div>
      {" "}
      <h2>create a new anecdote</h2>{" "}
      <form name="newAnec" onSubmit={handleSubmit}>
        {" "}
        <div>
          {" "}
          content <input {...content} />{" "}
        </div>{" "}
        <div>
          {" "}
          author <input {...author} />{" "}
        </div>{" "}
        <div>
          {" "}
          url for more info <input {...info} />{" "}
        </div>{" "}
        <button type="submit">create</button>
        <button
          type="reset"
          value="Reset"
          onClick={() => {
            resetAll();
          }}
        >
          reset
        </button>{" "}
      </form>{" "}
    </div>
  );
};

export default CreateNew;
