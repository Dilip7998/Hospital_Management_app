const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: [true, "name is require"],
  },
  description: {
    type: String,
  },
  serviceImage: {
    type: String,
  },
});
const serviceModel = mongoose.model("service", serviceSchema);
module.exports = serviceModel;
