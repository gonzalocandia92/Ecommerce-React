import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import styles from "./styles.module.css";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/Error";
import CardList from "../../components/CardList";
import CardChildren from "../../components/CardChildren";
import useCategories from "../../hooks/useCategories";
import useUpdateCategory from "../../hooks/useUpdateCategory";
import { useQueryClient } from "react-query";
import useDeleteCategory from "../../hooks/useDeleteCategory";


import "./modalStyles.css";

interface Category {
  id: number;
  name: string;
  image: string;
}

const CategoryAdmin: React.FC = () => {
    const { data, isLoading, error } = useCategories();
  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [newCategoryImage, setNewCategoryImage] = useState("");
  
    const { updateCategoryMutation, isLoading: isUpdating, handleSuccess } = useUpdateCategory({
        setError: console.error,
        setSuccess: () => setIsModalOpen(false),
    });

    const { deleteCategoryMutation } = useDeleteCategory({
        setError: console.error,
      });
    
      const queryClient = useQueryClient();

    
    const handleEditCategory = (category: Category) => {
      setEditingCategory(category);
      setNewCategoryName(category.name);
      setNewCategoryImage(category.image);
      setIsModalOpen(true);
    };

    const handleDeleteCategory = async (categoryId: number) => {
        try {
          await deleteCategoryMutation.mutateAsync(categoryId);
          queryClient.invalidateQueries("categories");
        } catch (error) {
          console.error("Error deleting category:", error);
        }
      };
  
    const handleModalClose = () => {
      setIsModalOpen(false);
    };
  
    const handleModalSubmit = async () => {
        if (editingCategory && newCategoryName.trim() !== "" && newCategoryImage.trim() !== "") {
          const { id } = editingCategory;
          await updateCategoryMutation.mutateAsync({ id, name: newCategoryName, image: newCategoryImage });
          handleSuccess();
        }
      };
  
    if (isLoading) {
      return <Loader />;
    }
  
    if (error) {
      return <ErrorMessage message={(error as Error).message} />;
    }

  return (
    <div className={styles.categoryList}>
      <h2>Categories</h2>
      <CardList>
        {data?.map((category) => (
          <div className={styles.withButton} key={category.id}>
            <Link to={`/category/${category.id}/products`}>
              <CardChildren image={category.image} title={category.name} />
            </Link>
            <button onClick={() => handleEditCategory(category)}>Editar</button>
            <button className={styles.deleteButton} onClick={() => handleDeleteCategory(category.id)}>Eliminar</button>
          </div>
        ))}
      </CardList>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        className="customModal"
        overlayClassName="customOverlay"
      >
        <h2>Editar Categoría</h2>
        {editingCategory && (
          <form onSubmit={(e) => { e.preventDefault(); handleModalSubmit(); }}>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="customInput"
              />
            </div>
            <div>
              <label htmlFor="image">URL de la imagen:</label>
              <input
                type="text"
                id="image"
                value={newCategoryImage}
                onChange={(e) => setNewCategoryImage(e.target.value)}
                className="customInput"
              />
            </div>
            <button type="submit" disabled={isUpdating} className="customButton">
              Guardar
            </button>
            <button
              onClick={handleModalClose}
              disabled={isUpdating}
              className="customButton"
            >
              Cancelar
            </button>
          </form>
        )}
      </Modal>
      
    </div>
  );
};

export default CategoryAdmin;
