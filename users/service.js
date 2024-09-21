const UserM = require("./model");
const keys = require("../config/config");
const isEmpty = require("is-empty");
const lang = require("./language.english");
const jwt = require("jsonwebtoken");
const errHandeler = require("../helper/errHandeler");

const service = {

  authentication(data) {
    try {
      const email = data.email;
      const password = data.password;

      return new Promise((resolve, reject) => {
        UserM.authenticate(email, password)
          .then((result) => {
            const parsedResult = JSON.parse(result);
            if (
              parsedResult?.data[0]?.isEmailVerified &&
              parsedResult?.data[0]?.isPhoneVerified
            ) {
              const payload = {
                id: parsedResult.data[0]._id,
                name: parsedResult.data[0].firstName,
                clique: parsedResult.data[0]._id,
                cliqueName: "crm",
                businessName: 'CRM_Tenant',
                role: parsedResult.data[0].role,
                publicRoleName: parsedResult.data[0].publicRoleName,
                status: parsedResult.data[0].status,
                tenantId: parsedResult.data[0].tenantId,
                emailSetting: parsedResult?.data[0]?.emailSetting || false,
                cid: "",
                sid: "",
                isUser: true,
              };

              jwt.sign(
                payload,
                process.env.SECRETKEY,
                {
                  expiresIn: keys.jwtTokenExpireTime, //31556926 // 1 year in seconds
                },
                (err, token) => {
                  resolve({
                    success: true,
                    token: "Bearer " + token,
                  });
                }
              );
            } else {
              if (parsedResult?.data[0]?.isPhoneVerified)
                reject({
                  success: false,
                  message: lang.inactiveEmail,
                  type: "email",
                  id: parsedResult?.data[0]?._id,
                });
              else if (parsedResult?.data[0]?.isEmailVerified)
                reject({
                  success: false,
                  message: lang.inactivePhone,
                  type: "phone",
                  id: parsedResult.data[0]._id,
                });
              else
                reject({
                  success: false,
                  message: lang.lockedAccount,
                  type: "both",
                  id: parsedResult?.data[0]?._id,
                });
            }
          })
          .catch((err) => {
            console.log(err);

            reject({ success: false, message: lang.invalidLogin });
          });
      });
    } catch (error) {
      errHandeler(error);
    }
  },
};
module.exports = service;
