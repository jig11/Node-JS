//import .env variables 
require('dotenv').config();

//import & connect to mongodb
const mongooseDb = require('./dbConnectivity/db');
const app = require("./index"); // Import the Express app from app.js

mongooseDb();

const port = process.env.APP_PORT; // Set your desired port number
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});