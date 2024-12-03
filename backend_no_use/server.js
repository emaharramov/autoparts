const express = require("express");
const app = express();
const mySqlPool = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const PORT = process.env.PORT || 8000;
const bodyParser = require("body-parser");
const productRoute = require("./routes/product");
const userRoute = require("./routes/user");
const orderRoutes = require("./routes/orderRoutes");

app.use(cors());

app.use(bodyParser.json());

// Routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/orders", orderRoutes);

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
