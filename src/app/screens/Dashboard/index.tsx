import React from "react";
import styles from "./styles.module.css";
import Nav from "../../components/Nav";
import { Link, Outlet } from "react-router-dom";

interface DashboardProps {
    loggedIn: boolean;
    setLoggedIn: (loggedIn: boolean) => void;
    children: React.ReactNode;
  }

  const Dashboard: React.FC<DashboardProps> = ({ loggedIn, setLoggedIn, children }) => {

    return (
    <>
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <Link to="/dashboard">
                    
                    <div className={styles.logo}>
                    <img src="/dashboard.png" alt="Logo" className={styles.logoImg} />
                    </div>
                    
                </Link>
                <ul className={styles.menu}>
                    <span>Agregar producto</span>
                </ul>
                <ul className={styles.menu}>
                    <span>Editar producto</span>
                </ul>
                <ul className={styles.menu}>
                    <span>Agregar categoría</span>
                </ul>
                <ul className={styles.menu}>
                    <span>Editar categoría</span>
                </ul>
            </div>
            <div className={styles.mainContent}>
                <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                {children}
            </div>
        </div>
    </>
  );
};

export default Dashboard;
