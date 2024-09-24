const { getDb } = require("../loader/db");
const { filterArray } = require("../helper/helper");

const ModuleSchema = {};

ModuleSchema.insert = function (data) {
    return new Promise(function (resolve, reject) {
        const db = getDb();
        db.collection("moduleSchema").insertOne(data, function (err, result) {
            if (err) {
                let response = { success: false };
                reject(JSON.stringify(response));
            }
            let response = { success: true, data: result };
            resolve(JSON.stringify(response, null, 10));
        });
    });
};

ModuleSchema.list = function (returnFields, limit, page, id, search = null) {
    return new Promise(function (resolve, reject) {
        const db = getDb();
        let match = {};
        let selectedColumns = {};

        if (returnFields.length > 0)
            returnFields.split(",").forEach(ele => selectedColumns[ele.trim()] = 1);

        if (search && typeof search === 'object' && search.length > 0)
            Object.keys(search).forEach(element => match[element] = search[element]);

        if (id) match["_id"] = objectify(id);
        match["deleted"] = 0;

        const query = [
            { $match: match },
            { $sort: { _id: 1 } },
            { $skip: page },
            { $limit: limit + 1 },
        ];

        if (returnFields.length > 0) query.push({ $project: selectedColumns });
        db.collection("moduleSchema")
            .aggregate(query)
            .toArray(function (err, result) {
                if (err) console.log(err);
                const response = { success: true, data: filterArray(result, limit), next: result?.length > limit };
                resolve(JSON.stringify(response, null, 10));
            });
    });
};

module.exports = ModuleSchema;