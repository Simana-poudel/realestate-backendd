const { getCacheOTP } = require("../cache/OTP");
const { SetErrorResponse } = require("./responseSetter");

exports.generateOTP = () => {
  try {
    let OTP = "";
    for (let i = 0; i < 4; i++) {
      OTP += Math.floor(Math.random() * 10);
    }
    console.log(OTP);
    return OTP;
  } catch (error) {
    throw new SetErrorResponse("Error while generating OTP", error);
  }
};

exports.verifyOtp = async ({ prefix, email }) => {
  try {
    const cacheValues = getCacheOTP({ prefix, email });
    if (!cacheValues) return null;
    return cacheValues;
  } catch (error) {
    throw new SetErrorResponse("Error while verifying OTP", error);
  }
};
