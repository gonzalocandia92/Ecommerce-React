import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Home: React.FC = () => {
  return (
    <div>
      <img src="./logo.png" alt="Logo" className={styles.logo} />
      <h1>Find Everything You Need in One Place</h1>
      <p>Find the best products for rent at affordable prices.</p>
      <button className={styles.browseButton}>
        <Link to="/categories">Browse Categories</Link>
      </button>
    </div>
  );
};

export default Home;