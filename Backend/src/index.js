require("dotenv").config({ path: "./.env" });
const { app } = require("./app.js");
const { dbConnection } = require("./app.js");

const port = process.env.PORT || 7000;

dbConnection()
  .then(() => {
    app.listen(port, () => console.log(`Server Started at PORT: ${port}`));
    app.on("error", (error) => {
      console.log(`Server Connection Error: ${error}`);
    });
  })
  .catch((error) => console.log(`MongoDB Conncetion Error: ${error}`));
