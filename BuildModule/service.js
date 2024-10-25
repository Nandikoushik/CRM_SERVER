const model = require("./Model");
const config = require('../config/config')

const service = {

    insert(tenantId, moduleDto) {
        return new Promise(async (resolve, reject) => {
            model.insert(tenantId, moduleDto)
                .then((result) => resolve(result))
                .catch((err) => reject(err));
        });
    },

    update(id, tenantId, updateData) {
        return new Promise(async (resolve, reject) => {
            model.update(id, tenantId, updateData,)
                .then((result) => resolve(result))
                .catch((err) => reject(err));
        });
    },

    delete(id, tenantId) {
        return new Promise(async (resolve, reject) => {
            model.delete(id, tenantId)
                .then((result) => resolve(result))
                .catch((err) => reject(err));
        });
    },

    list(moduleDto) {
        let returnFields = "";
        const id = moduleDto?.id;
        const tenantId = moduleDto.tenant;
        const moduleId = moduleDto.moduleId;
        const search = moduleDto?.search;
        let page = parseInt(moduleDto?.page);
        let limit = parseInt(moduleDto?.limit);
        if (!page) page = 0;
        if (!limit || limit > config.dbReadRecLimit) limit = config.dbReadRecLimit;
        if (typeof moduleDto.returnFields != "undefined") returnFields = moduleDto.returnFields;

        return new Promise((resolve, reject) => {
            model.list(returnFields, limit, page, id, moduleId, tenantId, search)
                .then((result) => resolve(result))
                .catch((err) => reject(err));
        });
    },
};
module.exports = service;
