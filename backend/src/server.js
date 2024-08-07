const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const cookieParser = require("cookie-parser");

connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json()); // to parse the incoming requests with JSON payloads
app.use(cookieParser());
app.use(cors(
  {
    origin: ["http://localhost:5050", "http://127.0.0.1:5050"],
    credentials: true,
  }
));
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
