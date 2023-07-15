const { SetErrorResponse } = require("./responseSetter");

exports.failCase = ({ req, res }) => {
  try {
    return (err) => {
      if (err instanceof SetErrorResponse) {
        statusCode = err?._meta_?.status;
        if (!(statusCode > 100 && statusCode < 999)) {
          console.log("Res Fail Error: Bug ");
          statusCode = 500;
        }
        console.log({metaError:err?._meta_?.error})

        return res.status(statusCode).send({
          error: err?._meta_?.error,
          status: err?._meta_?.status,
        });
      }
      console.log({metaError:err})
      return res
        .status(500)
        .json({ error: "Internal Server Error", err: err + "" });
    };
  } catch (error) {
    console.log("This error needs Emergency Assist");
    console.log(error);
    return res.status(500).send({ error: "Error needs Emergency Assist" });
  }
};

exports.successCase = ({ req, res }) => {
  return (data, message="OK" ) => {
    if(typeof data === "string"){
      return res.json({message: data})
    }
    return res.json({ data, message});
  };
};