import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createBrand,
  selectAllBrands,
  updateBrand,
} from "../features/brand/brandSlice";
import { useNavigate, useParams } from "react-router-dom";

const Addbrand = () => {
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const brands = useSelector(selectAllBrands);
  const { brandId } = useParams();

  useEffect(() => {
    if (brandId !== undefined) {
      const existingBrand = brands.find((brand) => brand._id === brandId);
      setTitle(existingBrand.title);
    } else {
      setTitle("");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (brandId !== undefined) {
      dispatch(updateBrand({ brandId, title }));
      setTitle("");
    } else {
      dispatch(createBrand({ title }));
      setTitle("");
    }
    navigate("/admin/list-brand");
    setTitle("");
  };
  return (
    <div>
      <h3 className="mb-4">{brandId !== undefined ? "Edit" : "Add"} Brand</h3>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Brand"
            className="block w-full p-3 h-14 rounded mb-5 "
          />
          <div>
            <button type="submit" className="button-btn">
              {brandId !== undefined ? "Edit" : "Add"} Brand
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addbrand;
