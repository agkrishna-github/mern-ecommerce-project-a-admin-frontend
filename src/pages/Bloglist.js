import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllBlogs, deleteBlog } from "../features/blogs/blogSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "name",
  },

  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Bloglist = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const deleteABlog = (id) => {
    setOpen(!open);
    dispatch(deleteBlog(id));
  };

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [open]);

  const allBlogs = useSelector((state) => state.blog.blogs);

  const data1 = [];
  for (let i = 0; i < allBlogs.length; i++) {
    data1.push({
      key: i + 1,
      name: allBlogs[i].title,
      category: allBlogs[i].category,
      action: (
        <>
          <Link
            to={`/admin/blog/${allBlogs[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => deleteABlog(allBlogs[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  return (
    <div>
      <h3 className="mb-4 title">Blog List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Bloglist;
