const User = require("../models/user");

const getSignInUser = async (req, res) => {
  return res.render("signin.ejs", { error: null });
};

const getSignUpUser = async (req, res) => {
  return res.render("signup.ejs");
};

const postSignUpUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  console.log(req.body);
  try {
    await User.create({
      fullName,
      email,
      password,
    });
    return res.redirect("/user/signin");
  } catch (error) {
    return res.render("signup.ejs", { error: error.message });
  }
};
const postSignInUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenrateToken(email, password);
    console.log(token, "Token");

    return res.cookie("token", token).redirect("/");
  } catch (error) {
    console.log(error, "This ...");

    return res.render("signin.ejs", { error: error.message });
  }
};
const getLogedOut = async (req, res) => {
  return res.clearCookie("token").redirect("/");
};
module.exports = {
  getSignInUser,
  getSignUpUser,
  postSignUpUser,
  postSignInUser,
  getLogedOut,
};
