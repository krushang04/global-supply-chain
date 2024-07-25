import React from "react";
import styles from "../styles/ToggleSwitch.module.css"; // Import CSS module

const ToggleSwitch = ({ isOn, setIsOn, name }) => {
  const handleToggle = (e) => {
    setIsOn(name, e.target.checked);
  };

  return (
    <div className={styles.toggleSwitch}>
      <input
        type="checkbox"
        id={`toggle-${name}`}
        checked={isOn[name]}
        onChange={handleToggle}
        className={styles.toggleInput}
      />
      <label htmlFor={`toggle-${name}`} className={styles.toggleLabel}>
        <span className={styles.toggleSlider}></span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
