const express = require("express");
const path = require("path");
const { config } = require("dotenv");
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middleware/authentication");
const Blog = require("./models/blog");
const mongoose = require("mongoose");

const app = express();

require("dotenv").config();

// Database Connection

const { MongoDbConnection } = require("./config/db");

MongoDbConnection(process.env.MONGO_URL);

//Ejs Init...

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

const port = process.env.PORT || 8001;

// Routes...

const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");

//middlewares

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));
app.get("/", async (req, res) => {
  console.log(req.user, "User...");
  const allBlogs = await Blog.find({});
  return res.render("homePage.ejs", {
    user: req.user,
    blogs: allBlogs,
  });
});
app.use("/user", userRouter);
app.use("/blog", blogRouter);
app.listen(port, () => {
  console.log(`Server is started on : ${port}`);
});
