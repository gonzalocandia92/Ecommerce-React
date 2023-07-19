import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import LogoutModal from "../LogoutModal";

interface NavProps {
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
}
interface UserData {
  id: number;
  email: string;
  name: string;
  role: string;
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
      <ul>
        <li>
        { userData?.role ==='admin' ? ( 
            <Link to="/dashboard">Dashboard</Link>
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
