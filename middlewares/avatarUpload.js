const cloudinary = require("cloudinary").v2;
const path = require("path");
const fs = require("fs/promises");
cloudinary.config({
  cloud_name: "shevadead",
  api_key: "557182435385558",
  api_secret: "OgGKzWVQA1l_HTp-yNOOkKAOv-k",
});

exports.photoUpload = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      upload_preset: "avatarPreset",
    });
    fs.unlink(filePath);
    return result;
  } catch (error) {
    console.log(error);
  }
  
};
