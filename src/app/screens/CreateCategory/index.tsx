import React, { useState } from "react";
import useCreateCategory from "../../hooks/useCreateCategory";
import styles from "./styles.module.css";
import Loader from "../../components/Loader";

const CreateCategory: React.FC = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { createCategoryMutation, isLoading } = useCreateCategory({ setError, setSuccess });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createCategoryMutation.mutate({ name, image });
  };

  const handleAddAnotherCategory = () => {
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <h2>Create Category</h2>
      {error && <p>{error}</p>}

      {isLoading ? (
        <Loader />
      ) : success ? (
        <React.Fragment>
          <p>{success}</p>
          <button type="button" className={styles.button} onClick={handleAddAnotherCategory}>
            Add another category
          </button>
        </React.Fragment>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={name} onChange={handleNameChange} />
          </div>
          <div>
            <label htmlFor="image">Image URL</label>
            <input type="text" id="image" value={image} onChange={handleImageChange} />
          </div>
          <button type="submit" className={styles.button}>
            Create Category
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateCategory;
