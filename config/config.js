module.exports = {
  jwtTokenExpireTime: "1d", // Expiretime one Day after creation
  dbReadRecLimit: 10, //no. of records to read from DB
  dbReadLimit: 10, //no. of records to read from DB
  twillowFromNumber: "+14156973335",
  apiReleaseTime: 3, // In Seconds
  graceTime: 2592000000, // Time in millisecond
  StripeWebhooksEvent: ['customer.subscription.updated', 'invoice.payment_succeeded', 'customer.subscription.deleted'], //Webhook Event List which will trigger
  planCancelType: ['52ab430df77c64bf8a51247f', 'e33759d7b1e4s648512f29e7'],
  defaultTranId: '660bde5c09a611acf6cc75de', // This Id Use For Referal share As default transaction 
  secretKey: 'clkclk2023',
  notificationType: [
    { id: "66683b516899414c0f7eefd6", name: "REWARD REDEMPTION - REQUEST" },
    { id: "66683b156899414c0f7eefd4", name: "eReview" },
    { id: "6668271a0d1c182b4407b862", name: "Gift" },
    { id: "66683b326899414c0f7eefd5", name: "eReply" }
  ],
  role: [
    { id: "5f0235f2cabbfdd2661a0d23", name: "superadmin" },
    { id: "5f023619cabbfdd2661a0d37", name: "admin" },
    { id: "5f102ac91b3eab9f90b81f8b", name: "manager" },
    { id: "5f023627cabbfdd2661a0d3c", name: "employee" },
  ],
  templateType: [
    "667937f3bad97ea0c2dab186", // eReview Notification Email Template type
    "66793b55bad97ec9c4dab18a", // eReply Email Template type
    "66793a9dbad97e1a73dab188", // eReceipt Email Template type
    "66793bf1bad97ecc92dab18b", // eRefer Email Template type
    "66793da1bad97eed14dab18f", // Specific Clique Join Email Template type
    "66793e50bad97e18a0dab191", // Birthday Voucher Email Template type
  ],
  qbo_operations: {
    "Customer": ['Create', 'Update'],
    "Item": ['Create', 'Update'],
    "Invoice": ['Create'],
    "Payment": ['Create'],
  }
  /*ch4_bean_module: 
  { clique: 'accounts', member: 'contacts', credits: "deals", products: "products", transactions: "invoices" }
  twillowFromNumber: "+14156973335"   //  live
  twillowFromNumber: "+17792372552"   //  Henry given by suman(trial)
  twillowFromNumber: "+16106016652"   //  anne given by suman(trial)
  twillowFromNumber: "+17867323614"   //  srjita(trial)
  twillowFromNumber: "+18455477782",  //  sayantan(trial)*/
};
