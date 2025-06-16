const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");

connectDB();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/user"));
app.use("/api/products", require("./routes/product"));
app.use("/api/carts", require("./routes/cart"));
app.use("/api/orders", require("./routes/order"));
app.use("/api/checkout", require("./routes/stripe"));

mongoose.connection.once("open", () => {
  console.log("Connected to DB!");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

mongoose.connection.on("error", (error) => {
  console.log("Error in connection: ", error);
});
