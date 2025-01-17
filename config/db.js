const mongoose = require("mongoose");

const MongoDbConnection = (url) => {
  mongoose
    .connect(url)
    .then(() => {
      console.log("Database Connected..");
    })
    .catch((err) => {
      console.log(err, "Error..");
    });
};

module.exports = { MongoDbConnection };
