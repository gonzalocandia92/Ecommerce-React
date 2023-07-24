import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/Error";
import styles from "./styles.module.css";
import useLoginMutation from "../../hooks/useLoginMutation";

interface LoginUserProps {
  setLoggedIn: (loggedIn: boolean) => void;
}

const LoginUser: React.FC<LoginUserProps> = ({ setLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const { loginMutation } = useLoginMutation();

  const handleLogin = async () => {
    try {
      const credentials = { email, password };
      const userData = await loginMutation.mutateAsync(credentials);

      setLoggedIn(true);
      localStorage.setItem("userData", JSON.stringify(userData));
      navigate("/");

    } catch (error) {
      setError(error.message || "Login failed");
    }
  };

  if (loginMutation.isLoading) {
    return <Loader />;
  }

  if (loginMutation.error) {
    return <ErrorMessage message={error || "Failed to fetch user data"} />;
  }

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      {loginMutation.isLoading ? (
        <Loader />
      ) : (
        <>
          {error && <ErrorMessage message={error} />}
          <form className={styles.form}>
            <div className={styles.inputContainer}>
              <label className={styles.inputLabel}>Email</label>
              <input className={styles.input} type="email" value={email} onChange={handleEmailChange} />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.inputLabel}>Password</label>
              <input className={styles.input} type="password" value={password} onChange={handlePasswordChange} />
            </div>
            <button className={styles.button} type="button" onClick={handleLogin}>
              Login
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default LoginUser;