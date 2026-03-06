import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Toast({ message }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        style={styles.toast}
      >
        <span>✅</span> {message}
      </motion.div>
    </AnimatePresence>
  );
}

const styles = {
  toast: {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    background: '#f97316',
    color: '#111',
    padding: '16px 24px',
    borderRadius: '12px',
    fontWeight: '900',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
    zIndex: 1000
  }
};