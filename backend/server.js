// Framework for Node.js
const express = require("express");
// To validate cors or certificate in HTTP request to a remote server
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

// Atlas URI from dotenv.
const uri = process.env.ATLAS_URI;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .catch(err => {
    console.log("unhandled promises", err);
  });

const connection = mongoose.connection;
connection
  .once("open", () => {
    console.log("Mongodb ATLAS database connection established successfully");
  })
  .catch(error => {
    console.log(`Found Some Erro ${error}`);
  });

// Including models;
const exercisesRouter = require("./Routes/exercises");
const usersRouter = require("./Routes/users");

app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
