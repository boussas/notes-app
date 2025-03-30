const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const authenticate = require("./authenticate");
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};
const app = express();
const noteRoutes = require("./routes/notesRoutes");
const userRoutes = require("./routes/userRoutes");
app.use(express.json());
app.use("/api/users", userRoutes);
app.use(authenticate);
app.use("/api/notes", noteRoutes);

mongoose.connect(process.env.URI, clientOptions).then(() => {
  app.listen(process.env.PORT, () => {
    console.log("connected to DB and running on port:", process.env.PORT);
  });
});
