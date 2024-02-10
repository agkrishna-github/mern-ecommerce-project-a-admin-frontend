import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createblog, updateBlog } from "../features/blogs/blogSlice";
import { useNavigate, useParams } from "react-router-dom";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogId } = useParams();

  const allBlogs = useSelector((state) => state.blog.blogs);

  useEffect(() => {
    const foundBlog = allBlogs.find((blog) => blog._id === blogId);

    if (blogId !== undefined) {
      setTitle(foundBlog.title);
      setCategory(foundBlog.category);
      setDescription(foundBlog.description);
    } else {
      setTitle("");
      setCategory("");
      setDescription("");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (blogId !== undefined) {
      dispatch(updateBlog({ id: blogId, title, category, description }));
      navigate("/admin/blog-list");
      setTitle("");
      setCategory("");
      setDescription("");
    } else {
      dispatch(createblog({ title, category, description }));
      navigate("/admin/blog-list");
      setTitle("");
      setCategory("");
      setDescription("");
    }
  };

  return (
    <div>
      <h3 className="mb-4">{blogId ? "Edit" : "Add"} Blog</h3>

      <div>
        <form onSubmit={handleSubmit} className="">
          <div className="mt-4">
            <input
              type="text"
              className="block w-full p-3 h-14 rounded mb-5 "
              placeholder="Enter Blog Title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <select
            name="category"
            value={category}
            className="block w-full p-3 mb-3"
            id=""
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Blog Category</option>
            <option value="food">FOOD</option>
            <option value="games">GAMES</option>
            <option value="services">SERVICES</option>
          </select>
          <div className="mt-4">
            <input
              type="text"
              value={description}
              className="block w-full p-3 h-14 rounded mb-5 "
              placeholder="Enter Description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <button type="submit" className="button-btn">
              {blogId ? "Edit" : "Add"} Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
