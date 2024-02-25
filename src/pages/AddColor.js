import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createColor } from "../features/color/colorSlice";
import { useNavigate } from "react-router-dom";

const AddColor = () => {
  const [title, settitle] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createColor(title));

    navigate("/admin/list-color");
    settitle("");
  };
  return (
    <main>
      <h3 className="p-3">Add Color</h3>
      <div>
        <form onSubmit={submitHandler} className="p-3">
          <div>
            <input
              type="color"
              className=""
              placeholder="Enter Product Color"
              value={title}
              onChange={(e) => settitle(e.target.value)}
            />
          </div>
          <div>
            <button type="submit" className="button-btn">
              Add Color
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AddColor;
