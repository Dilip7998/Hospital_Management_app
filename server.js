const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
var bodyParser = require("body-parser");
const connectdb = require("./config/db");
const router = require("./routes/userRoutes");
const path = require("path");

dotenv.config();

//mongodb connections
connectdb();

const app = express();
//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//routes
// app.get("/", (req, res) => {
//   res.status(200).send({
//     msg: "server running",
//   });
// });

app.use("/api/v1/user", router);
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/doctor", require("./routes/doctorRoutes"));

app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const port = process.env.PORT || 8080;
//listen port
app.listen(port, () => {
  console.log("Server running on ", port);
});
