var SibApiV3Sdk = require("sib-api-v3-sdk");
const nodemailer = require("nodemailer");
const config = require("../config/env");

exports.emailInitialSetup = () => {
  var defaultClient = SibApiV3Sdk.ApiClient.instance;
  // Configure API key authorization: api-key
  var apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = config.getInstance().sendGridApikey;
};

var transporter = null;
exports.nodeMailerTransporterInitiater = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 587,
      secure: false, // Set to true if using a secure connection (e.g., port 465)
      auth: {
        user: config.getInstance().mailTrapAuthUser,
        pass:config.getInstance().mailTrapAuthPass,
      },
    });

    // console.log(config.getInstance().mailTrapAuthUser)
    // console.log(config.getInstance().mailTrapAuthPass)
    
  }
  return transporter;
};
