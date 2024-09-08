const express = require("express");
const {
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
} = require("../controllers/userCnt");
const authMiddleware = require("../middlewares/authMiddleware");
const { createService, getservices } = require("../controllers/serviceCtrl");
const router = express.Router();

//routes
router.post("/login", logincontroller);

router.post("/register", registercontroller);
router.post("/getUserData", authMiddleware, authctrl);
router.post("/apply-doctor", authMiddleware, applyDoctorcontroller);
router.post(
  "/get-all-notification",
  authMiddleware,
  getallnotificationcontroller
);
router.post(
  "/delete-all-notification",
  authMiddleware,
  deleteAllNotificationController
);
router.get("/getAllDoctors", getAllDocotrsController);
router.post("/book-appointment", authMiddleware, bookeAppointmnetController);
router.post(
  "/booking-availbility",
  authMiddleware,
  bookingAvailabilityController
);
router.get("/user-appointments", authMiddleware, userAppointmentsController);

router.post("/services", createService);
router.get("/get-services", getservices);
router.post("/getuserbyid", authMiddleware, getUserbyId);

router.post("/updateProfile", updateProfileController);
router.post("/deleteuser", authMiddleware, deleteUser);
router.post("/forget-password", forgetPasswordController);
router.post("/reset-password", resetPasswordController);
router.post("/verify-account", verificationController);
router.post("/auth-link", AuthLink);
router.post("/booking-test", bookingtest);
router.post("/payment", paymentIntegration);

module.exports = router;
