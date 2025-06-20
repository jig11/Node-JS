const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
app.use(express.json());

app.get("/", (req, res) => {
  //  res.send("Hello, World!!");
   res.json({"message":"Hello, World!!"})
});

app.use("/users", userRoutes);

module.exports = app;