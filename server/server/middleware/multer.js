const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.floor(Math.random() * 1000000)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

exports.upload = multer({ storage });
