//@desc User Model
const { objectify, filterArray } = require("../helper/helper");
const { initDb, getDb } = require("../loader/db");
const { Encrypted, Decrypted } = require("../helper/helper")

const User = {};

User.authenticate = function (phone, password) {
  return new Promise(async function (resolve, reject) {
    const db = await getDb();
    const query = [{ $match: { deleted: 0 } }];

   // db.collection("users").insertOne({name:"koushik"})

    db.collection("users")
      .aggregate(query)
      .toArray(function (err, result) {
        if (err) return reject(JSON.stringify({ success: false }));
        result.length && result.find((el, index) => {
          if (password === Decrypted(el.password)) {
            let res = { data: [result[index]] };
            return resolve(JSON.stringify(res));
          }
        })
        ;
      });
  });
};

//@desc get mmember details by phone/name
User.getUserByphNo = function (searchFor) {
  return new Promise(function (resolve, reject) {
    const db = getDb();

    const query = {
      $or: [{ firstName: new RegExp('^' + searchFor.replace(/([.*+?^${}()|[\]\\])/g, '\\$1'), 'i') }, { phone: searchFor }]
    };

    db.collection("users")
      .find(query)
      .toArray(function (err, result) {
        if (err) {
          let response = { success: false };
          reject(JSON.stringify(response));
        }

        let response = result;
        resolve(JSON.stringify(response, null, 10));
      });
  });
};
//@desc fetch user detail using _id
User.findById = function (id, clq = null) {
  return new Promise(function (resolve, reject) {
    const db = getDb();

    let match = {};

    if (id) {
      match['_id'] = { $eq: objectify(id) }
    }

    const query = [
      { $match: match },
      {
        $lookup: {
          from: "cliques",
          localField: "clique",
          foreignField: "_id",
          as: "clique",
        },
      },
      {
        $lookup: {
          from: "aclroles",
          localField: "role",
          foreignField: "_id",
          as: "role",
        },
      },
    ];

    db.collection("users")
      .aggregate(query)
      .toArray(function (err, result) {
        if (err) {
          let response = { success: false };
          reject(JSON.stringify(response));
        }
        if (!!result && result[0]?.password) result[0].password = Decrypted(result[0].password);
        result[0].isUser = true;

        let response = { success: true, data: result };
        resolve(JSON.stringify(response));
      });
  });
};


module.exports = User;
