//This is an Genral middleware which is check Every Req and res

const { validateToken } = require("../services/authentication");

// Higher Order Function.....

function checkForAuthenticationCookie(cookieName) {
  return function (req, res, next) {
    const tokenCookieValue = req.cookies[cookieName];
    // console.log(tokenCookieValue, "tokenCookieValue");
    if (!tokenCookieValue) {
      return next();
    }

    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
    } catch (error) {
      console.error("Token validation failed:", error);
    }
    return next();
  };
}

module.exports = {
  checkForAuthenticationCookie,
};
