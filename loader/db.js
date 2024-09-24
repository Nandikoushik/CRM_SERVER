require("dotenv").config();
const assert = require("assert");
const { MongoClient, ServerApiVersion } = require('mongodb');
const MONGODB_CLUSTER = "CRM";
const MONGODB_DB_NAME = "crmSolutions";
const MONGODB_USERNAME = "crmSolutions";
const MONGODB_PASSWORD = "GfXyZ3hdvD6ylFN2";
const username = encodeURIComponent(MONGODB_USERNAME).replace(/%20/g, '+');
const password = encodeURIComponent(MONGODB_PASSWORD).replace(/%20/g, '+');
const mongo_uri = `mongodb+srv://${username}:${password}@${MONGODB_CLUSTER}.awtbg.mongodb.net/?retryWrites=true&w=majority&appName=${MONGODB_CLUSTER}`;
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
      const connect = await client.connect();
      _db_conn = connect.db(MONGODB_DB_NAME)
      console.log('Db connection Done');
      await callback(null, _db_conn);
    } catch (error) {
      callback(error)
    }
  },
  getDb() {
    if (!_db_conn) assert.ok(_db_conn, "Database is not connected. Please called init first.");
    return _db_conn;
  }
}
