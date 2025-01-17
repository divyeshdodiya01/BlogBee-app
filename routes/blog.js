const express = require("express");
const {
  getNewBlogs,
  postNewBlogs,
  upload,
  viewBlogs,
  postComments,
} = require("../controllers/blog");

const router = express.Router();

router.get("/add-new", getNewBlogs);
router.get("/:id", viewBlogs);
router.post("/create-new", upload.single("coverImage"), postNewBlogs);
router.post("/comment/:blogId", postComments);

module.exports = router;
