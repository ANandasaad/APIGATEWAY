const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();
const PORT = 3005;
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  "/bookingservice",
  createProxyMiddleware({
    target: "http://localhost:3002/",
    changeOrigin: true,
  })
);
app.get("/home", function (req, res) {
  res.json({
    success: true,
    message: "Welcome",
  });
});
app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
