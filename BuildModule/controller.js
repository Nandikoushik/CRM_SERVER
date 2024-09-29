const service = require("./service");
const { isodate, objectify } = require("../helper/helper")

module.exports = {
    async insert(req, res, next) {
        const { tenant } = req.query;
        const moduleDTO = req.body;
        try {
            moduleDTO.createdDate = isodate(moduleDTO.createdDate);
            moduleDTO.modifiedDate = isodate(moduleDTO.modifiedDate);
            moduleDTO.moduleId = objectify(moduleDTO.moduleId);
            moduleDTO.createdBy = objectify(moduleDTO.createdBy);
            moduleDTO.modifiedBy = objectify(moduleDTO.modifiedBy);
            const response = await service.insert(tenant, moduleDTO);
            res.status(200).json(response);
        } catch (err) {
            next(err);
        }
    },

    async update(req, res, next) {
        const { id, tenant } = req.query;
        const updateObject = req.body;
        try {
            const response = await service.update(id, tenant, updateObject);
            res.status(200).json(response);
        } catch (err) {
            next(err);
        }
    },

    async delete(req, res, next) {
        const { id, tenant } = req.query;
        try {
            const response = await service.delete(id, tenant);
            res.status(200).json(response);
        } catch (err) {
            next(err);
        }
    },

    async getlist(req, res, next) {
        const moduleDTO = req.query;
        try {
            const response = await service.list(moduleDTO);
            res.status(200).json(response);
        } catch (err) {
            next(err);
        }
    },
};
