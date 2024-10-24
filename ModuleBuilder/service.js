const model = require("./model");
const config = require('../config/config');
const { objectify } = require("../helper/helper");

const service = {

    addSchema(schemaData) {
        return new Promise(async (resolve, reject) => {
            model.insert(schemaData)
                .then((result) => resolve(result))
                .catch((err) => reject(err));
        });
    },
    deleteSchema(id) {
        return new Promise(async (resolve, reject) => {
            model.delete(id)
                .then((result) => resolve(result))
                .catch((err) => reject(err));
        });
    },
    list(data) {
        let returnFields = "";
        let limit = parseInt(data.limit);
        let page = parseInt(data.page);
        const search = data?.search;
        const id = data?.moduleId;
        const tenantId = data?.tenant;
        if (!limit || limit > config.dbReadRecLimit) limit = config.dbReadRecLimit;
        if (!page) page = 0;
        if (typeof data.returnFields != "undefined")
            returnFields = data.returnFields;

        return new Promise((resolve, reject) => {
            model.list(returnFields, limit, page, tenantId, id, search)
                .then((result) => resolve(result))
                .catch((err) => reject(err));
        });
    },
};
module.exports = service;
