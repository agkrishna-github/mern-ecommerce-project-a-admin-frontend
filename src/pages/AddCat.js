import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPcategory,
  updatePcategory,
} from "../features/productCategory/ProductCategorySlice";
import { useNavigate, useParams } from "react-router-dom";

const AddCat = () => {
  const [catTitle, setCatTitle] = useState("");
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pCategories } = useSelector((state) => state.pCategory);

  useEffect(() => {
    if (categoryId !== undefined) {
      const category = pCategories.find(
        (category) => category._id === categoryId
      );
      setCatTitle(category.title);
    } else {
      setCatTitle("");
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    if (categoryId !== undefined) {
      dispatch(updatePcategory({ _id: categoryId, title: catTitle }));
      setCatTitle("");
      navigate("/admin/list-category");
    } else {
      dispatch(createPcategory({ title: catTitle }));
      setCatTitle("");
      navigate("/admin/list-category");
    }
  };
  return (
    <div>
      <h3 className="mb-4">{categoryId ? "Edit" : "Add"} Category</h3>
      <div>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            value={catTitle}
            onChange={(e) => setCatTitle(e.target.value)}
            placeholder="Enter Category"
            className="block w-full p-3 h-14 rounded mb-5 "
          />
          <div>
            <button type="submit" className="button-btn">
              {categoryId ? "Edit" : "Add"} Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCat;
