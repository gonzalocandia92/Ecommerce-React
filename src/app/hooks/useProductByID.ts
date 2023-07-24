import { useQuery } from 'react-query';
import Product from '../interfaces/Product';


const fetchProductByID = async (productId: number): Promise<Product> => {
  const response = await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch product details");
  }
  const data = await response.json();
  return data as Product;
};

const useProductByID = (productId: number) => {
  const { data: product, isLoading, error } = useQuery<Product, Error>(['product', productId], () => fetchProductByID(productId));

  return { product, isLoading, error };
};

export default useProductByID;
