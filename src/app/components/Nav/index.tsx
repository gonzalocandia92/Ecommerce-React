import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import LogoutModal from "../LogoutModal";
import Cart from "../Cart";
import UserData from "../../interfaces/UserData";

interface NavProps {
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
}
const Nav: React.FC<NavProps> = ({ loggedIn, setLoggedIn }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleOpenLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const handleCloseModal = () => {
    setShowLogoutModal(false);
  };


  const storedUserData = localStorage.getItem("userData");
  const userData: UserData | null = storedUserData ? JSON.parse(storedUserData) : null;
  

  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <div className={styles.logo}>
          <img src="/logo.png" alt="Logo" className={styles.logoImg} />
        </div>
      </Link>
      <div className={styles.menu}>
        <ul>
          <li>
          { userData?.role ==='admin' ? ( 
              <Link to="/dashboard"><button>Dashboard</button></Link>
            ) : (
              <Link to="/">Home</Link> )
          }
          </li>
          <li>
            <Link to="/categories">Categories</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Cart />
          </li>

          <li className={styles.dropdown}>
          { userData ? ( 
            <span className={styles.username}>
                    {userData.name}
            </span>
            ) : (
            <span>My account</span>
          )}

            <ul className={styles.dropdownContent}>
              {loggedIn ? (
                <>
                  <li className={styles.button} onClick={handleOpenLogoutModal}>
                    Logout
                  </li>
                </>
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

      </div>
      {showLogoutModal && (
        <LogoutModal
          setLoggedIn={setLoggedIn}
          handleCloseModal={handleCloseModal}
        />
      )}
    </nav>
  );
};

export default Nav;
