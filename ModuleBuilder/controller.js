const service = require("./service");
const { isodate, objectify } = require("../helper/helper")

module.exports = {
  async addSchema(req, res, next) {
    const moduleSchemaDTO = req.body;
    try {
      moduleSchemaDTO.tenant = objectify(moduleSchemaDTO.tenant);
      moduleSchemaDTO.createdBy = objectify(moduleSchemaDTO.createdBy);
      moduleSchemaDTO.modifiedBy = objectify(moduleSchemaDTO.modifiedBy);
      moduleSchemaDTO.createdDate = isodate(moduleSchemaDTO.createdDate)
      moduleSchemaDTO.modifiedDate = isodate(moduleSchemaDTO.modifiedDate);
      const response = await service.addSchema(moduleSchemaDTO);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },
  async getSchemalist(req, res, next) {
    const moduleSchemaQuery = req.query;
    try {
      const response = await service.list(moduleSchemaQuery);
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
