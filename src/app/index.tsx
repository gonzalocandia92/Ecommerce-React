import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./screens/Products";
// import ProductDetail from "./screens/ProductDetail";
// import Login from "./screens/Login";
// import Register from "./screens/Register";
// import ProductCreate from "./screens/ProductCreate";
// import ProductEdit from "./screens/ProductEdit";
// import CartDetail from "./screens/CartDetail";
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
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:categoryId/products" element={<ProductsByCategory />} />
            <Route path="/products" element={<Products />} />
            <Route path="/login" element={<LoginUser />} />
            <Route path="/register" element={<RegisterUser />} />
            {/* <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/products/create" element={<ProductCreate />} />
            <Route path="/products/edit/:id" element={<ProductEdit />} />
            <Route path="/cart-detail" element={<CartDetail />} /> */}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
