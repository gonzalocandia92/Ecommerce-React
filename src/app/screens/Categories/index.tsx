import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/Error";
import CardList from "../../components/CardList";
import CardChildren from "../../components/CardChildren";
import useCategories from "../../hooks/useCategories";

interface Category {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

const Categories = () => {
  const { data, isLoading, error } = useCategories();

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
          <div key={category.id}>
            <Link to={`/category/${category.id}/products`}>
              <CardChildren image={category.image} title={category.name} />
            </Link>
          </div>
        ))}
      </CardList>
    </div>
  );
};

export default Categories;
