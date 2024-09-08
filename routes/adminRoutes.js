const express = require("express");
const {
  getAllUsersController,
  getAllDoctorsController,
  changeAccountStateController,
  deleteUserCntrl,
  doctorRemoveController,
} = require("../controllers/adminCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
const { removeservice } = require("../controllers/serviceCtrl");

const router = express.Router();

//GET METHOD || USERS
router.get("/getAllUsers", authMiddleware, getAllUsersController);

//GET METHOD || DOCTORS
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);
router.post(
  "/changeAccountStatus",
  authMiddleware,
  changeAccountStateController
);

router.post("/remove-service", authMiddleware, removeservice);
router.post("/deleteUser", deleteUserCntrl);
router.post("/removedoctor", doctorRemoveController);

module.exports = router;
