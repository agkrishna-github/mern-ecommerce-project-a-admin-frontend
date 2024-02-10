import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { getallBrands } from "../features/brand/brandSlice";
import { getAllPcategories } from "../features/productCategory/ProductCategorySlice";

import { uploadImg, delImg } from "../features/upload/uploadSlice";
import { createProduct } from "../features/product/productSlice";
import { useNavigate } from "react-router-dom";

const Addproduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [images, setImages] = useState([]);

  const imageState = useSelector((state) => state.upload.images);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getallBrands());
    dispatch(getAllPcategories());
  }, []);

  const brandState = useSelector((state) => state.brand.brands);
  const catState = useSelector((state) => state.pCategory.pCategories);
  const newProduct = useSelector((state) => state.product);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createProduct({
        title,
        description,
        price,
        brand,
        category,
        quantity,
        images,
      })
    );

    setTimeout(() => {
      navigate("/admin/list-product");
    }, [2000]);
    setTitle("");
    setDescription("");
    setPrice("");
    setBrand("");
    setCategory("");
    setQuantity("");
  };

  const img = [];
  imageState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    setImages(img);
  }, [imageState]);

  return (
    <div>
      <h3 className="mb-4">Add Product</h3>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <input
              type="text"
              className="block w-full p-3 h-14 rounded mb-5 "
              placeholder="Enter Product Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <input
              type="text"
              className="block w-full p-3 h-14 rounded mb-5 "
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <input
              type="number"
              className="block w-full p-3 h-14 rounded mb-5 "
              placeholder="Enter Product Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <select
            name="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="block w-full p-3 mb-3"
            id=""
          >
            <option value="">Select Brand</option>
            {brandState.map((i, key) => (
              <option key={key} value={i.title}>
                {i.title}
              </option>
            ))}
          </select>
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="block w-full p-3 mb-3"
            id=""
          >
            <option value="">Select Category</option>
            {catState.map((j, key) => (
              <option key={key} value={j.title}>
                {j.title}
              </option>
            ))}
          </select>

          <div className="mt-4">
            <input
              type="number"
              className="block w-full p-3 h-14 rounded mb-5 "
              placeholder="Enter Product Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="cursor-pointer p-5 bg-white h-32 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div>
            {imageState?.map((i, j) => {
              return (
                <div className="relative" key={j}>
                  <button
                    type="button"
                    onClick={() => dispatch(delImg(i.public_id))}
                    className="absolute text-white"
                    style={{ top: "10px", left: "100px" }}
                  >
                    x
                  </button>
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>
          <div>
            <button type="submit" className="button-btn">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
