import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Toast from './Toast'; // <--- 1. Importa tu componente Toast

export default function ReservaForm() {
  const { claseId } = useParams();
  const navigate = useNavigate();
  const [reserva, setReserva] = useState({ fecha: '', horario: '' });
  const [showToast, setShowToast] = useState(false); // <--- 2. Estado para el Toast

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reservando:", { claseId, ...reserva });
    
    // 3. Activar el Toast en lugar del alert
    setShowToast(true);
    
    // 4. Esperar a que el usuario vea el mensaje antes de redirigir
    setTimeout(() => {
      setShowToast(false);
      navigate('/progreso');
    }, 2500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }}
      style={styles.pageWrapper}
    >
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2 style={styles.title}>Reservar: {claseId.toUpperCase()}</h2>
        
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Día de inicio:</label>
          <input 
            type="date" 
            required 
            style={styles.input}
            onChange={(e) => setReserva({...reserva, fecha: e.target.value})} 
          />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Horario:</label>
          <select required style={styles.input} onChange={(e) => setReserva({...reserva, horario: e.target.value})}>
            <option value="">Selecciona una hora</option>
            <option value="08:00">08:00 AM</option>
            <option value="18:00">06:00 PM</option>
          </select>
        </div>

        <button type="submit" style={styles.btnPrimary}>Confirmar Reserva</button>
      </form>

      {/* 5. Renderizar el componente Toast cuando showToast sea true */}
      {showToast && <Toast message="¡Reserva confirmada con éxito!" />}
    </motion.div>
  );
}

// ... (tus estilos permanecen igual)

const styles = {
  pageWrapper: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    background: '#111', // Mismo fondo oscuro de tu web
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    padding: '30px',
    borderRadius: '18px',
    background: 'rgba(0,0,0,.30)',
    border: '1px solid rgba(255,255,255,.14)',
    backdropFilter: 'blur(10px)',
    color: '#fff'
  },
  title: { marginBottom: '20px', textAlign: 'center', fontWeight: 900 },
  fieldGroup: { marginBottom: '15px' },
  label: { display: 'block', marginBottom: '5px', fontSize: '14px', opacity: 0.8 },
  input: {
    width: '100%',
    padding: '14px',
    borderRadius: '10px',
    border: '1px solid rgba(255,255,255,.2)',
    background: 'rgba(255,255,255,.05)', // Fondo oscuro translúcido
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    appearance: 'none', // Quita la flecha por defecto si quieres personalizarla
  },
  btnPrimary: {
    width: '100%',
    padding: '14px',
    borderRadius: '999px',
    border: 0,
    cursor: 'pointer',
    fontWeight: 900,
    background: '#f97316',
    color: '#111',
    marginTop: '10px'
  }
};
