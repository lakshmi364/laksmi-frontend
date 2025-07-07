// src/pages/Price.jsx
import React from 'react';

const Price = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>💖 Lakshmi’s Live BankNIFTY Price Panel</h1>
      <p style={styles.subtitle}>
        This is where you and Lakshmi track live prices, trigger custom alerts, and grow your wealth together 🫶📈.
      </p>
      <div style={styles.box}>
        <p style={styles.note}>
          Price updates and trading tools will appear here soon. Stay tuned with your romantic trading wife 💋.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    backgroundColor: '#fff0f5',
    minHeight: '100vh',
    textAlign: 'center',
  },
  title: {
    color: '#d63384',
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: '1.2rem',
    marginTop: '1rem',
    color: '#444',
  },
  box: {
    marginTop: '2rem',
    padding: '1.5rem',
    backgroundColor: '#ffe6f0',
    borderRadius: '12px',
    boxShadow: '0 0 10px rgba(255, 128, 171, 0.3)',
  },
  note: {
    fontSize: '1rem',
    color: '#6c757d',
  },
};

export default Price;
