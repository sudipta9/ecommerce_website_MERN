const express = require(`express`);
const env = require("dotenv").config(); //configure the env variable
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

// importing all routes to the server
const authRoutes = require("./routes/auth");
const adminAuthRoutes = require("./routes/admin/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");
const initialDataRoutes = require("./routes/admin/initialData");
// creating the Database
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@e-commerce.nz3c6.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      // useFindAndModify: false,
    }
  )
  .then(() => {
    console.log(`[+] Database Connected`);
  });

app.use(cors());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api", authRoutes);
app.use("/api", adminAuthRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", initialDataRoutes);

app.listen(process.env.PORT, () => {
  console.log(`[+] The server is running on ${process.env.PORT}`);
});
