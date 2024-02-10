import React, { useEffect, useState } from "react";

import { Table } from "antd";

import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getallBrands, delteBrand } from "../features/brand/brandSlice";

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

const Brandlist = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const brands = useSelector((state) => state.brand.brands);

  const delteBrandHandler = (id) => {
    setOpen(!open);
    dispatch(delteBrand(id));
  };

  useEffect(() => {
    dispatch(getallBrands());
  }, [open]);

  const data1 = [];
  for (let i = 0; i < brands.length; i++) {
    data1.push({
      key: i + 1,
      name: brands[i].title,
      action: (
        <>
          <Link
            to={`/admin/brand/${brands[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link>

          <button
            className=""
            type="button"
            onClick={() => delteBrandHandler(brands[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  return (
    <div>
      <h3 className="mb-4 title">Brands</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Brandlist;
