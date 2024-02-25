import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadHomePageDetails,
  uploadHomePagesubDetails,
} from "../features/homepage/homepageSlice";
import { useNavigate, useParams } from "react-router-dom";

const AddHomeDetails = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imagesUrl1, setImagesUrl1] = useState("");
  const [imagesUrl2, setImagesUrl2] = useState("");
  const [imagesUrl3, setImagesUrl3] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [subdescription, setSubdescription] = useState("");
  const [subprice, setSubprice] = useState(0);
  const [subimagesUrl1, setSubimagesUrl1] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newDetails = {
      title,
      description,
      price,
      images: [imagesUrl1, imagesUrl2, imagesUrl3],
    };

    dispatch(uploadHomePageDetails(newDetails));
  };

  const handleSubmitSubDetails = (e) => {
    e.preventDefault();

    const newDetails = {
      subtitle,
      subdescription,
      subprice,
      images: subimagesUrl1,
    };

    dispatch(uploadHomePagesubDetails(newDetails));
  };

  return (
    <div>
      <h3 className="mb-4">ADD HOME DETAILS</h3>
      <div>
        <h3 className="py-2">Main Section</h3>

        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Title"
              className="block w-full p-3 h-14 rounded mb-5 "
            />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Description"
              className="block w-full p-3 h-14 rounded mb-5 "
            />
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter Price"
              className="block w-full p-3 h-14 rounded mb-5 "
            />
            <input
              type="text"
              value={imagesUrl1}
              onChange={(e) => setImagesUrl1(e.target.value)}
              placeholder="Image URL 1"
              className="block w-full p-3 h-14 rounded mb-5 "
            />
            <input
              type="text"
              value={imagesUrl2}
              onChange={(e) => setImagesUrl2(e.target.value)}
              placeholder="Image URL 2"
              className="block w-full p-3 h-14 rounded mb-5 "
            />
            <input
              type="text"
              value={imagesUrl3}
              onChange={(e) => setImagesUrl3(e.target.value)}
              placeholder="Image URL 3"
              className="block w-full p-3 h-14 rounded mb-5 "
            />

            <div>
              <button type="submit" className="button-btn">
                ADD HOME DETAILS
              </button>
            </div>
          </form>
          <form onSubmit={handleSubmitSubDetails} className="my-10">
            <h3 className="py-3">Sub Section</h3>

            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Enter Title"
              className="block w-full p-3 h-14 rounded mb-5 "
            />
            <input
              type="text"
              value={subdescription}
              onChange={(e) => setSubdescription(e.target.value)}
              placeholder="Enter Description"
              className="block w-full p-3 h-14 rounded mb-5 "
            />

            <input
              type="number"
              value={subprice}
              onChange={(e) => setSubprice(e.target.value)}
              placeholder="Enter Price"
              className="block w-full p-3 h-14 rounded mb-5 "
            />
            <input
              type="text"
              value={subimagesUrl1}
              onChange={(e) => setSubimagesUrl1(e.target.value)}
              placeholder="Image URL 1"
              className="block w-full p-3 h-14 rounded mb-5 "
            />

            <div>
              <button type="submit" className="button-btn">
                ADD HOME SUB DETAILS
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddHomeDetails;
