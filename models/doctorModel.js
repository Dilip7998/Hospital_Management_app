const mongoos = require("mongoose");
const doctorSchema = new mongoos.Schema(
  {
    userId: {
      type: String,
    },
    firstName: {
      type: String,
      required: [true, "first name is required"],
    },
    lastName: {
      type: String,
      required: [true, "last name is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone no is required "],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    specialization: {
      type: String,
      required: [true, "especialization is required"],
    },
    experience: {
      type: String,
      required: [true, "experience is required"],
    },
    fees: {
      type: Number,
      required: [true, "fees is required"],
    },
    status: {
      type: String,
      default: "pending",
    },
    timing: {
      type: Object,
      required: [true, "work timing is required"],
    },
    about: {
      type: String,
      required: [true, "about is required"],
    },
    profileImage: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const doctorModel = mongoos.model("doctors", doctorSchema);
module.exports = doctorModel;
