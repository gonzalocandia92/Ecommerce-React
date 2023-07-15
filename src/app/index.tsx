import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./screens/Products";
import NotFound from "./screens/NotFound";
import Layout from "./components/Layout";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductsByCategory from "./screens/ProductsByCategory";
import Categories from "./screens/Categories";
import Home from "./screens/Home";
import LoginUser from "./screens/LoginUser";
import RegisterUser from "./screens/RegisterUser";

const queryClient = new QueryClient();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSetLoggedIn = (loggedIn: boolean) => {
    setLoggedIn(loggedIn);
  };
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout loggedIn={loggedIn} setLoggedIn={handleSetLoggedIn} />}>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/category/:categoryId/products" element={<ProductsByCategory />} />
              <Route path="/products" element={<Products />} />
              <Route path="/login" element={<LoginUser setLoggedIn={handleSetLoggedIn} />} />
              <Route path="/register" element={<RegisterUser />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;