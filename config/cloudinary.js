const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dhf7n7ccs",
  api_key: 915635679822482,
  api_secret: "lRwQNWO7YiapOsC18NXQY7p6Pm4",
});
const uploadImage = async (imagePath) => {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  //   const options = { public_id: imagePath, overwrite: true };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath);
    // console.log(result);
    return result.secure_url;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { uploadImage };
