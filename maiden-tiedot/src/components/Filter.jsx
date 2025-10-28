import React from "react";
const Filter = ({ value, onChange }) => {
  return (
    <div>
      Etsi maata <input value={value} onChange={onChange} />
    </div>
  );
};

export default Filter;
