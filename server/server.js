const express = require("express");
const { connectMongoDb } = require("./connection");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//create a database connection
connectMongoDb("mongodb+srv://mmahim67:mahim42568@cluster0.hmv8t.mongodb.net/");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
