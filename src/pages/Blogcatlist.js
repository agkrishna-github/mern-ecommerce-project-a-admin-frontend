import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getAllBlogCategories,
  deleBcategory,
} from "../features/bCategory/blogCategorySlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const Blogcatlist = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const deleteBlogCategory = (id) => {
    setOpen(!open);
    dispatch(deleBcategory(id));
  };

  useEffect(() => {
    dispatch(getAllBlogCategories());
  }, [open]);

  const allBlogCategories = useSelector(
    (state) => state.blogCategory.blogCategories
  );

  const data1 = [];
  for (let i = 0; i < allBlogCategories.length; i++) {
    data1.push({
      key: i + 1,
      name: allBlogCategories[i].title,
      action: (
        <>
          <Link
            to={`/admin/blog-category/${allBlogCategories[i]._id}`}
            className=" "
          >
            <BiEdit />
          </Link>
          <button
            className=""
            onClick={() => deleteBlogCategory(allBlogCategories[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  return (
    <div>
      <h3 className="mb-4 title">Blog Categories</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Blogcatlist;
