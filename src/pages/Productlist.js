import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../features/product/productSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Price",
    dataIndex: "price",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const Productlist = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  const { products } = useSelector((state) => state.product);

  const data1 = [];
  for (let i = 0; i < products.length; i++) {
    data1.push({
      key: i + 1,
      title: products[i].title,
      brand: products[i].brand,
      category: products[i].category,
      price: `${products[i].price}`,
      action: (
        <>
          <Link to="/" className=" ">
            <BiEdit />
          </Link>
          <Link className="ms-3" to="/">
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  }

  return (
    <div>
      <h3 className="mb-4 title">Productlist</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Productlist;
