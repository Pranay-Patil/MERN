const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://abhi_capstone:g3capstone@cluster0.jwbklkz.mongodb.net/?retryWrites=true&w=majority"
);

const db = mongoose.connection;

db.on("open", () => {
  console.log("Successfully connected to the database");
});
db.on("error", (err) => {
  console.log(`Database error: ${err}`);
});

module.exports = db;
