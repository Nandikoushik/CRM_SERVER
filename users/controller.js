
const service = require("./service");
const { cleanup, isodate, objectify, Encrypted } = require("../helper/helper");
const config = require("../config/config");
const ObjectID = require("mongodb").ObjectID;

module.exports = {
  async addUser(req, res) {
    const currentDate = new Date();
    const userCredDTO = JSON.parse(req.body.userCred);

    userCredDTO.isPhoneVerified = true;
    userCredDTO.isEmailVerified = true;
    userCredDTO.role = objectify(userCredDTO.role);
    userCredDTO.tenant = objectify(ObjectID().toString());
    userCredDTO.birthDate = isodate(userCredDTO.birthDate);
    userCredDTO.createdDate = userCredDTO.modifiedDate = isodate(currentDate);
    userCredDTO.createdBy = objectify(userCredDTO.createdBy);
    userCredDTO.modifiedBy = objectify(userCredDTO.modifiedBy);
    userCredDTO.password = Encrypted(userCredDTO.password);
    userCredDTO.activeTill = new Date().getTime() + config.graceTime;

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
