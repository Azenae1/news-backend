const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET } = require("../utils/config");
const { AuthErr } = require("../utils/err_auth");

const authorization = (req, res, next) => {
  const { authorization: auth } = req.headers;
  if (!auth || !auth.startsWith("Bearer ")) {
    return next(new AuthErr("The session is expired"));
  }
  const token = auth.replace("Bearer ", "");
  return jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return next(new AuthErr("Authorization required"));
    }
    req.user = payload;

    return next();
  });
};

module.exports = { authorization };
