const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model.js");

const verifyJWT = async (req, res, next) => {
  const token = req.cookies?.accessToken;
  if (!token)
    return res
      .status(401)
      .json({ message: "Unauthorized request (no accessToken)" });

  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const foundUser = await User.findById(decodedToken._id).select(
    "-password -refreshtoken"
  );
  if (!foundUser)
    return res
      .status(401)
      .json({ message: "Unauthorized request (no user found)" });

  req.user = foundUser;
  next();
};

module.exports = { verifyJWT };
