const service = require("./service");
const { isodate, objectify } = require("../helper/helper")

module.exports = {
  async addSchema(req, res, next) {
    const moduleDTO = req.body;
    try {
      moduleDTO.createdDate = isodate(moduleDTO.createdDate)
      moduleDTO.modifiedDate = isodate(moduleDTO.modifiedDate);
      moduleDTO.createdBy = objectify(moduleDTO.createdBy);
      moduleDTO.modifiedBy = objectify(moduleDTO.modifiedBy);
      const response = await service.addSchema(moduleDTO);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },
  async getSchemalist(req, res, next) {
    const moduleDTO = req.query;
    try {
      const response = await service.list(moduleDTO);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },
  async deleteSchema(req, res, next) {
    const id = req.query.id;
    try {
      const response = await service.deleteSchema(id);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },
};
