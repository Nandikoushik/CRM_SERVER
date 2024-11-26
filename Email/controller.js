
const service = require("./service");

module.exports = {
    async sendMail(req, res) {
        try {
            const body = req.body;
            const response = await service.sendMail(body);
            res.status(201).json(response);
        } catch (err) {
            next(err);
        }
    },
};
