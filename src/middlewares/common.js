const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const authentication = async function (req, res, next) {
  try {
    let token = req.headers["my-api-key"];
    if (!token) {
      return res
        .status(400)
        .send({ status: false, message: "Please pass token" });
    }

    //decode token
    try {
      const decodedToken = jwt.verify(token, "backend", {
        ignoreExpiration: true,
      });
      console.log(decodedToken.exp * 1000);
      console.log(Date.now());

      if (Date.now() > decodedToken.exp * 1000) {
        return res
          .status(401)
          .send({ status: false, message: "session expired" });
      }

      req.decodedToken = decodedToken;
    } catch (error) {
      return res
        .status(401)
        .send({ status: false, message: "Authentication failed" });
    }
    console.log("authentication successful");
    next();
    // });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
module.exports = { authentication};