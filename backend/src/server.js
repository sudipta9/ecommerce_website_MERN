const express = require(`express`);
const env = require("dotenv").config(); //configure the env variable
const app = express();
const mongoose = require("mongoose");

// importing all routes to the server
const authRoutes = require("./routes/auth");
const adminAuthRoutes = require("./routes/admin/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/products");
// creating the Database
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@e-commerce.nz3c6.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log(`[+] Database Connected`);
  });

app.use(express.json());
app.use("/api", authRoutes);
app.use("/api", adminAuthRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);

app.listen(process.env.PORT, () => {
  console.log(`[+] The server is running on ${process.env.PORT}`);
});
