import React, { useEffect, useState } from "react";

import { Table } from "antd";

import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { getAllEnquiries } from "../features/enquiry/enquirySlice";
import { useDispatch } from "react-redux";

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
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Staus",
    dataIndex: "status",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const Enquiries = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllEnquiries());
  }, []);

  const data1 = [];
  for (let i = 0; i < 46; i++) {
    data1.push({
      key: i + 1,
      name: `Edward King ${i}`,
      email: "gk@gmail.com",
      mobile: "999999999",
      staus: (
        <>
          <select
            name=""
            defaultValue="Submitted"
            className=""
            id=""
            // onChange={(e) => setEnquiryStatus(e.target.value, enqState[i]._id)}
          >
            <option value="Submitted">Submitted</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </>
      ),
      action: (
        <>
          <Link className="" to="">
            <AiOutlineEye />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            // onClick={() => showModal(enqState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  return (
    <div>
      <h3 className="mb-4 title">Enquiries</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Enquiries;
