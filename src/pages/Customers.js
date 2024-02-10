import React, { useEffect } from "react";
import { getUsers } from "../features/customers/customerSlice";

import { Table } from "antd";

import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
];

const Customers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);
  const { customers } = useSelector((state) => state.customer);

  const data1 = [];
  for (let i = 0; i < customers.length; i++) {
    if (customers[i].role !== "admin") {
      data1.push({
        key: i + 1,
        name: customers[i].firstname + " " + customers[i].lastname,
        email: customers[i].email,
        mobile: customers[i].mobile,
      });
    }
  }

  return (
    <div>
      <h3 className="mb-4 title">Customers</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Customers;
