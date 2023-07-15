import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import styles from "./styles.module.css";

const RegisterUser: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
        }),
      });

      if (!response.ok) {
        const errorMessage = "Failed to register user";
        throw new Error(errorMessage);
      }

      const data = await response.json();

      const loginResponse = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!loginResponse.ok) {
        const errorMessage = "Failed to login";
        throw new Error(errorMessage);
      }

      const loginData = await loginResponse.json();
      localStorage.setItem("accessToken", loginData.access_token);

      navigate("/");
    } catch (error) {
      setError(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.container} ${styles.dark}`}>
      <h2>Register</h2>
      {loading && <Loader />}
      {error && <Error message={error} />}
      <form>
        <div className={styles.inputContainer}>
          <label htmlFor="name" className={styles.inputLabel}>
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            className={styles.input}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="email" className={styles.inputLabel}>
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className={styles.input}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="password" className={styles.inputLabel}>
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className={styles.input}
          />
        </div>
        <button type="button" onClick={handleRegister} className={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterUser;
