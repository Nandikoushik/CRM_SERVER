const ObjectID = require("mongodb").ObjectID;
const moment = require("moment");
const AWS = require('aws-sdk');
const CryptoJS = require("crypto-js")
const config = require('../config/config');
const lockedEntities = {};
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

exports.cleanup = function (data) {
  let newObj = {};
  Object.keys(data).map((items) => {
    newObj[items] = data[items].trim();
  });
  return newObj;
};

exports.objectify = function (data) {
  try {
    if (Array.isArray(data)) {
      let arr = [];
      Object.keys(data).map((items) => {
        !!data[items] && arr.push(ObjectID(data[items]));
      });
      return arr;
    } else {
      if (!!data && [12, 24].includes(data.toString().length)) {
        return ObjectID(data);
      }
      return '';
    }
  } catch (error) {
    return '';
  }

};

exports.isExist = function (arr, searchItem) {
  let res = false;
  arr.every(el => {
    if (Object.is(el.toString(), searchItem.toString())) {
      res = true;
      return false;
    }
    else {
      res = false;
      return true;
    }
  });
  return res;
};

function getNetDateTime(baseDateStr) {
  try {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(baseDateStr)) {
      return baseDateStr;
    }
    const now = new Date();
    const [year, month, day] = baseDateStr.split("-");

    const netDateTime = new Date(year, month - 1, day, now.getHours(), now.getMinutes(), now.getSeconds());
    const formattedTime = netDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    return `${baseDateStr} ${formattedTime}`;
  } catch (error) {
    return baseDateStr;
  }

}

exports.filterArray = function (array, limit = config.dbReadRecLimit) {
  return array ? array.slice(0, limit) : [];
};

exports.isodate = function (data) {
  return new Date(moment(new Date(getNetDateTime(data))));
};

exports.formatedDateTime = function (dataTime) {
  //const dt = new Date(moment(dataTime).subtract(18000000)); //If Server In cst timezone 
  const dt = new Date(moment(dataTime)); //If Server In cst timezone 
  return dt;
};

exports.datetostringbeautify = function (data, format = "MM/DD/YYYY") {
  const sdt = new Date(data);
  year = sdt.getFullYear();
  month = sdt.getMonth() + 1;
  dt = sdt.getDate();

  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }
  var ret = "";
  if (format == "YYYY/MM/DD") ret = year + "/" + month + "/" + dt;
  else if (format == "MM/DD/YYYY") ret = month + "/" + dt + "/" + year;
  else if (format == "MM/DD/YYYY") {
    ret = month + "/" + dt + "/" + (year.toString().length == 4 ? parseInt(year.toString().substring(2)) : year)
  }
  else ret = month + "/" + dt + "/" + year;
  return ret;
};

exports.datetostring = function (data) {
  const sdt = new Date(data);
  year = sdt.getFullYear();
  month = sdt.getMonth() + 1;
  dt = sdt.getDate();
  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }

  const ret = year + "-" + month + "-" + dt;
  return ret;
};

exports.formattedDatestring = function (data) {
  const sdt = new Date(data);
  year = (sdt.getFullYear().toString().substring(2, 4));
  month = sdt.getMonth() + 1;
  dt = sdt.getDate();
  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }
  const ret = month + "/" + dt + "/" + year;
  return ret;
};

// generating random 6/4 digit number
exports.random = function (unit) {
  let num = "";
  if (Object.is(unit, 6)) num = Math.floor(100000 + Math.random() * 900000);
  else if (Object.is(unit, 4)) num = Math.floor(1000 + Math.random() * 9000);

  return num;
};

exports.randomNum = function (max, min) {
  const num = Math.random() * (max - min + 1) + min;
  return Math.ceil(num);
};

/*
| S3 BUCKET UPLOAD METHOD
| @ Params {
|           bucketName:  bucket_name, 
|           fileName:     new_file_name, 
|           file:         upload_file,
|  @option  filePermission: 'public-read'
|          }
*/
exports.s3uploader = function (data) {
  return new Promise(async (resolve, reject) => {
    // Read content from the file

    const fileContent = Buffer.from(data.file.data, 'binary');

    // Setting up S3 upload parameters
    const params = {
      Bucket: data.bucketName,
      Key: data.fileName, // File name you want to save as in S3
      Body: fileContent
    };
    if (data.filePermission == 'public') {
      params.ACL = 'public-read'
    }

    // Uploading files to the bucket
    s3.upload(params, function (err, data) {
      if (err) {
        reject(err);
      }
      console.log(`S3 File uploaded successfully. ${data.Location}`);
      resolve(data.Location)
    });
  })
};


