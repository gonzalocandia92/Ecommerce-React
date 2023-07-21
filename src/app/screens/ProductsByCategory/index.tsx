import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/Error";
import styles from "./styles.module.css";
import CardList from "../../components/CardList";
import CardChildren from "../../components/CardChildren";
import useProducts from "../../hooks/useProducts";

interface RouteParams {
  categoryId: string;
  [key: string]: string | undefined;
}

interface Category {
  id: number;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  category: Category;
}

const ProductsByCategory: React.FC = () => {
  const { categoryId } = useParams<RouteParams>();
  const { productsData, isLoadingProducts, productsError, } = useProducts(categoryId || '');

  // Calculating pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productsData?.slice(indexOfFirstProduct, indexOfLastProduct);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (isLoadingProducts) {
    return <Loader />;
  }

  if (productsError) {
    return <ErrorMessage message={(productsError as Error).message} />;
  }

  return (
    <div className={styles.categoryList}>
      <h2>Products by Category: {categoryId}</h2>
      {currentProducts && currentProducts.length > 0 ? (
        <>
          <CardList>
            {currentProducts.map((product) => (
              <div key={product.id} className={styles.categoryCard}>
                <CardChildren
                  image={product.images[0]}
                  title={product.title}
                  price={product.price}
                  description={product.description}
                />
              </div>
            ))}
          </CardList>

          <div className={styles.pagination}>
            {/* Pagination */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={styles.paginationButton}
            >
              {"<"}
            </button>
            <span className={styles.paginationPage}>Page: {currentPage}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={indexOfLastProduct >= (productsData?.length || 0)}
              className={styles.paginationButton}
            >
              {">"}
            </button>
          </div>
        </>
      ) : (
        <h1 className={styles.noProductsMessage}>
          Los sentimos, nos quedamos sin stock de productos para la categoría seleccionada.
        </h1>
      )}
    </div>
  );
};

export default ProductsByCategory;
