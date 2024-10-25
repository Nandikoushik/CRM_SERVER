const { getDb } = require("../loader/db");
const { filterArray, objectify } = require("../helper/helper");

const ModuleSchema = {};

ModuleSchema.insert = function (data) {
    return new Promise(function (resolve, reject) {
        const db = getDb();
        db.collection("moduleSchema").insertOne(data, (err) => {
            if (err) reject({ success: false, message: err.message });
            resolve({ success: true });
        });
    });
};

ModuleSchema.updateSchema = function (id, updatedData) {
    return new Promise(function (resolve, reject) {
        const db = getDb();
        const match = { _id: objectify(id) };
        db.collection("moduleSchema").findOneAndUpdate(
            match,
            { $set: updatedData },
            { returnNewDocument: true },
            (err, result) => {
                if (err) reject({ success: false, message: err.message });
                resolve({ success: true, data: result.value });
            }
        );
    });
};

ModuleSchema.delete = function (id) {
    return new Promise(function (resolve, reject) {
        const db = getDb();
        const match = { _id: objectify(id) };

        db.collection("moduleSchema").updateOne(match, { $set: { deleted: 1 } },
            (err) => {
                if (err) reject({ success: false, message: err.message });
                resolve({ success: true });
            });
    });
};

ModuleSchema.list = function (returnFields, limit, page, tenantId, id, search = null) {
    return new Promise(function (resolve, reject) {
        const db = getDb();
        let match = {};
        let selectedColumns = { createdDate: 1, modifiedDate: 1 };

        if (search && typeof search === 'string') {
            try {
                const searchObj = JSON.parse(search);
                Object.keys(searchObj).forEach(element => match[element] = searchObj[element]);
            } catch (error) {
                console.log(error);
            }
        }

        if (id) match["_id"] = objectify(id);
        if (tenantId) match['tenant'] = objectify(tenantId);

        const query = [
            { $match: match },
            { $sort: { _id: 1 } },
            { $skip: page },
            { $limit: limit + 1 },
        ];

        if (returnFields?.length > 0) {
            returnFields.split(",").forEach((ele) => (selectedColumns[ele.trim()] = 1));
            query.push({ $project: selectedColumns });
        }

        db.collection("moduleSchema")
            .aggregate(query)
            .toArray((err, result) => {
                if (err) reject({ success: false, message: err.message });
                const response = { success: true, data: filterArray(result, limit), next: result?.length > limit };
                resolve(response);
            });
    });
};

module.exports = ModuleSchema;