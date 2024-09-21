require("dotenv").config();
const assert = require("assert");
const { MongoClient, ServerApiVersion } = require('mongodb');
const clusterName=process.env.MONGODB_CLUSTER
const username = encodeURIComponent(process.env.MONGODB_USERNAME).replace(/%20/g, '+');
const password = encodeURIComponent(process.env.MONGODB_PASSWORD).replace(/%20/g, '+');
const mongo_uri = `mongodb+srv://${username}:${password}@${clusterName}.awtbg.mongodb.net/?retryWrites=true&w=majority&appName=CRM`;
const client = new MongoClient(mongo_uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
let _db_conn;
module.exports = {
  async initDb(callback) {
    try {
      _db_conn = await client.connect();
      console.log('Db connection Done');
      await callback(null, _db_conn);
    } catch (error) {
      callback(error)
      console.log(error);
    }
  },
  getDb() {
    if(!_db_conn)assert.ok(_db_conn, "Database is not connected. Please called init first.");
    return _db_conn;
  }
}
