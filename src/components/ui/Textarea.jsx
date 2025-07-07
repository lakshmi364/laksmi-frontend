// src/components/ui/textarea.jsx
import React from 'react';

const Textarea = ({ value, onChange, placeholder, rows = 4, cols = 50 }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      cols={cols}
      style={{
        width: '100%',
        padding: '8px',
        fontSize: '14px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        resize: 'vertical',
      }}
    />
  );
};

export default Textarea
