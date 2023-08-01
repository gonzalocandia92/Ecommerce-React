import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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

interface ProductsProp {
  categoryIdP?: string | undefined;
  filterByCategoryP?: string | undefined;
}

const ProductsByCategory: React.FC<ProductsProp> = ({ categoryIdP, filterByCategoryP }) => {
  const [filterByCategory, setFilterByCategory] = useState(false);
  const [categoryId, setCategoryId] = useState('');

  const { categoryId: routeCategoryId } = useParams<RouteParams>();

  useEffect(() => {
    if (filterByCategoryP && categoryIdP) {
      setFilterByCategory(filterByCategoryP === "true");
      setCategoryId(categoryIdP);
    } else {
      setFilterByCategory(true);
      setCategoryId(routeCategoryId || '');
    }
  }, [categoryIdP, filterByCategoryP, routeCategoryId]);

  const { productsData, isLoadingProducts, productsError } = useProducts(filterByCategory, categoryId);

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
      {currentProducts && currentProducts.length > 0 ? (
        <>
          <h1>Explore products from this category</h1>
          <CardList>
            {currentProducts.map((product) => (
              <div key={product.id} className={styles.categoryCard}>
              <Link to={`/product/${product.id}`} className={styles.productLink}>
                <CardChildren
                  image={product.images[0]}
                  title={product.title}
                  price={product.price}
                  description={product.description}
                />
              </Link>
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
