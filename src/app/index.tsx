import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Products from './screens/Products';
import NotFound from './screens/NotFound';
import Layout from './components/Layout';
import ProductsByCategory from './screens/ProductsByCategory';
import Categories from './screens/Categories';
import Home from './screens/Home';
import LoginUser from './screens/LoginUser';
import RegisterUser from './screens/RegisterUser';
import { PrivateRoute } from './components/PrivateRoute';
import { AdminRoute } from './components/AdminRoute';
import Dashboard from './screens/Dashboard';
import CreateCategory from './screens/CreateCategory';
import CreateProduct from './screens/CreateProduct';
import CategoryAdmin from './screens/CategoryAdmin';
import ProductAdmin from './screens/ProductAdmin';
import CartProvider from './hooks/CartContext';
import DetailProduct from './screens/DetailProduct.tsx';
import DetailCart from './screens/DetailCart/index.tsx';

const queryClient = new QueryClient();

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');

  const handleSetLoggedIn = (loggedIn: boolean | ((prevState: boolean) => boolean)) => {
    setLoggedIn(loggedIn);
    localStorage.setItem('loggedIn', loggedIn ? 'true' : 'false');
  };
  
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <CartProvider>
          
          <Routes>
            <Route path="/" element={<Layout loggedIn={loggedIn} setLoggedIn={handleSetLoggedIn} />}>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/category/:categoryId/products" element={<ProductsByCategory />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:productId" element={<DetailProduct />} />
              <Route path="/login" element={<PrivateRoute><LoginUser setLoggedIn={handleSetLoggedIn} /></PrivateRoute>} />
              <Route path="/register" element={<PrivateRoute><RegisterUser setLoggedIn={handleSetLoggedIn} /></PrivateRoute>} />
              <Route path="/cart/detail" element={<DetailCart />} />
            </Route>
 
            <Route path="/dashboard" element={<AdminRoute><Dashboard loggedIn={loggedIn} setLoggedIn={handleSetLoggedIn} /></AdminRoute>} />
            <Route path="/product/edit" element={<AdminRoute><Dashboard loggedIn={loggedIn} setLoggedIn={handleSetLoggedIn}><ProductAdmin /></Dashboard></AdminRoute>} />
            <Route path="/products/create" element={<AdminRoute><Dashboard loggedIn={loggedIn} setLoggedIn={handleSetLoggedIn}><CreateProduct /></Dashboard></AdminRoute>} />
            <Route path="/categories/edit" element={<AdminRoute><Dashboard loggedIn={loggedIn} setLoggedIn={handleSetLoggedIn}><CategoryAdmin /></Dashboard></AdminRoute>} />
            <Route path="/categories/create" element={<AdminRoute><Dashboard loggedIn={loggedIn} setLoggedIn={handleSetLoggedIn}><CreateCategory /></Dashboard></AdminRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
