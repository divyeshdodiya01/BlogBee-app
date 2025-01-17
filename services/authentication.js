const JWT = require("jsonwebtoken");

const secret = "$upermanSecretKey@123";

const createTokenForUser = (user) => {
  const playload = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };
  const token = JWT.sign(playload, secret);
  return token;
};

const validateToken = (token) => {
  const playload = JWT.verify(token, secret);
  return playload;
};

module.exports = {
  createTokenForUser,
  validateToken,
};
