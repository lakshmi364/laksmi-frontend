import React from "react";
import PropTypes from "prop-types";

const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`rounded-2xl shadow-md bg-white dark:bg-zinc-800 p-4 border dark:border-zinc-700 ${className}`}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Card
