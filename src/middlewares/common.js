const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const userSchema = require("../model/userSchema")
const postSchema = require("../model/postModel")
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

//Authorization
const authorization = async function (req, res, next) {
  try {
    const decodedToken = req.decodedToken;

    let id = decodedToken.userId;

    const _id = req.params.userId;

    if (_id) {
      //id format validation
      if (_id) {
        if (mongoose.Types.ObjectId.isValid(_id) == false) {
          return res
            .status(400)
            .send({ status: false, message: "Invalid userId" });
        }
      }

      const user = await userSchema.findById({ _id });

     
      if (!user) {
        return res
          .status(404)
          .send({ status: false, message: "user not found" });
      }

      if (user._id != id) {
        console.log(user._id,"++++",id)
        return res
          .status(401)
          .send({ status: false, message: "Not authorised" });
      }

      console.log("authorization successful");

      next();
    }
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { authentication, authorization };
