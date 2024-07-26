import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const navigate = useNavigate();
  const handleClick = (path) => (event) => {
    event.preventDefault();
    navigate(`/${path}`);
  };
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo} onClick={handleClick("")}>
          Trademo
        </div>
        <div className={styles.links}>
          <a href="#" onClick={handleClick("product")}>
            Product
          </a>
          <a href="#" onClick={handleClick("supplier")}>
            Supplier
          </a>
          <a href="#" onClick={handleClick("shipment")}>
            Shipment
          </a>
          <a href="#" onClick={handleClick("analytics")}>
            Analytics
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
