import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { useCartContext } from "../../hooks/CartContext";

interface LogoutModalProps {
  setLoggedIn: (loggedIn: boolean) => void;
  handleCloseModal: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ setLoggedIn, handleCloseModal }) => {
  const navigate = useNavigate();
  const { clearCart } = useCartContext();
  
  const handleConfirmLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userData");
    clearCart();
    setLoggedIn(false);
    handleCloseModal();
    navigate("/");
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3>Confirm Logout</h3>
        <p>Are you sure you want to logout?</p>
        <div className={styles.modalButtons}>
          <button className={styles.cancelButton} onClick={handleCloseModal}>
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
