const { Router } = require("express");
const {
  getSignInUser,
  getSignUpUser,
  postSignInUser,
  postSignUpUser,
  getLogedOut,
} = require("../controllers/user");

const router = Router();

router.get("/signin", getSignInUser);
router.get("/signup", getSignUpUser);
router.post("/signin", postSignInUser);

router.post("/signup", postSignUpUser);
router.get("/logout", getLogedOut);

module.exports = router;
