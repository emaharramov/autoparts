const express = require("express");
const app = express();
const mySqlPool = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors"); // Import CORS
dotenv.config();

const PORT = process.env.PORT || 8000;
const bodyParser = require("body-parser");
const productRoute = require("./routes/product");
const userRoute = require("./routes/user");

// Enable CORS for all origins (or restrict to your frontend URL)
app.use(cors()); // Allow all origins for testing. You can restrict this later.

app.use(bodyParser.json());

// Routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/products", productRoute);

// Database Connection & Server Start
mySqlPool
  .query("SELECT 1")
  .then(() => {
    console.log("DB connection successful");

    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("DB connection failed:", error);
  });
