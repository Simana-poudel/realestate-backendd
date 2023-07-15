const multer = require('multer');

exports.uploadImage = ( req, res, next) => {
    try{
      //storage 
        const Storage = multer.diskStorage({
          destination: function (req, file, cb) {
            cb(null, "uploads/");
          },
        filename:(req, file, cb) => {
        cb(null, file.originalname);
      },
      });
      
      const upload = multer({
        storage: Storage
      }).array('testImage', 10);
  
      upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          console.log("MULTER INSTANCE ERROR");
          return res.fail(err);
        } else if (err) {
          console.log("UNKNOWN ERROR WHILE UPLOADING FILE ");
          return res.fail(err);
        }
        next();
      });
  
    }
    catch (error) {
      res.fail(error);
    }
};
  