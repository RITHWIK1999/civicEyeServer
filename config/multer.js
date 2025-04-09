const multer = require("multer");
const path = require("path");

const allowedFileTypes = /jpeg|jpg|png|mp4|mov|avi|mkv/;

// File Filter: Allow only images and videos
const fileFilter = (req, file, cb) => {
  // const fileTypes = /jpeg|jpg|png|gif|mp4|mov|avi|mkv/;
  const extname = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype =
    file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/");

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    return cb(new Error("Only images and videos are allowed!"), false);
  }
};

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});

module.exports = upload;
