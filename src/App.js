import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./components/MainLayout";
import Enquiries from "./pages/Enquiries";
import Bloglist from "./pages/Bloglist";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Categorylist from "./pages/Categorylist";
import Brandlist from "./pages/Brandlist";
import Blogcatlist from "./pages/Blogcatlist";
import Productlist from "./pages/Productlist";
import AddBlog from "./pages/AddBlog";
import Addblogcat from "./pages/Addblogcat";
import AddCat from "./pages/AddCat";
import Addbrand from "./pages/AddBrand";
import Addproduct from "./pages/Addproduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="blog-list" element={<Bloglist />} />
          <Route path="blog" element={<AddBlog />} />
          <Route path="blog/:blogId" element={<AddBlog />} />
          <Route path="blog-category-list" element={<Blogcatlist />} />
          <Route path="blog-category" element={<Addblogcat />} />
          <Route path="blog-category/:blogcatId" element={<Addblogcat />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="list-category" element={<Categorylist />} />
          <Route path="category" element={<AddCat />} />
          <Route path="category/:categoryId" element={<AddCat />} />
          <Route path="list-brand" element={<Brandlist />} />
          <Route path="brand" element={<Addbrand />} />
          <Route path="brand/:brandId" element={<Addbrand />} />
          <Route path="list-product" element={<Productlist />} />
          <Route path="product" element={<Addproduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
