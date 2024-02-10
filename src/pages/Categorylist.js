import React, { useEffect, useState } from "react";

import { Table } from "antd";

import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPcategories,
  deletePcategory,
} from "../features/productCategory/ProductCategorySlice";

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

const Categorylist = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);

  const deletecategory = (id) => {
    setOpen(!open);
    dispatch(deletePcategory(id));
  };

  useEffect(() => {
    dispatch(getAllPcategories());
  }, [open]);

  const { pCategories } = useSelector((state) => state.pCategory);

  const data1 = [];
  for (let i = 0; i < pCategories.length; i++) {
    data1.push({
      key: i + 1,
      name: pCategories[i].title,
      product: 32,
      action: (
        <>
          <Link to={`/admin/category/${pCategories[i]._id}`}>
            <BiEdit />
          </Link>
          <button
            className="ms-3"
            onClick={() => deletecategory(pCategories[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  return (
    <div>
      <h3 className="mb-4 title">Categorylist</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Categorylist;
