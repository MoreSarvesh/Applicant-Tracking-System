const { v2 } = require("cloudinary");
const fs = require("node:fs");

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  if (!localFilePath) {
    console.log("Local File Path is empty");
    return null;
  }
  try {
    const response = await v2.uploader.upload(localFilePath, {
      resource_type: "image",
    });
    //console.log(`File Uploaded: ${response.url}`);
    fs.unlinkSync(localFilePath);
    return response.url;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    console.log(`Error Uploading File: ${error}`);
    return null;
  }
};

module.exports = { uploadOnCloudinary };
