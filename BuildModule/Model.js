const { getDb } = require("../loader/db");
const { filterArray, objectify } = require("../helper/helper");

const Model = {};

Model.insert = function (tenantId, insertedData) {
    return new Promise(function (resolve, reject) {
        const db = getDb();
        const collection = 'module_' + tenantId.toString();
        db.collection(collection).insertOne(insertedData, (err) => {
            if (err) reject({ success: false, message: err.message });
            resolve({ success: true });
        });
    });
};

Model.update = function (id, tenantId, updatedData) {
    return new Promise(function (resolve, reject) {
        const db = getDb();
        const collection = 'module_' + tenantId.toString();
        const match = { _id: objectify(id) };
        db.collection(collection).findOneAndUpdate(match,
            { $set: updatedData },
            { returnOriginal: false },
            (err, result) => {
                if (err) reject({ success: false, message: err.message });
                resolve({ success: true, data: result.value });
            });
    });
};

Model.delete = function (id, tenantId) {
    return new Promise(function (resolve, reject) {
        const db = getDb();
        const match = { _id: objectify(id) };
        const collection = 'module_' + tenantId.toString();
        db.collection(collection).updateOne(match, { $set: { deleted: 1 } },
            (err) => {
                if (err) reject({ success: false, message: err.message });
                resolve({ success: true });
            });
    });
};

Model.list = function (returnFields, limit, page, id, moduleId, search = null, tenantId) {
    return new Promise(function (resolve, reject) {
        const db = getDb();
        const collection = 'module_' + tenantId.toString();
        let match = {};
        let selectedColumns = {};

        if (search && typeof search === 'string') {
            try {
                const searchObj = JSON.parse(search);
                Object.keys(searchObj).forEach(element => match[element] = searchObj[element]);
            } catch (error) {
                console.log(error);
            }
        }

        if (returnFields.length > 0)
            returnFields.split(",").forEach(ele => selectedColumns[ele.trim()] = 1);

        if (id) match["_id"] = objectify(id);
        if (moduleId) match["moduleId"] = objectify(moduleId);
        match["deleted"] = 0;

        const query = [
            { $match: match },
            { $sort: { _id: 1 } },
            { $skip: page },
            { $limit: limit + 1 },
        ];

        if (returnFields.length > 0) query.push({ $project: selectedColumns });
        db.collection(collection)
            .aggregate(query)
            .toArray((err, result) => {
                if (err) reject({ success: false, message: err.message });
                const response = { success: true, data: filterArray(result, limit), next: result?.length > limit };
                resolve(response);
            });
    });
};

module.exports = Model;