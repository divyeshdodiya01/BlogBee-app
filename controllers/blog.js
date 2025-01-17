const multer = require("multer");
const path = require("path");
const Blog = require("../models/blog");
const Comment = require("../models/comment");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req.body, "This is checking for body");

    cb(null, path.resolve(`./public/upload/`));
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

const viewBlogs = async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({ blogId: req.params.id }).populate(
    "createdBy"
  );
  console.log(comments);

  return res.render("blog.ejs", {
    user: req.user,
    blog,
    comments,
  });
};

const getNewBlogs = async (req, res) => {
  return res.render("addBlog.ejs", {
    user: req.user,
  });
};

const postNewBlogs = async (req, res) => {
  console.log(req.body);
  console.log(req.file, "File");
  const { title, body } = req.body;
  const blog = await Blog.create({
    title,
    body,
    createdBy: req.user._id,
    coverImageUrl: `/upload/${req.file.filename}`,
  });

  return res.redirect(`/blog/${blog._id}`);
};

const postComments = async (req, res) => {
  console.log(req.user._id, "This is an ID");

  const comment = await Comment.create({
    comment: req.body.comment,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${req.params.blogId}`);
};
module.exports = { getNewBlogs, postNewBlogs, upload, viewBlogs, postComments };
