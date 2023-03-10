const express = require("express");
const app = express();
const user = require("./routes/userRoute.js");
const Devotee = require("./routes/devoteeRoute.js");
const bodyParser = require("body-parser");
const ErrorMiddleWare = require("./middlewares/error.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");

if (process.env.NODE_ENV != "production") {
  require("dotenv").config({ path: `${__dirname}/config/config.env` });
}
require("dotenv").config();

const corsOrigin = {
  origin: ["http://localhost:3000", process.env.FRONTEND_URL], //or whatever port your frontend is using
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(express.json());
app.use(bodyParser.json());
app.use(cors(corsOrigin));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

//router imports
app.use("/api/v1", user);
app.use("/api/v1", Devotee);

//error middlewares

app.use(ErrorMiddleWare);

module.exports = app;
