import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

interface LogoutModalProps {
  handleLogout: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ handleLogout }) => {
  const navigate = useNavigate();

  const handleConfirmLogout = () => {
    handleLogout();
    navigate("/");
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3>Confirm Logout</h3>
        <p>Are you sure you want to logout?</p>
        <div className={styles.modalButtons}>
          <button className={styles.cancelButton} onClick={navigate.goBack}>
            Cancel
          </button>
          <button className={styles.logoutConfirmButton} onClick={handleConfirmLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