exports.dateRange = function (originalDate = null) {
  let dateRangeObject = {}
  const date = originalDate ? originalDate : new Date()
  dateRangeObject.originalDate = date

  // For Month
  dateRangeObject.firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
  dateRangeObject.lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);

  // For Week
  let firstDateOfWeek = new Date(new Date(date).setDate(date.getDate() - date.getDay() + 1))
  // dateRangeObject.firstDayOfWeek = new Date( firstDateOfWeek.getFullYear(), firstDateOfWeek.getMonth(), 01, 00, 00, 00, 00  );
  dateRangeObject.firstDayOfWeek = new Date(firstDateOfWeek.setHours(24, 0, 0))
  let lastDateOfWeek = new Date(new Date(date).setDate(date.getDate() - date.getDay() + 7))
  // dateRangeObject.lastDayOfWeek = new Date( lastDateOfWeek.getFullYear(), lastDateOfWeek.getMonth(), 01, 23, 59, 59, 999 );
  dateRangeObject.lastDayOfWeek = new Date(lastDateOfWeek.setHours(23, 59, 59))
  // console.log('@@test week', dateRangeObject.firstDayOfWeek, dateRangeObject.lastDayOfWeek)

  // For Year
  dateRangeObject.firstDayOfYear = new Date(date.getFullYear() - 1, 0, 2);
  dateRangeObject.lastDayOfYear = new Date(date.getFullYear() - 1, 11, 32, 23, 59, 59, 999);
  // console.log('@@dateRangeObject', dateRangeObject)
  return dateRangeObject;
}

exports.Encrypted = function (password) {
  try {
    return CryptoJS.AES.encrypt(password, config.secretKey).toString();
  } catch (error) {
    return;
  }
}

exports.Decrypted = function (Encryptedpassword) {
  try {
    return CryptoJS.AES.decrypt(Encryptedpassword, config.secretKey).toString(CryptoJS.enc.Utf8);
  } catch (error) {
    return;
  }
}

exports.defaultResult = {
  month: Array.from({ length: 12 }, (_, index) => ({
    month: index + 1,
    totalcount: 0,
    averageSpent: 0,
    accepted: 0,
    sent: 0,
  })),
  week: Array.from({
    length: moment(moment()).startOf("month").isoWeek() === moment(moment()).isoWeek()
      ? 4
      : 5
  }, (_, index) => ({
    week: parseInt(moment().startOf("month").isoWeek()) + index,
    totalcount: 0,
    averageSpent: 0,
    accepted: 0,
    sent: 0
  })),
  day: Array.from({ length: 7 }, (_, index) => ({
    day: moment().startOf("week").add(index, 'days').format('DD'),
    totalcount: 0,
    averageSpent: 0,
    accepted: 0,
    sent: 0
  })),
  hour: Array.from({ length: 24 }, (_, index) => ({
    hour: index,
    totalcount: 0,
    averageSpent: 0,
    accepted: 0,
    sent: 0
  })),
}

const isEntityLocked = (entity) => lockedEntities[entity] === true; // Check Entity is already locked or Not
const acquireEntityLock = (entity) => lockedEntities[entity] = true;; // Acquire the lock for the entity
const releaseEntityLock = (entity) => delete lockedEntities[entity];  // Release the lock Entity

exports.withoutOverlapping = async (req, res, next) => {
  try {
    const entity = JSON.stringify(req?.query || req?.body || req.files);
    const releaseAfter = config.apiReleaseTime;
    if (isEntityLocked(entity)) next({ message: 'Too Many Request', status: 429 });;
    acquireEntityLock(entity);
    setTimeout(() => releaseEntityLock(entity), releaseAfter * 1000);
    next(); // Return true to indicate that the lock was acquired successfully
  } catch (error) {
    next({ error: 'Too Many Request', status: 429 })
  }
}
