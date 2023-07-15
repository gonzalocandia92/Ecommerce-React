import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

interface NavProps {
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
}

const Nav: React.FC<NavProps> = ({ loggedIn, setLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Realiza las acciones necesarias para cerrar la sesión
    localStorage.removeItem("accessToken");
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <div className={styles.logo}>
          <img src="/logo.png" alt="Logo" className={styles.logoImg} />
        </div>
      </Link>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/categories">Categories</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>

        <li className={styles.dropdown}>
          <span>Account</span>
          <ul className={styles.dropdownContent}>
            {loggedIn ? (
              <li className={styles.button} onClick={handleLogout}>Logout</li>  
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
