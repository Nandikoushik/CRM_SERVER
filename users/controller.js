
const service = require("./service");
const { cleanup, isodate, objectify } = require("../helper/helper");
const config = require("../config/config");

module.exports = {
  async addUser(req, res) {
    const currentDate = new Date();
    const userCredDTO = JSON.parse(req.body.userCred);

    const ctd = isodate(currentDate);
    userCredDTO.createdDate = ctd;

    const mtd = isodate(currentDate);
    userCredDTO.modifiedDate = mtd;

    const objectCid = objectify(userCredDTO.createdBy);
    userCredDTO.createdBy = objectCid;

    const objectMid = objectify(userCredDTO.modifiedBy);
    userCredDTO.modifiedBy = objectMid;

    userCredDTO.activeTill = new Date().getTime() + config.graceTime,
      userCredDTO.isPhoneVerified = true;
    userCredDTO.isEmailVerified = true;

    try {
      const response = await service.addUser(userCredDTO);
      res.status(201).json(response);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  async authenticate(req, res, next) {
    const userDTO = req.body;
    try {
      var response = await service.authentication(userDTO);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },
  async checkUsers(req, res) {
    try {
      const userDTO = cleanup(req.query);
      const response = await service.checkUsers(userDTO);
      res.status(200).json(response);
    } catch (err) {
      res.status(400).json(err);
    }
  },
};
