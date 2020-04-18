const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname +
        path.extname(file.originalname) +
        Math.floor(Math.random * 10000) +
        ".jpg"
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000000000 },
}).single("photo");

module.exports = upload;
