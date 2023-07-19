import React, { useState, useEffect } from "react";
import useCreateProduct from "../../hooks/useCreateProduct";
import styles from "./styles.module.css";

interface Category {
  id: number;
  name: string;
  image: string;
}

interface ProductResponse {
  title: string;
  price: number;
  description: string;
  images: string[];
  category: Category;
  id: number;
  creationAt: string;
  updatedAt: string;
}

const CreateProduct: React.FC = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const createProductMutation = useCreateProduct(setError, setSuccess);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://api.escuelajs.co/api/v1/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      title,
      price,
      description,
      categoryId,
      images: imageUrls.filter((url) => url !== ""),
    };

    createProductMutation.mutate(productData);
  };

  const handleAddAnotherProduct = () => {
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <h2>Create Product</h2>
      {error && <p>{error}</p>}
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
            <select id="category" value={categoryId} onChange={handleCategoryChange}>
              <option value={0}>Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
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

      {success && (
        <button type="button" className={styles.button} onClick={handleAddAnotherProduct}>
          Add another product
        </button>
      )}
    </div>
  );
};

export default CreateProduct;
