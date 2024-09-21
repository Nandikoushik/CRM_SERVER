const Role = {};

Role.getGrants = function (db, id) {
  return new Promise(function (resolve, reject) {
    db.collection("aclroles")
      .find({ _id: id })
      .toArray(function (err, result) {
        if (err) {
          let response = {};
          reject(JSON.stringify(response));
        }

        let returnId = id;
        returnId = id + "," + result[0].grant.join();

        let response = { data: returnId };
        resolve(JSON.stringify(response));
      });
  });
};

module.exports = Role;
