const mongoose = require("mongoose");

const connectdb = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://dk55049:Dilipkumar2538@cluster0.knkjx8f.mongodb.net/pro1`
    );
    console.log("Database connected successfully");
  } catch (e) {
    console.log("Mongo server Isuue", e);
  }
};
module.exports = connectdb;
