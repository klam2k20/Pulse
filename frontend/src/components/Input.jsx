import React from "react";

function Input({ type, placeholder, state, setState }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={state}
      onChange={(e) => setState(e.target.value)}
    />
  );
}

export { Input };
