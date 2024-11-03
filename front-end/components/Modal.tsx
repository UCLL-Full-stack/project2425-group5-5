import React from 'react';
import styles from '@styles/modal.module.css'; // Create CSS for the modal

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: any
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.titlebuttons}>
        <button onClick={onClose} className={styles.closebutton}>×</button>
        <h2>Add a New Bug Report</h2>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;