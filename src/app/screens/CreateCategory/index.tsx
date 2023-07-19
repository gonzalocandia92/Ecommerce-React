import React, { useState } from "react";
import useCreateCategory from "../../hooks/useCreateCategory";
import styles from "./styles.module.css";

const CreateCategory: React.FC = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const createCategoryMutation = useCreateCategory({ setError, setSuccess });

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
      
      {success ? (
        <p>{success}</p>
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
          <button type="submit" className={styles.button}>Create Category</button>
        </form>
      )}

      {success && (
        <button type="button" className={styles.button} onClick={handleAddAnotherCategory}>Add another category</button>
      )}
    </div>
  );
};

export default CreateCategory;
