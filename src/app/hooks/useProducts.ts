import { useState } from "react";
import { useQuery } from "react-query";
import Product from "../interfaces/Product";


const fetchProducts = async (query: string) => {
  const response = await fetch(`https://api.escuelajs.co/api/v1/products${query}`);
  if (!response.ok) {
    const errorMessage = "Failed to fetch products";
    throw new Error(errorMessage);
  }
  const data = await response.json();
  return data as Product[];
};

const useProducts = (filterByCategory: boolean | undefined, categoryId?: string, ) => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [priceMin, setPriceMin] = useState("");
    const [priceMax, setPriceMax] = useState("");
  
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    };
  
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setCategory(e.target.value);
    };
  
    const handlePriceMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPriceMin(e.target.value);
    };
  
    const handlePriceMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPriceMax(e.target.value);
    };
  
    const handleFilterClick = () => {
      const queryParams = `?title=${title}&categoryId=${category}&price_min=${priceMin}&price_max=${priceMax}`;
      setFilteredProductsQuery(queryParams);
    };
  
    const [filteredProductsQuery, setFilteredProductsQuery] = useState("");
  
    const { data: productsData, isLoading: isLoadingProducts, error: productsError } = useQuery<Product[], Error>(
      ["products", filteredProductsQuery],
      () => fetchProducts(filteredProductsQuery)
    );
  
    const filteredProducts = filterByCategory && categoryId ? productsData?.filter(product => product.category.id === parseInt(categoryId)) : productsData;
  
    return {
      title,
      handleTitleChange,
      category,
      handleCategoryChange,
      priceMin,
      handlePriceMinChange,
      priceMax,
      handlePriceMaxChange,
      handleFilterClick,
      productsData: filteredProducts, 
      isLoadingProducts,
      productsError,
    };
  };
  
  export default useProducts;