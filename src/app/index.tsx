import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
        <Routes>
          <Route path="/" element={<Layout loggedIn={loggedIn} setLoggedIn={handleSetLoggedIn} />}>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:categoryId/products" element={<ProductsByCategory />} />
            <Route path="/products" element={<Products />} />
            <Route path="/login" element={
                <PrivateRoute>
                  <LoginUser setLoggedIn={handleSetLoggedIn} />
                </PrivateRoute> }/>
            <Route path="/register" element={
                <PrivateRoute>
                  <RegisterUser setLoggedIn={handleSetLoggedIn} />
                </PrivateRoute> }/>
          </Route>

          <Route path="/dashboard"  element={ 
              <AdminRoute> <><Dashboard loggedIn={loggedIn} setLoggedIn={handleSetLoggedIn}/> </></AdminRoute>}>
          </Route>

          <Route path="/products/edit"  element={ 
              <AdminRoute> <><Dashboard loggedIn={loggedIn} setLoggedIn={handleSetLoggedIn}>
                <Products />
              </Dashboard></></AdminRoute>}>
          </Route>

          <Route path="/products/create"  element={ 
              <AdminRoute> <><Dashboard loggedIn={loggedIn} setLoggedIn={handleSetLoggedIn}>
                <CreateProduct />
              </Dashboard></></AdminRoute>}>
          </Route>

          <Route path="/categories/edit"  element={ 
              <AdminRoute> <><Dashboard loggedIn={loggedIn} setLoggedIn={handleSetLoggedIn}>
                <Categories />
              </Dashboard></></AdminRoute>}>
          </Route>

          <Route path="/categories/create"  element={ 
              <AdminRoute> <><Dashboard loggedIn={loggedIn} setLoggedIn={handleSetLoggedIn}>
                <CreateCategory/>
              </Dashboard></></AdminRoute>}>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
