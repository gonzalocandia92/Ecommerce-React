import { Link } from "react-router-dom";
import styles from "./styles.module.css";

function Nav() {
 
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
        <Link to="/personajes">Personajes</Link>
      </li>
      <li>
        <Link to="/ubicaciones">Ubicaciones</Link>
      </li>
      <li>
        <Link to="/episodios">Episodios</Link>
      </li>
    </ul>
  </nav>
);
};


export default Nav;
