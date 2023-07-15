const User = require("../model/user.model");
const { getPaginatedData } = require("../utils/pagination");
const { customCreateSecretKey } = require("../utils/customCreateSecretKey");
const { SetErrorResponse } = require("../utils/responseSetter");
const { tokenMaker } = require("../utils/tokenMaker");
const { generateOTP } = require("../utils/OTPUtils");
const { setCacheOTP, getCacheOTP } = require("../cache/OTP");
const { sendEmailToEmailAddress } = require("../utils/mail");
const config = require("../config/env");

exports.getUsersController = async (req, res) => {
  try {
    const { limit, page } = req.query;
    const data = await getPaginatedData(User, {
      pagination: true,
      query: {},
      lean: true,
      limit: limit,
      page: page,
      modFunction: (data) => {
        return data;
      },
    });
    res.success(data);
  } catch (e) {
    res.fail(e);
  }
};

exports.getUserController = async (req, res) => {
  try {
    const { userId } = req.params;
    const data = await User.findOne({ _id: userId });
    res.success(data);
  } catch (e) {
    res.fail(e);
  }
};

exports.registerUserController = async (req, res, next) => {
  try {
    const { name, contact, password, email, address } = req.body;

    const otp = generateOTP();
    const savingValues = {
      name,
      contact,
      password,
      email,
      address,
      otp,
    };
    setCacheOTP({ email, prefix: "register", savingValues });

    const sendEmail = await sendEmailToEmailAddress({
      email,
      otp,
      subject: "Greetings, Bulk Email Processor. ",
    });
    if (!sendEmail) throw new SetErrorResponse("Couldn't send email", 500);

    return res.success(
      { email },
      `OTP send to user's Email, Check in Spams too.`
    );
  } catch (err) {
    return res.fail(err);
  }
};

exports.verifyOTPAndSignupController = async (req, res, next) => {
  try {
    const { email, OTP } = req.body;
    const values = await getCacheOTP({ email, prefix: "register" });
    // console.log({OTP})
    // console.log({values})

    if (!(OTP == values?.otp))
      throw new SetErrorResponse("OTP validation failed", 403);
    const { name, contact, password, address } = values;

    const data = new User({
      name,
      contact,
      password,
      email,
      address,
    });
    await data.save();

    res.success({
      message: "successfully Signed Up, Now login to Continue !!",
    });
  } catch (err) {
    res.fail(err);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const secretKey = customCreateSecretKey();
    const { password, email } = req.body;
    const data = await User.findOne({ email: email }, "+salt +hashed_password");
    if (!data?.authentication(password)) {
      return res.json({ error: `Password Did Not Matched` }).status(401);
    }

    const token = await tokenMaker({
      secretKey,
      values: {
        _id: data?._id,
        name: data?.name,
        email,
        contact: data?.contact,
      },
      identifier: "login",
    });

    return res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: config.getInstance().nodeEnv === "production",
      })
      .status(200)
      .json({ data: { message: "Logged in successfully !!", token,userId:data?._id } });
  } catch (e) {
    res.fail(e);
  }
};

exports.logOutUser = async (req, res) => {
  try {
    return res
      .clearCookie("access_token")
      .status(200)
      .json({ data: { message: "Logged in successfully !!" } });
  } catch (e) {
    res.fail(e);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const data = await User.findOneAndDelete({ _id: userId });
    if (!data) {
      throw new SetErrorResponse();
    }
    res.success(data);
  } catch (e) {
    res.fail(e);
  }
};
