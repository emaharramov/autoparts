const express = require('express')
const app = express()
const mySqlPool = require('./config/db')
const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT || 8000
const bodyParser = require("body-parser");
const productRoute = require('./routes/product')
const userRoute = require("./routes/user");

// routes
app.use(bodyParser.json());
app.use("/api/v1/users", userRoute);
app.use('/api/v1/products', productRoute)

mySqlPool.query('SELECT 1')
.then(() => {
    console.log('DB connection successfull');

    app.listen(PORT, () => {
        console.log(`Server is running on port localhost:${PORT}`);
    })
})
.catch(error => console.log(error))


