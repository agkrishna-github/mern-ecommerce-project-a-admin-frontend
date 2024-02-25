import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { getallBrands } from "../features/brand/brandSlice";
import { getAllPcategories } from "../features/productCategory/ProductCategorySlice";
import { getColors } from "../features/color/colorSlice";
import { Select } from "antd";
import { uploadImg, delImg } from "../features/upload/uploadSlice";
import { createProduct, updateProduct } from "../features/product/productSlice";
import TextField from "@mui/material/TextField";
import { useNavigate, useParams } from "react-router-dom";

const Addproduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [images, setImages] = useState([]);
  const [color, setColor] = useState([]);

  const imageState = useSelector((state) => state.upload.images);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { prodId } = useParams();

  useEffect(() => {
    dispatch(getallBrands());
    dispatch(getColors());
    dispatch(getAllPcategories());
  }, []);

  const brandState = useSelector((state) => state.brand.brands);
  const catState = useSelector((state) => state.pCategory.pCategories);
  const productState = useSelector((state) => state.product.products);
  const colorState = useSelector((state) => state.color.colors);

  useEffect(() => {
    if (prodId) {
      const foundProduct = productState.find(
        (product) => product._id === prodId.toString()
      );
      console.log(foundProduct);
      if (foundProduct) {
        setTitle(foundProduct.title);
        setDescription(foundProduct.description);
        setPrice(foundProduct.price);
        setBrand(foundProduct.brand);
        setCategory(foundProduct.category);
        setTags(foundProduct.tags);
        setQuantity(foundProduct.quantity);
        setColor(foundProduct.color);
      } else {
        setTitle("");
        setDescription("");
        setPrice("");
        setBrand("");
        setCategory("");
        setTags("");
        setQuantity("");
        setColor("");
      }
    }
  }, [prodId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (prodId) {
      dispatch(
        updateProduct({
          prod: {
            title,
            description,
            price,
            brand,
            category,
            quantity,
            images,
            tags,
            color,
          },
          _id: prodId,
        })
      );
    } else {
      dispatch(
        createProduct({
          title,
          description,
          price,
          brand,
          category,
          quantity,
          images,
          tags,
          color,
        })
      );
    }

    setTimeout(() => {
      navigate("/admin/list-product");
    }, [300]);
    setTitle("");
    setDescription("");
    setPrice("");
    setBrand("");
    setCategory("");
    setQuantity("");
    setColor("");
  };

  const img = [];
  imageState?.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  const colorOpt = [];
  colorState?.forEach((i) => {
    colorOpt.push({
      label: i.title,
      value: i._id,
    });
  });

  useEffect(() => {
    setImages(img);
  }, [imageState]);

  const handleColors = (value) => {
    setColor(value);
  };

  return (
    <div>
      <h3 className="mb-4">{prodId ? "Edit" : "Add"} Product</h3>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <TextField
              className="w-full p-3 h-14 rounded mb-5 "
              id="outlined-basic"
              label="Enter Product Title"
              variant="outlined"
              type="text"
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

          <select
            onChange={(e) => setTags(e.target.value)}
            value={tags}
            className="block w-full p-3 mb-3"
            id=""
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="featured">Featured</option>
            <option value="popular">Popular</option>
            <option value="special">Special</option>
          </select>

          <Select
            mode="multiple"
            allowClear
            className="w-full inline-block h-[40px]"
            placeholder="Select Colors"
            defaultValue={color}
            onChange={(e) => handleColors(e)}
            options={colorOpt}
          />

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
              {prodId ? "Edit" : "Add"} Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
