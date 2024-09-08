const usermodel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doctorModel = require("../models/doctorModel");
const appointmentModel = require("../models/appointmentModel");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");

const moment = require("moment");
const multer = require("multer");
const { uploadImage } = require("../config/cloudinary");
const stripe = require("stripe")(
  "sk_test_51OCOzNSIzGDexZEd8qcDMBg3EMxYukUxiwN6xEqnrAvqBtORmMTm7Za1nc6DLy5d9bz4Rjkf2uJPQ5CVfXCWLWLX00W9FmccI0"
);

const sendResetPasswordLink = async (name, email, token) => {
  // console.log(name, email, token);
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      // port: 587,
      auth: {
        user: "dilipkumar55049@gmail.com",
        pass: "pvmk mpfw nvln slvl",
      },
    });

    const mailOptions = {
      from: "no-reply@The Hope Teams",
      to: email,
      subject: "Reset Password Link",

      html:
        "<p>Hii " +
        name +
        ', Click here to <a href="https://hospital-app-nbpy.onrender.com/reset-password/' +
        token +
        '"> reset your password</a>',
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (e) {
    console.log("error", e);
    res
      .status(500)
      .send({ success: false, message: `Error Occured ${e.message}` });
  }
};

//link send to email for registration
const sendAuthLink = async (name, email, token) => {
  // console.log(name, email, token);
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      // port: 587,
      auth: {
        user: "dilipkumar55049@gmail.com",
        pass: "pvmk mpfw nvln slvl",
      },
    });

    const mailOptions = {
      from: "no-reply@The Hope Teams",
      to: email,
      subject: "Verification Link",

      html:
        "<p>Hii " +
        name +
        ', Click here to <a href="https://hospital-app-nbpy.onrender.com/verification/' +
        token +
        '"> verify your account</a>',
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (e) {
    console.log("error", e);
    res
      .status(500)
      .send({ success: false, message: `Error Occured ${e.message}` });
  }
};

const registercontroller = async (req, res) => {
  //   console.log("request", req.body.pass);
  try {
    const existingUser = await usermodel.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(200)
        .send({ success: false, message: "User Already Exits" });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    // console.log("inside try", req.body);
    const randstring = randomstring.generate();
    const newUser = new usermodel({ ...req.body, activationToken: randstring });
    await newUser.save();
    sendAuthLink(req.body.name, req.body.email, randstring);
    res.status(201).send({
      message: "Verification Link sent in your email",
      success: true,
      token: randstring,
    });
  } catch (e) {
    res
      .status(500)
      .send({ success: false, message: `Register Controller ${e.message}` });
  }
};

const verificationController = async (req, res) => {
  // console.log(req.body.token);
  try {
    const user = await usermodel.findOne({ activationToken: req.body.token });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "token expired or invalid token",
      });
    }
    const updatedUser = await usermodel.findByIdAndUpdate(
      user._id,
      { isActive: true, activationToken: "" },
      { new: true }
    );
    res.status(201).send({
      success: true,
      message: "User Verified Successfully",
      data: updatedUser,
    });
  } catch (e) {
    res
      .status(500)
      .send({ success: false, message: `Error Occured ${e.message}` });
  }
};

const AuthLink = async (req, res) => {
  // console.log(req.body);
  try {
    const user = await usermodel.findOne({ email: req.body.email });
    if (!user) {
      res.status(200).send({
        success: false,
        message: "user not found",
      });
    }
    const token = user.activationToken;
    const isActive = user.isActive;
    // console.log("isActive", isActive);
    if (isActive) {
      return res.status(200).send({
        success: true,
        message: "Account already verified",
      });
    }
    // console.log("token", token);
    res.status(200).send({
      success: true,
      message: "Verification Link Sent in your mail",
    });

    sendAuthLink(user.name, user.email, token);
  } catch (e) {
    res
      .status(500)
      .send({ success: false, message: `Error Occured ${e.message}` });
  }
};

