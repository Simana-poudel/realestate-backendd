// const { query } = require("express");
const { validationResult } = require("express-validator");
const { SetErrorResponse } = require("../utils/responseSetter");


exports.validator = (req, res, next) => {
  try {
    let validationResultIs = validationResult(req);
    console.log(validationResultIs.array({}));

    if (!validationResultIs.isEmpty()) {
      const finalError =
        validationResultIs.array({ onlyFirstError: true })[0].path +
        " :" +
        validationResultIs.array({ onlyFirstError: true })[0].msg;
      throw new SetErrorResponse(
         finalError,
         400,
      );
    }
    next();
  } catch (error) {
    res.fail(error);
  }
};
