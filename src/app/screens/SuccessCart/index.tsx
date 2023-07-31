import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./styles.module.css"


const SuccessCart: React.FC = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.successIcon}></div>
      <h2>Your purchase of <span className={styles.successMessage}>${location.state.totalPrice}</span> was successful!</h2>
      <p className={styles.thanks}>Thank you for your purchase.</p>
      <button className={styles.backButton} onClick={handleBackToHome}>Back to Homepage</button>
    </div>
  );
};
export default SuccessCart;
