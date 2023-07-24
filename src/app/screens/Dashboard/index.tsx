import React from "react";
import styles from "./styles.module.css";
import Nav from "../../components/Nav";
import {Link} from "react-router-dom";

interface DashboardProps {
    loggedIn: boolean;
    setLoggedIn: (loggedIn: boolean) => void;
    children?: React.ReactNode;
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
                    <Link to="/products/create"> <i className="fa fa-plus-circle" fa-prod aria-hidden="true"></i><span> Add product</span></Link>
                </ul>
                <ul className={styles.menu}>
                    <Link to="/product/edit"> <i className="fa fa-list" fa-prod aria-hidden="true"></i><span> List products</span></Link>
                </ul>
                <ul className={styles.menu}>
                    <Link to="/categories/create"><i className="fa fa-plus-circle" fa-prod aria-hidden="true"></i><span> Add category</span></Link>
                </ul>
                <ul className={styles.menu}>
                    <Link to="/categories/edit"><i className="fa fa-list" fa-prod aria-hidden="true"></i><span> List categories</span></Link>
                </ul>
            </div>
            <div className={styles.mainContent}>
                <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                {children}
                {/* CONTENIDO REAL DE LA PAGÍNA COMIENZA ACÁ */}




            </div>
        </div>
    </>
  );
};

export default Dashboard;
