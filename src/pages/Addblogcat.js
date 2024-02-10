import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createblog, updateBlog } from "../features/blogs/blogSlice";
import { useNavigate, useParams } from "react-router-dom";
import {
  createBlogCategory,
  updateBlogCat,
} from "../features/bCategory/blogCategorySlice";

const Addblogcat = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogcatId } = useParams();

  const allBlogCategories = useSelector(
    (state) => state.blogCategory.blogCategories
  );

  const findBcategory = allBlogCategories.find(
    (bcategory) => bcategory._id === blogcatId
  );

  useEffect(() => {
    if (blogcatId !== undefined) {
      setTitle(findBcategory.title);
    } else {
      setTitle("");
    }
  }, [blogcatId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (blogcatId !== undefined) {
      dispatch(updateBlogCat({ id: blogcatId, title }));
      navigate("/admin/blog-category-list");
      setTitle("");
    } else {
      dispatch(createBlogCategory({ title }));
      navigate("/admin/blog-category-list");
      setTitle("");
    }
  };

  return (
    <div>
      <h3 className="mb-4">{blogcatId ? "Edit" : "Add"} Blog Catogory</h3>

      <div>
        <form onSubmit={handleSubmit} className="">
          <div className="mt-4">
            <input
              type="text"
              className="block w-full p-3 h-14 rounded mb-5 "
              placeholder="Enter Blog Category Title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <button type="submit" className="button-btn">
              {blogcatId ? "Edit" : "Add"} Blog Catogory
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addblogcat;
