import Loader from "../../components/Loader";
import ErrorMessage from "../../components/Error";
import styles from "./styles.module.css";
import CardList from "../../components/CardList";
import CardChildren from "../../components/CardChildren";
import useCategories from "../../hooks/useCategories";
import useProducts from "../../hooks/useProducts";
import { Link } from "react-router-dom"; 

const ProductListView: React.FC = () => {
  
  const { data: categories, isLoading: isLoadingCategories, error: categoriesError } = useCategories();

  const {
    title, handleTitleChange,
    category, handleCategoryChange,
    priceMin, handlePriceMinChange,
    priceMax, handlePriceMaxChange,
    handleFilterClick,
    productsData, isLoadingProducts, productsError,
  } = useProducts(false);

  if (isLoadingCategories || isLoadingProducts) {
    return <Loader />;
  }

  if (categoriesError || productsError) {
    const errorMessage = categoriesError?.message || productsError?.message || "An error occurred.";
    return <ErrorMessage message={errorMessage} />;
  }

  
  const filteredProducts = productsData || [];

  return (
    <div className={styles.productList}>
      <h2>Product List</h2>

      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
          className={styles.filterInput}
        />
        <select
          value={category}
          onChange={handleCategoryChange}
          className={styles.filterSelect}
        >
          <option value="">All Categories</option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id.toString()}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Min Price"
          value={priceMin}
          onChange={handlePriceMinChange}
          className={styles.filterInput}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={priceMax}
          onChange={handlePriceMaxChange}
          className={styles.filterInput}
        />
        <button onClick={handleFilterClick} className={styles.filterButton}>
          Filtrar
        </button>
      </div>

      {filteredProducts.length > 0 ? (
        <CardList>
          {filteredProducts.map((product) => (
            <div key={product.id} className={styles.productCard}>
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
      ) : (
        <h1 className={styles.noProductsMessage}>No products found.</h1>
      )}
    </div>
  );
};

export default ProductListView;
