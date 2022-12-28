const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://myusername:mypassword@cluster0.vsbo8.mongodb.net/?retryWrites=true&w=majority");

const db = mongoose.connection;

db.on("open", () => {
  console.log("Successfully connected to the database");
});
db.on("error", (err) => {
  console.log(`Database error: ${err}`);
});

module.exports = db;
