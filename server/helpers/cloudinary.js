const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: "dw5cc04j6",
  api_key: "889342388714856",
  api_secret: "p7586dasAAGYJAxhNRB1qv_GIJ8",
});

const storage = new multer.memoryStorage();

async function imageUploadUtils(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return result;
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtils };
