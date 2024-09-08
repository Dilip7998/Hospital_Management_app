const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  //   console.log(token);
  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) {
      console.log(err);
      return res.status(200).send({
        message: "Auth Failed",
        success: false,
      });
    } else {
      req.body.user_id = decode.id;
      next();
    }
  });
};
