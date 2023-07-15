const {
  loginUser,
  logOutUser,
  verifyOTPAndSignupController,
  getUsersController,
  getUserController,
  registerUserController,
  deleteUser,
} = require("../../controller/user.controller");
const { checkAuthValidation } = require("../../middlewares/authentication");
const {
  checkDuplicateValue,
} = require("../../middlewares/checkForDuplicateValues");
const { checkForExistence } = require("../../middlewares/checkForExistence");
const { validate, getMethodValidate } = require("../../middlewares/validate");
const { validator } = require("../../middlewares/validator");
const User = require("../../model/user.model");

const router = require("express").Router();

router.get(
  "/",
  checkAuthValidation,
  getMethodValidate(),
  validator,
  getUsersController
);

router.get(
  "/:userId",
  checkAuthValidation,
  validate(["userId"]),
  validator,
  getUserController
);

router.post(
  "/auth/register",
  validate(["email", "password", "contact", "name"]),
  validator,
  checkDuplicateValue(User, [{ key: "email", value: "body.email" }]),
  registerUserController
);

router.post(
  "/auth/verify-signup",
  validate(["email", "OTP"]),
  validator,
  checkDuplicateValue(User, [{ key: "email", value: "body.email" }]),
  verifyOTPAndSignupController
);

router.post(
  "/auth/login",
  validate(["email", "password"]),
  validator,
  checkForExistence(User, [{ key: "email", value: "body.email" }], "existUser"),
  loginUser
);

router.post("/auth/logout", checkAuthValidation, logOutUser);

router.post("/auth/logout", checkAuthValidation, logOutUser);

router.delete(
  "/:userId",
  validate(["userId"]),
  validator,
  checkAuthValidation,
  deleteUser
);


module.exports = router;
