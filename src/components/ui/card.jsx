import React from 'react';
import PropTypes from 'prop-types';

export const Card = ({ title, subtitle, children, className = '' }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-md p-6 transition duration-300 hover:shadow-xl ${className}`}>
      {title && <h2 className="text-2xl font-semibold text-gray-800 mb-1">{title}</h2>}
      {subtitle && <p className="text-sm text-gray-500 mb-3">{subtitle}</p>}
      <div>{children}</div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}
