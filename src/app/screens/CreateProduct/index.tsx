import React, { useState } from "react";
import useCreateProduct from "../../hooks/useCreateProduct";
import useCategories from "../../hooks/useCategories";
import styles from "./styles.module.css";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/Error";

const CreateProduct: React.FC = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const createProductMutation = useCreateProduct(setError, setSuccess);

  const { data: categories, isLoading: isLoadingCategories, error: categoriesError } = useCategories();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryId(Number(e.target.value));
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedImageUrls = [...imageUrls];
    updatedImageUrls[index] = e.target.value;
    setImageUrls(updatedImageUrls);
  };

  const handleAddImageUrlField = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const handleRemoveImageUrlField = (index: number) => {
    const updatedImageUrls = [...imageUrls];
    updatedImageUrls.splice(index, 1);
    setImageUrls(updatedImageUrls);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      title,
      price,
      description,
      categoryId,
      images: imageUrls.filter((url) => url !== ""),
    };

    try {
      createProductMutation.mutate(productData);
      setSuccess("Product created successfully");
    } catch (error) {
      setError("Failed to create product");
    }
  };

  const handleAddAnotherProduct = () => {
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <h2>Create Product</h2>
      {error ? <ErrorMessage message={error} /> : null}
      {success ? (
        <p>{success}</p>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" value={title} onChange={handleTitleChange} />
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <input type="number" id="price" value={price} onChange={handlePriceChange} />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea id="description" value={description} onChange={handleDescriptionChange} />
          </div>
          <div>
            <label htmlFor="category">Category:</label>
            {isLoadingCategories ? (
              <Loader />
            ) : (
              <select id="category" value={categoryId} onChange={handleCategoryChange}>
                <option value={0}>Select a category</option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            )}
            {categoriesError && <ErrorMessage message={categoriesError.message} />}
          </div>
          <div>
            <label>Image URLs:</label>
            {imageUrls.map((url, index) => (
              <div key={index}>
                <input type="text" value={url} onChange={(e) => handleImageUrlChange(e, index)} />
                <button type="button" onClick={() => handleRemoveImageUrlField(index)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={handleAddImageUrlField}>
              Add Image URL
            </button>
          </div>
          <button type="submit" className={styles.button}>
            Create Product
          </button>
        </form>
      )}

      {createProductMutation.isLoading && <Loader />}
      {success && (
        <button type="button" className={styles.button} onClick={handleAddAnotherProduct}>
          Add another product
        </button>
      )}
    </div>
  );
};

export default CreateProduct;
