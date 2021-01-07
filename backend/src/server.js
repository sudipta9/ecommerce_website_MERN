const express = require(`express`);
const env = require("dotenv").config(); //configure the env variable
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// importing all routes to the server
const authRoutes = require("./routes/auth");

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

app.use(bodyParser());
app.use("/api", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`[+] The server is running on ${process.env.PORT}`);
});
