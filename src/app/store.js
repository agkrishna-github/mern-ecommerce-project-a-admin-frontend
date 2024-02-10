import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customers/customerSlice";
import blogReducer from "../features/blogs/blogSlice";
import imgReducer from "../features/upload/uploadSlice";
import productReducer from "../features/product/productSlice";
import brandReducer from "../features/brand/brandSlice";
import pcategoryReducer from "../features/productCategory/ProductCategorySlice";
import blogCategoryReducer from "../features/bCategory/blogCategorySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    blog: blogReducer,
    upload: imgReducer,
    product: productReducer,
    brand: brandReducer,
    pCategory: pcategoryReducer,
    blogCategory: blogCategoryReducer,
  },
});
