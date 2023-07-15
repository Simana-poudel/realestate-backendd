const mongoose = require("mongoose");

exports.connect = async () => {
  try {
    const db = await mongoose.connect(process.env.URL);
    if (db) {
      console.log(
        "Connected to database with host:" +
          `${db?.connection?.host} and name: ${db?.connection?.name}`
      );
    }
  } catch (err) {
    console.log(err);
  }
};