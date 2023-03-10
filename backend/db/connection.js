const mongoose = require("mongoose");

const connection = mongoose
  .connect(process.env.MONGOOSE_URI)
  .then((db) => {
    console.log(`Database Connection Established: ${db.connection.host}`);
    return db;
  })
  .catch((err) => console.log(`Error Connecting to Database: ${err}`));

module.exports = connection;
