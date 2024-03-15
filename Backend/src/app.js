const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const credentials = require("./middlewares/credentials.middleware.js");
const app = express();

//middlweares
app.use(credentials);
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//route imports
const { userRouter } = require("./routes/user.routes.js");
const { joblistingRouter } = require("./routes/joblisting.routes.js");
const { assessmentRouter } = require("./routes/assessment.routes.js");
const { mailRouter } = require("./routes/mail.routes.js");
const { candidateRouter } = require("./routes/candidate.routes.js");

//routes declarations
app.use("/users", userRouter);
app.use("/joblistings", joblistingRouter);
app.use("/assessment", assessmentRouter);
app.use("/mails", mailRouter);
app.use("/candidate", candidateRouter);

//db connection function
const dbConnection = async () => {
  const connectionInstance = await mongoose.connect(
    `${process.env.MONGODB_URI}`
  );
  console.log(`MongoDb Connection Success`);
  console.log(`DB Host: ${connectionInstance.connection.host}`);
};

module.exports = { dbConnection, app };

/* const dbConnection = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`
    );
    console.log(`MongoDb Connection Success`);
    console.log(`DB Host: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("MongoDB Connection Error: ", error);
  }
}; */
