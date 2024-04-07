const { User } = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

//registering user
const registerUser = async (req, res) => {
  //console.log(req.body);
  const { username, password, apiKey } = req.body;

  if (!username || !password || !apiKey) {
    //console.log("Error: Empty Fields");
    return res.status(400).json({ error: "Fields Cannot Be Empty" });
  }

  const userExists = await User.findOne({
    $or: [{ username }, { apiKey }],
  });

  if (userExists) return res.status(409).json({ error: "User Already Exists" });
  const user = await User.create({
    username,
    password,
    apiKey,
  });

  const userCreated = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!userCreated)
    return res.status(500).json({ error: "Cannot Create User" });

  return res
    .status(201)
    .json({ message: "User Created", userDetails: userCreated });
};

//user login
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username && !password)
    return res
      .status(400)
      .json({ error: "Username and Password is required!" });

  const foundUser = await User.findOne({ username });
  if (!foundUser)
    return res.status(401).json({ error: "User Does Not Exists!" });

  const isPasswordValid = await foundUser.checkPassword(password);
  if (!isPasswordValid)
    return res.status(401).json({ error: "Invalid Password" });

  const refreshToken = foundUser.generateRefreshToken();
  const accessToken = foundUser.generateAccessToken();
  if (!refreshToken && !accessToken)
    return res
      .status(500)
      .json({ error: "Could not generate refresh and sccess tokens" });

  foundUser.refreshToken = refreshToken;
  await foundUser.save({ validateBeforeSave: false });

  const loggedInUser = await User.findById(foundUser._id).select(
    "-password -refrershToken"
  );
  if (!loggedInUser)
    return res.status(500).json({ error: "Could not loggin!" });

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, { httpOnly: true })
    .cookie("accessToken", accessToken, { httpOnly: true })
    .json({
      message: `${loggedInUser.username} Successfully loggedIn`,
      userInfo: loggedInUser,
      accessToken,
      refreshToken,
    });
};

//logout user
const logoutUser = async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    { $set: { refreshToken: undefined } },
    { new: true }
  );

  return res
    .status(200)
    .clearCookie("refreshToken", { httpOnly: true })
    .clearCookie("accessToken", { httpOnly: true })
    .json({
      message: `${req.user.username} logged-Out Successfully`,
    });
};

//refresh access token
const refreshAccessToken = async (req, res) => {
  const token =
    req.cookies?.refreshToken ||
    req.headers("Authorization").replace("Bearer ", "");
  if (!token)
    return res
      .status(401)
      .json({ error: "Unauthhorized Access (No Refresh Token)" });

  const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

  const foundUser = await User.findById(decodedToken?._id);
  if (!foundUser)
    return res
      .status(401)
      .json({ error: "Unauthhorized Access(Could not find user)" });

  if (token != foundUser?.refreshToken)
    return res
      .status(401)
      .json({ error: "Unauthhorized Access(refresh topkens dont match)" });

  const newRefreshToken = foundUser.generateRefreshToken();
  const newAccessToken = foundUser.generateAccessToken();

  foundUser.refreshToken = newRefreshToken;
  await foundUser.save({ validateBeforeSave: false });

  return res
    .status(200)
    .cookie("refreshToken", newRefreshToken, { httpOnly: true })
    .cookie("accessToken", newAccessToken, { httpOnly: true })
    .json({
      message: "RefreshToken refreshed successfully",
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
};

module.exports = { registerUser, loginUser, logoutUser, refreshAccessToken };
