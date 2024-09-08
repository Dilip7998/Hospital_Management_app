const { uploadImage } = require("../config/cloudinary");
const appointmentModel = require("../models/appointmentModel");
const doctorModel = require("../models/doctorModel");
const usermodel = require("../models/userModel");
const multer = require("multer");

const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "doctor data fetch success",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Fetching Doctor Details",
    });
  }
};

// update doc profile
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});
const uploads = multer({ storage: storage });
const updateProfileController = async (req, res) => {
  uploads.single("image")(req, res, async (err) => {
    // console.log(req.file);
    if (err) {
      res.status(500).send({
        success: false,
        message: "Error While Uploading Image",
      });
    }

    const imageurl = await uploadImage(req.file.path);
    // console.log(imageurl);
    // console.log(req.body);

    try {
      const doctor = await doctorModel.findOneAndUpdate(
        { userId: req.body.id },
        {
          ...req.body,
          profileImage: imageurl,
        }
      );
      res.status(201).send({
        success: true,
        message: "Doctor Profile Updated",
        data: doctor,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Doctor Profile Update issue",
        error,
      });
    }
    // try {
    //   // console.log(req.body);
    //   // const user = await usermodel.findById({ _id: req.body.id });
    //   user.name = req.body.name;
    //   user.email = req.body.email;
    //   user.phone = req.body.phone;
    //   user.address = req.body.address;

    //   if (req.file) {
    //     user.profileImage = imageurl;
    //     // console.log("profileImage", req.file.filename);
    //   }
    //   await user.save();
    //   res.status(200).send({
    //     success: true,
    //     message: "Profile Updated Successfully",
    //   });
    // } catch (e) {
    //   res.status(500).send({
    //     success: false,
    //     message: "Error In Update Profile",
    //   });
    // }
  });
};
// const updateProfileController = async (req, res) => {
//   upload_doctor.single("image")(req, res, async (err) => {
//     if (err) {
//       res.status(500).send({
//         success: false,
//         message: "Error While Uploading Image",
//       });
//     }
//   });
// console.log(req.file);
// const imageurl = await uploadImage(req.file.path);
// console.log(req.body);
// console.log(imageurl);
// res.status(200).send({
//   success: true,
//   message: "Profile Updated Successfully",
// });
// try {
//   const doctor = await doctorModel.findOneAndUpdate(
//     { userId: req.body.userId },
//     req.body
//   );
//   res.status(201).send({
//     success: true,
//     message: "Doctor Profile Updated",
//     data: doctor,
//   });
// } catch (error) {
//   console.log(error);
//   res.status(500).send({
//     success: false,
//     message: "Doctor Profile Update issue",
//     error,
//   });
// }
// };

//get single docotor
const getDoctorByIdController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
    res.status(200).send({
      success: true,
      message: "Single Doc Info Fetched",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Single doctor info",
    });
  }
};
const doctorAppointmentsController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.user_id });
    // console.log("doctor", doctor);
    const appointments = await appointmentModel.find({
      doctorId: doctor._id,
    });
    // console.log(appointments);
    res.status(200).send({
      success: true,
      message: "Doctor Appointments fetch Successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Doc Appointments",
    });
  }
};
const updateStatusController = async (req, res) => {
  try {
    const { appointmentsId, status } = req.body;
    const appointments = await appointmentModel.findByIdAndUpdate(
      appointmentsId,
      { status }
    );
    const user = await usermodel.findOne({ _id: appointments.userId });
    const notification = user.notification;
    notification.push({
      type: "status-updated",
      message: `your appointment has been updated ${status}`,
      onCLickPath: "/doctor-appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Status Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Update Status",
    });
  }
};

module.exports = {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
  doctorAppointmentsController,
  updateStatusController,
};
