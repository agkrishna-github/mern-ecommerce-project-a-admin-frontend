// upload images in mern using multer

import axios from "axios";
import React from "react";

const [file, setFile] = useState();

const practice = () => {
  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", file);
    const response = axios.post("http://localhost:3001/upload", formData);
  };

  return (
    <div>
      <div>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
};

export default practice;

//////////////////

// in backend:

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

/* 
THIS IS FOR IMAGES ONLY

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file format" }, false);
  }
};

const uploadPhoto = multer({
  storage: storage,
  fileFilter: multerFilter,
  limits: { fileSize: 1000000 },
});

module.exports = { uploadPhoto }; */

/////////

App.post("/upload", uploadPhoto.single("file"), (req, res) => {
  const uploadedImagedata = UserModel.create({ image: req.file.filename });
  res.send(uploadedImagedata);
});
