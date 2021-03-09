const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");
cloudinary.config({
  cloud_name: "shevadead",
  api_key: "557182435385558",
  api_secret: "OgGKzWVQA1l_HTp-yNOOkKAOv-k",
});

const loader = multer({
  dest: path.join(__dirname, "tmp"),
});

exports.photoUpload = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath);
    const url = cloudinary.url(`${result.public_id}.jpg`, {
      width: 100,
      height: 100,
    });
    return url;
  } catch (error) {
    return {};
  }
  //   fs.unlink(req.file.path);
};