const logincontroller = async (req, res) => {
  try {
    const user = await usermodel.findOne({ email: req.body.email });
    // console.log("user", user);
    if (!user) {
      return res
        .status(200)
        .send({ message: "user not found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "invalid email or password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    if (!user.isActive) {
      return res
        .status(200)
        .send({ message: "user not verified, please verify", success: false });
    }
    return res
      .status(200)
      .send({ message: "Login Success", success: true, token, id: user._id });
  } catch (e) {
    // console.log(e);
    res.status(500).send({ message: "error in login controller", e });
  }
};
const authctrl = async (req, res) => {
  try {
    const user = await usermodel.findById({ _id: req.body.user_id });
    // console.log(user);
    if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (e) {
    return res.status(500).send({ message: "auth error", success: false, e });
  }
};
//sending mail to admin for new doctor registration
const sendMailtoAdmin = async (name, email) => {
  // console.log(name, email, token);
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      // port: 587,
      auth: {
        user: "dilipkumar55049@gmail.com",
        pass: "pvmk mpfw nvln slvl",
      },
    });

    const mailOptions = {
      from: "no-reply@The Hope Teams",
      to: email,
      subject: "New Doctor Registration Request",

      html:
        "<p>Hii " +
        name +
        ', Click here to <a href="https://hospital-app-nbpy.onrender.com/admin/Doctors"> see the details </a>',
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (e) {
    console.log("error", e);
    res
      .status(500)
      .send({ success: false, message: `Error Occured ${e.message}` });
  }
};
const storage1 = multer.diskStorage({
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});
const upload_doctor = multer({ storage: storage1 });
const applyDoctorcontroller = async (req, res) => {
  upload_doctor.single("image")(req, res, async (err) => {
    if (err) {
      res.status(500).send({
        success: false,
        message: "Error While Uploading Image",
      });
    }
    const imageurl = await uploadImage(req.file.path);

    try {
      const doctor = await doctorModel.findOne({ email: req.body.email });
      if (doctor) {
        res.status(200).send({
          success: false,
          message: "Applied earlier please wait for approval",
        });
      } else {
        const newDoctor = await doctorModel({
          ...req.body,
          status: "pending",
          profileImage: imageurl,
        });

        await newDoctor.save();

        const adminUser = await usermodel.findOne({ isAdmin: true });
        const notification = adminUser.notification;
        notification.push({
          type: "apply-doctor-request",
          message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a Doctor`,
          data: {
            doctorId: newDoctor._id,
            name: newDoctor.firstName + " " + newDoctor.lastName,
            onclickPath: "/admin/doctors",
          },
        });
        const user = await usermodel.findByIdAndUpdate(adminUser._id, {
          notification,
        });
        // console.log("adminUser", adminUser.email);
        sendMailtoAdmin(adminUser.name, adminUser.email).then(() => {
          res.status(200).send({
            success: true,
            message: "Your request is sent for approvel",
          });
        });
      }
    } catch (e) {
      console.log(e);
      res.status(500).send({
        success: false,

        message: "Error while applying for Doctor",
      });
    }
  });
};
const getallnotificationcontroller = async (req, res) => {
  try {
    const user = await usermodel.findOne({ _id: req.body.userId });
    const seennotification = user.seennotification;
    const notification = user.notification;
    seennotification.push(...notification);
    user.notification = [];
    user.seennotification = notification;
    const updateuser = await user.save();
    res.status(200).send({
      success: true,
      message: "all notification marked as read",
      data: updateuser,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: "Error in notification",
      success: false,
      e,
    });
  }
};
const deleteAllNotificationController = async (req, res) => {
  try {
    const user = await usermodel.findOne({ _id: req.body.userId });
    user.seennotification = [];
    const updatedUser = await user.save();

    res.status(200).send({
      success: true,
      message: "Notifications Deleted successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "unable to delete all notifications",
      error,
    });
  }
};
const getAllDocotrsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({ status: "approved" });
    res.status(200).send({
      success: true,
      message: "Docots Lists Fetched Successfully",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Errro WHile Fetching Doctor",
    });
  }
};

const sendMailtoDoctor = async (name, email) => {
  // console.log(name, email, token);
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      // port: 587,
      auth: {
        user: "dilipkumar55049@gmail.com",
        pass: "pvmk mpfw nvln slvl",
      },
    });

    const mailOptions = {
      from: "no-reply@The Hope Teams",
      to: email,
      subject: "Appointment Request",

      html:
        "<p>Hii Sir you have an another appointment request  from user " +
        name +
        ',  <a href="https://hospital-app-nbpy.onrender.com/doctor-appointments"> Click here to see the details </a>',
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (e) {
    console.log("error", e);
    res
      .status(500)
      .send({ success: false, message: `Error Occured ${e.message}` });
  }
};
const bookeAppointmnetController = async (req, res) => {
  // console.log(req.body);
  try {
    // req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    // req.body.time = moment(req.body.time, "HH:mm").toISOString();
    req.body.status = "pending";

    const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
    // console.log(doctor);
    req.body.doctorName = doctor.firstName + " " + doctor.lastName;
    const newAppointment = new appointmentModel(req.body);
    await newAppointment.save();
    const user = await usermodel.findOne({ _id: req.body.userId });
    // console.log(user);
    user.notification.push({
      type: "New-appointment-request",
      message: `A new Appointment Request from ${req.body.name}`,
      onCLickPath: "/user/appointments",
    });
    await user.save();
    await sendMailtoDoctor(req.body.name, doctor.email);
    res.status(200).send({
      success: true,
      message: "Appointment Book succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Booking Appointment",
    });
  }
};
const bookingAvailabilityController = async (req, res) => {
  // console.log(req.body);
  try {
    // const date = moment(req.body.date, "DD-MM-YY").toISOString();
    // const fromTime = moment(req.body.time, "HH:mm")
    //   .subtract(1, "hours")
    //   .toISOString();
    // const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
    // console.log(date, fromTime, toTime);
    const { date, time } = req.body;
    const fromTime = moment(time, "HH:mm").subtract(1, "hours").toISOString();
    const toTime = moment(time, "HH:mm").add(1, "hours").toISOString();
    // console.log(date, fromTime, toTime);
    const doctorId = req.body.doctorId;
    const appointments = await appointmentModel.find({
      doctorId,
      date,
      time: {
        $gte: fromTime,
        $lte: toTime,
      },
    });
    if (appointments.length > 0) {
      return res.status(200).send({
        message: "Appointments not Availibale at this time",
        success: true,
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Appointments available",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Booking",
    });
  }
};
const userAppointmentsController = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({
      userId: req.body.user_id,
    });
    console.log(appointments);
    res.status(200).send({
      success: true,
      message: "Users Appointments Fetch SUccessfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In User Appointments",
    });
  }
};

const getUserbyId = async (req, res) => {
  // console.log(req.body);
  try {
    const user = await usermodel.findOne({ _id: req.body.user_id });
    res.status(200).send({
      success: true,
      message: "User Fetched Successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
    });
  }
};

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

    // res.status(200).send({
    //   success: true,
    //   message: "Profile Updated Successfully",
    // });
    try {
      // console.log(req.body);
      const user = await usermodel.findById({ _id: req.body.id });
      user.name = req.body.name;
      user.email = req.body.email;
      user.phone = req.body.phone;
      user.address = req.body.address;

      if (req.file) {
        user.profileImage = imageurl;
        // console.log("profileImage", req.file.filename);
      }
      await user.save();
      res.status(200).send({
        success: true,
        message: "Profile Updated Successfully",
      });
    } catch (e) {
      res.status(500).send({
        success: false,
        message: "Error In Update Profile",
      });
    }
  });
};

const deleteUser = async (req, res) => {
  try {
    const user = await usermodel.findByIdAndDelete({ _id: req.body.user_id });
    res.status(200).send({
      success: true,
      message: "User Deleted Successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error In Delete User",
      error,
    });
  }
};
const forgetPasswordController = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await usermodel.findOne({ email });
    if (user) {
      const randstring = randomstring.generate();
      const data = await usermodel.updateOne(
        { email: email },
        { $set: { forgetToken: randstring } }
      );
      sendResetPasswordLink(user.name, user.email, randstring).then(() => {
        res.status(200).send({
          success: true,
          message: "Reset Link sent in your email successfully",
        });
        // console.log(randstring);
        // console.log(user.email);
      });
    } else {
      res.status(200).send({
        success: true,
        message: "Email does not exits",
      });
    }
  } catch (e) {
    res.status(500).send({
      success: false,
      message: "Error While sending Email",
    });
  }
};
const resetPasswordController = async (req, res) => {
  const { token, password } = req.body;
  // console.log(token + password);
  try {
    const user = await usermodel.findOne({
      forgetToken: token,
    });
    // console.log(user);
    if (user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const updateduser = await usermodel.findByIdAndUpdate(
        user._id,
        {
          password: hashedPassword,
          forgetToken: "",
        },
        {
          new: true,
        }
      );

      res.status(200).send({
        success: true,
        message: "Password Reset Successfully",
        data: updateduser,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Link is expired",
      });
    }
  } catch (e) {
    res.status(500).send({
      success: false,
      message: "Error while resetting password",
    });
  }
};
const sendMailtotest = async (name, email, file, type, status) => {
  // console.log(name, email, token);
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      // port: 587,
      auth: {
        user: "dilipkumar55049@gmail.com",
        pass: "pvmk mpfw nvln slvl",
      },
    });

    const mailOptions = {
      from: "no-reply@The Hope Teams",
      to: email,
      subject: "Appointment Reciept",

      html:
        "<p>Hii " + name + " your appointment  has been " + status + " </p>",
      attachments: [
        {
          filename: type,
          path: file,
        },
      ],
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (e) {
    console.log("error", e);
    res
      .status(500)
      .send({ success: false, message: `Error Occured ${e.message}` });
  }
};

const uploadtest = multer({ storage: storage });
const bookingtest = async (req, res) => {
  // console.log(req.body);
  try {
    uploadtest.single("pdf")(req, res, async (err) => {
      // console.log(req.file);
      if (err) {
        res.status(500).send({
          success: false,
          message: "Error While Uploading Image",
        });
      } else {
        await sendMailtotest(
          req.body.name,
          req.body.email,
          req.file.path,
          "appointmentdetails.pdf",
          req.body.status
        );
        // console.log(req.file);
        // console.log(req.body);
        res.status(200).send({
          success: true,
          message: "File Uploaded Successfully",
        });
      }
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      message: `Error Occured ${e.message}`,
    });
  }
};

// const paymentIntegration = async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     line_items: [
//       {
//         price_data: {
//           currency: "inr",
//           product_data: {
//             name: req.body.user, // Replace with your product name
//           },
//           unit_amount: req.body.fee * 100, // Assuming fee is the unit amount in cents
//         },
//         quantity: 1, // Specify the quantity of the product
//       },
//     ],
//     mode: "payment",
//     success_url: "http://localhost:3000/appointments",
//     cancel_url: "http://localhost:3000/cancel",
//   });
//   res.json({ id: session.id });
// };

const paymentIntegration = async (req, res) => {
  // console.log(req.body);
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: req.body.user, // Replace with your product name
            },
            unit_amount: req.body.fee * 100, // Assuming fee is the unit amount in cents
          },
          quantity: 1, // Specify the quantity of the product
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/appointments",
      cancel_url: "http://localhost:3000/cancel",
      customer_email: req.body.email, // Use this for sending the customer email to Stripe
      billing_address_collection: "required", // Ensure billing address is collected
      shipping_address_collection: {
        allowed_countries: ["IN"], // Limit to India
      },
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  logincontroller,
  registercontroller,
  authctrl,
  applyDoctorcontroller,
  getallnotificationcontroller,
  deleteAllNotificationController,
  getAllDocotrsController,
  bookeAppointmnetController,
  bookingAvailabilityController,
  userAppointmentsController,
  getUserbyId,
  updateProfileController,
  deleteUser,
  forgetPasswordController,
  resetPasswordController,
  verificationController,
  AuthLink,
  bookingtest,
  paymentIntegration,
};
