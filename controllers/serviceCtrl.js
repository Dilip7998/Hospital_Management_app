// const { urlencoded } = require("express");

const { uploadImage } = require("../config/cloudinary");
const serviceModel = require("../models/serviceModel");

const multer = require("multer");

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});
const uploads = multer({ storage: storage });

const createService = (req, res) => {
  //   console.log(req);

  //   console.log(serviceName);
  uploads.single("serviceImage")(req, res, async (err) => {
    if (err) {
      res.status(500).send({
        success: false,
      });
    } else {
      const { serviceName, description } = req.body;
      // const serviceImage = req.file.filename;
      // console.log(serviceName);

      const imageurl = await uploadImage(req.file.path);
      // console.log(imageurl);
      const serviceImage = imageurl;

      try {
        const newService = new serviceModel({
          serviceName,
          description,
          serviceImage,
        });
        newService.save();
        res.status(200).send({
          success: true,
          message: "service created successfully",
          data: newService,
        });
      } catch (e) {
        res.status(500).send({
          success: false,
          message: "error while creating service",
          error: e,
        });
      }
    }
  });
};

const getservices = async (req, res) => {
  try {
    const services = await serviceModel.find();
    // console.log(services);
    res.status(200).send({
      success: true,
      message: "services list",
      data: services,
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      message: "Error while fetching services",
      error: e,
    });
  }
};
const removeservice = async (req, res) => {
  // console.log(req.body);
  try {
    const data = await serviceModel.findByIdAndDelete({ _id: req.body.id });
    res.status(200).send({
      success: true,
      message: "service removed",
      data: data,
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      message: "error in removing service",
      error: e,
    });
  }
};

module.exports = { createService, getservices, removeservice };
