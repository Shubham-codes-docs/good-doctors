const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const personRoutes = require("./routes/person");

mongoose.set("strictQuery", true);

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.use("/api", personRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, (err) => {
  if (err) console.log(err);
  else {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
});
