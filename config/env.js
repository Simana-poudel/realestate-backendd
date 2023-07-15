const dotEnv = require("dotenv");

dotEnv.config({
  path: "./config/.env",
});

function parseCSV(data) {
  if (!data) {
    return undefined;
  }
  return data.split(",");
}

class PrivateConfig {
  constructor() {
    // this.dummy = process.env.DUMMY; // it should print no var set for dummy
    this.port = process.env.PORT;
    this.allowedDomains = parseCSV(process.env.ALLOWED_DOMAINS);
    this.nodeEnv = process.env.NODE_ENV;
    this.mongoUrl = process.env.URL;
    this.mongoUrlOnline = process.env.MONGO_URL_ONLINE;
    this.sendGridApikey = process.env.BREVO_API_KEY;
    this.secretKey = process.env.SECRETKEY;
    this.senderMail = process.env.SENDER_MAIL;
    this.mailTrapAuthUser = process.env.MAILTRAP_AUTH_USER;
    this.mailTrapAuthPass = process.env.MAILTRAP_AUTH_PASS;
    ;
  }
}
let valArr = [];
class config {
  constructor() {
    throw new Error("Use config.getInstance()");
  }
  static getInstance() {
    if (!config.instance) {
      config.instance = new PrivateConfig();
    }
    this.warnUndefined();
    return config.instance;
  }
  static warnUndefined() {
    Object.entries(config.instance).forEach(([key, value]) => {
      if (valArr.indexOf(key) === -1) {
        valArr.push(key);
        if (!value) {
          console.log(`N0 ENV VARIABLE SET FOR == ${key}`);
        }
      }
    });
  }
}
module.exports= config;
