import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "./styles.module.css";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/Error";
import CardList from "../../components/CardList";
import CardChildren from "../../components/CardChildren";
import useProducts from "../../hooks/useProducts";
import useUpdateProduct from "../../hooks/useUpdateProduct";
import useDeleteProduct from "../../hooks/useDeleteProduct";

import "./modalStyles.css";
import { useQueryClient } from "react-query";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  category: {
    id: number;
    name: string;
    image: string;
    createdAt: string;
    updatedAt: string;
  };
}

const ProductAdmin: React.FC = () => {
  const {
    productsData: data,
    isLoadingProducts,
    productsError: error,
  } = useProducts('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProductTitle, setNewProductTitle] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductDescription, setNewProductDescription] = useState("");
  const [newProductImages, setNewProductImages] = useState<string[]>([]);

  const { updateProductMutation, isLoading: isUpdating, handleSuccess } =
    useUpdateProduct({
      setError: console.error,
      setSuccess: () => setIsModalOpen(false),
    });

  const { deleteProductMutation } = useDeleteProduct({
    setError: console.error,
  });

  const queryClient = useQueryClient();

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setNewProductTitle(product.title);
    setNewProductPrice(product.price.toString());
    setNewProductDescription(product.description);
    setNewProductImages(product.images);
    setIsModalOpen(true);
  };

  const [imageURLs, setImageURLs] = useState<string[]>(newProductImages);

  useEffect(() => {
    setImageURLs(newProductImages);
  }, [newProductImages]);

  const handleAddImageURL = () => {
    setImageURLs([...imageURLs, ""]);
  };

  const handleRemoveImageURL = (index: number) => {
    const updatedImageURLs = [...imageURLs];
    updatedImageURLs.splice(index, 1);
    setImageURLs(updatedImageURLs);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = async () => {
    if (
      editingProduct &&
      newProductTitle.trim() !== "" &&
      newProductPrice.trim() !== "" &&
      !isNaN(parseFloat(newProductPrice)) &&
      imageURLs.length >= 1
    ) {
      const { id } = editingProduct;
      await updateProductMutation.mutateAsync({
        id,
        title: newProductTitle,
        price: parseFloat(newProductPrice),
        description: newProductDescription,
        images: imageURLs,
      });
      queryClient.invalidateQueries("products");

      handleSuccess();
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    try {
      await deleteProductMutation.mutateAsync(productId);
      queryClient.invalidateQueries("products");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (isLoadingProducts) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <div className={styles.productList}>
      <h2>Product List</h2>
      <CardList>
        {data?.map((product) => (
          <div key={product.id}>
            <CardChildren
              image={product.images[0]}
              title={product.title}
              price={product.price}
              description={product.description}
            />
            <button onClick={() => handleEditProduct(product)}>Editar</button>
            <button className={styles.deleteButton} onClick={() => handleDeleteProduct(product.id)}>
              Eliminar
            </button>
          </div>
        ))}
      </CardList>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        className="customModal"
        overlayClassName="customOverlay"
      >
        <h2>Editar Producto</h2>
        {editingProduct && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleModalSubmit();
            }}
          >
            <div>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                value={newProductTitle}
                onChange={(e) => setNewProductTitle(e.target.value)}
                className="customInput"
              />
            </div>
            <div>
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                id="price"
                value={newProductPrice}
                onChange={(e) => setNewProductPrice(e.target.value)}
                className="customInput"
              />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                value={newProductDescription}
                onChange={(e) => setNewProductDescription(e.target.value)}
                className="customInput"
              />
            </div>
            <div>
            <label>Images:</label>
              <div>
                {imageURLs.map((url, index) => (
                   <div key={index}>
                   <input
                     type="text"
                     value={url}
                     onChange={(e) => {
                       const updatedImageURLs = [...imageURLs];
                       updatedImageURLs[index] = e.target.value;
                       setImageURLs(updatedImageURLs);
                     }}
                   />
                   <button type="button" onClick={() => handleRemoveImageURL(index)}>
                     Remove
                   </button>
                 </div>
                ))}
                <div>
                  <button type="button" onClick={handleAddImageURL}>
                    Add Image URL
                  </button>
                </div>
              </div>
            </div>
            <button type="submit" disabled={isUpdating} className="customButton">
              Guardar
            </button>
            <button
              onClick={handleModalClose}
              disabled={isUpdating}
              className="deleteButton"
            >
              Cancelar
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default ProductAdmin;
