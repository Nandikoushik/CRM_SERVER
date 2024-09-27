const model = require("./model");
const config = require('../config/config')

const service = {

    addSchema(schemaData) {
        return new Promise(async (resolve, reject) => {
            model.insert(schemaData)
                .then((result) => {
                    const parsedResult = JSON.parse(result);
                    resolve({ success: parsedResult.success, });
                })
                .catch(() => {
                    reject({ success: false, message: "Invalid request" });
                });
        });
    },
    deleteSchema(id) {
        return new Promise(async (resolve, reject) => {
            model.delete(id)
                .then((result) => {
                    const parsedResult = JSON.parse(result);
                    resolve({ success: parsedResult.success, });
                })
                .catch(() => {
                    reject({ success: false, message: "Invalid request" });
                });
        });
    },
    list(data) {
        let returnFields = "";
        let limit = parseInt(data.limit);
        let page = parseInt(data.page);
        const search = data?.search;
        const id = data?.id;
        if (!limit || limit > config.dbReadRecLimit) limit = config.dbReadRecLimit;
        if (!page) page = 0;
        if (typeof data.returnFields != "undefined")
            returnFields = data.returnFields;

        return new Promise((resolve, reject) => {
            model.list(returnFields, limit, page, id, search)
                .then((result) => {
                    const parsedResult = JSON.parse(result);
                    resolve({ success: parsedResult.success, data: parsedResult.data, next: parsedResult.next });
                })
                .catch(() => {
                    reject({ success: false, message: "Invalid request" });
                });
        });
    },
};
module.exports = service;
