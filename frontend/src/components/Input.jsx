import React, { useState } from "react";
import "../scss/input.scss";
import { motion } from "framer-motion";

function Input({ type, placeholder, state, setState, className }) {
  const [isLabelVisible, setIsLabelVisible] = useState(false);

  const variants = {
    visible: { opacity: 1, scale: 1, y: 0, display: "block" },
    hidden: { opacity: 0, scale: 0, y: 10, display: "none", onanimationend: { display: "none" } },
  };
  return (
    <div
      className={`app__input ${className}`}
      style={isLabelVisible ? { padding: "0.5rem 1rem" } : { padding: "1rem" }}>
      <motion.span
        variants={variants}
        initial='hidden'
        animate={isLabelVisible ? "visible" : "hidden"}>
        {placeholder}
      </motion.span>
      <input
        type={type}
        placeholder={placeholder}
        value={state}
        onChange={(e) => setState(e.target.value)}
        onFocus={(e) => setIsLabelVisible(true)}
        onBlur={(e) => (state ? setIsLabelVisible(true) : setIsLabelVisible(false))}
      />
    </div>
  );
}

export { Input };
