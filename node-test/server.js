const mongoDb = require("./dbConnection/mongoDb")
mongoDb();

const app = require("./app"); // Import the Express app from app.js
const port = 3003; // Set your desired port number

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}
);