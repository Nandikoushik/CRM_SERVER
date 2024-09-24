const service = require("./service");

module.exports = {
  async addSchema(req, res, next) {
    const moduleDTO = req.body;
    try {
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
};
