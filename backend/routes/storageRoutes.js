const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer(); // using memory storage
const {
  uploadFile,
  getFiles,
  downloadFile,
} = require("../controllers/storageController");

router.post("/upload", upload.single("file"), uploadFile);
router.get("/", getFiles);
router.get("/:id", downloadFile);

module.exports = router;
