module.exports = {
  jwtTokenExpireTime: "1d", // Expiretime one Day after creation
  dbReadRecLimit: 10, //no. of records to read from DB
  dbReadLimit: 10, //no. of records to read from DB
  twillowFromNumber: "+14156973335",
  apiReleaseTime: 3, // In Seconds
  graceTime: 2592000000, // Time in millisecond
  secretKey: 'CRM2023',
  role: [
    { id: "5f0235f2cabbfdd2661a0d23", name: "superadmin" },
    { id: "5f023619cabbfdd2661a0d37", name: "admin" },
    { id: "5f102ac91b3eab9f90b81f8b", name: "manager" },
    { id: "5f023627cabbfdd2661a0d3c", name: "manager" },
  ],
  roleOptions: {
    "5f0235f2cabbfdd2661a0d23": "superadmin",
    "5f023619cabbfdd2661a0d37": "admin",
    "5f102ac91b3eab9f90b81f8b": "manager",
    "5f023627cabbfdd2661a0d3c": "manager",
  },
  /*
  twillowFromNumber: "+14156973335"   //  live
  twillowFromNumber: "+17792372552"   //  Henry given by suman(trial)
  twillowFromNumber: "+16106016652"   //  anne given by suman(trial)
  twillowFromNumber: "+17867323614"   //  srjita(trial)
  twillowFromNumber: "+18455477782",  //  sayantan(trial)*/
};
