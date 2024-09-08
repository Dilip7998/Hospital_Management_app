const doctorModel = require("../models/doctorModel");
const usermodel = require("../models/userModel");
const userModel = require("../models/userModel");

const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "users data list",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "erorr while fetching users",
      error,
    });
  }
};

const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    res.status(200).send({
      success: true,
      message: "Doctors Data list",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting doctors data",
      error,
    });
  }
};
const changeAccountStateController = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
    const user = await userModel.findOne({ _id: doctor.userId });
    const notification = user.notification;
    notification.push({
      type: "doctor-account-request-updated",
      message: `Your Doctor Account Request Has ${status} `,
      onClickPath: "/notification",
    });
    user.isDoctor = status === "approved" ? true : false;
    await user.save();
    res.status(201).send({
      success: true,
      message: "Account Status Updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror in Account Status",
      error,
    });
  }
};

const deleteUserCntrl = async (req, res) => {
  // console.log("request", req.body._id);
  try {
    const user = await usermodel.findByIdAndDelete(req.body._id);
    res.status(200).send({
      success: true,
      message: "User Deleted Successfully",
      data: user,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Delete User",
      error,
    });
  }
};
const doctorRemoveController = async (req, res) => {
  // console.log(req.body);
  try {
    const doctor = await doctorModel.findByIdAndDelete(req.body._id);
    const user = await userModel.findByIdAndUpdate(doctor.userId, {
      isDoctor: false,
    });
    console.log(user.email);
    res.status(200).send({
      success: true,
      message: "Doctor Removed Successfully",
      data: doctor,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: "Error while removing doctor",
    });
  }
};

module.exports = {
  getAllDoctorsController,
  getAllUsersController,
  changeAccountStateController,
  deleteUserCntrl,
  doctorRemoveController,
};
