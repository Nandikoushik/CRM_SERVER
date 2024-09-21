
const service = require("./service");

module.exports = {
  async authenticate(req, res, next) {
      const userDTO = req.body;
      try {
        var response = await service.authentication(userDTO);
        res.status(200).json(response);
      } catch (err) {
        next(err);
      }
  },
};
