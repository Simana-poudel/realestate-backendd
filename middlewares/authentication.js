const jwt = require("jsonwebtoken");
const { customCreateSecretKey } = require("../utils/customCreateSecretKey");
const { SetErrorResponse } = require("../utils/responseSetter");
const User = require("../model/user.model");

exports.checkAuthValidation = async (req, res, next) => {
  try {
    if (!req.cookies?.access_token) {
      console.log({cookies: req.cookies});
      console.log({cookies: req.headers});
      throw new SetErrorResponse("Auth Token Not Found", 401);
    }
    const token = req.cookies?.access_token;
    if (token) {
      try {
        const decoding = jwt.decode(token);
        // console.log({ decoding, token });
        if (!decoding) throw new SetErrorResponse("Invalid token");

        let user = await User.findOne({ email: decoding.email });
        if (!user) {
          throw new SetErrorResponse(`User Not Found:`, 404);
        }

        req.user = user;
        const data = jwt.verify(token, customCreateSecretKey());
        res.locals.authData = data;
        res.locals.authData.success = true;
      } catch (err) {
        throw new SetErrorResponse(
          `Access Not Granted ! Please Login Again: ${err}`,
          401
        );
      }
    }
    next();
  } catch (err) {
    res.fail(err);
  }
};
