const PropertyDocument = require('../model/propertyDocument.model');
const{ uploadImage } = require('../middlewares/multerUpload');
const jwt = require("express-jwt");



exports.getPropertyDocs = async (req, res) => {
  try {
    console.log("propertydocs");
    const propertydocs = await PropertyDocument.find({});
    res.json({ data: propertydocs }).status(200);
  } catch (e) {
    console.log(e);
    res.json({ error: `Error Occured, ${e}` }).status(500);
  }
};

exports.getPropertyDoc = async (req, res) => {
    try {
      console.log('propertyDocument');
        const id = req.params?.propertydocumentId;
        const propertyDocument = await PropertyDocument.findOne({ _id: id });
        console.log({req: req.params.propertydocumentId})
        res.json({ data: propertyDocument }).status(200);
    } catch (e) {
      console.log(e);
      res.json({ error: `Error Occured, ${e}` }).status(500);
    }
  };

exports.postPropertyDoc = async (req, res) => {
  try {
    // Invoke the uploadImage middleware to handle the image uploads
    uploadImage(req, res, async function (err) {
      if (err) {
        // An error occurred while uploading
        console.log(err);
        return res.status(500).json({ error: 'Error occurred while uploading images' });
      }

      // Access the uploaded files using req.files
      const images = req.files.map((file) => {
        const fileName = file.originalname; // Concatenate date and original name to create the filename
        const filePath = 'http://127.0.0.1:8080/' + fileName; // Concatinate path and filename to create the full file path

        return {
          name: filePath,
          image: {
            data: file.buffer,
            contentType: file.mimetype
          }
        };
      });

    const {
      propertyId,
      documentType
    } = req.body;

    // Create a new property document
    const newPropertyDoc = new PropertyDocument({
      property: propertyId,
      documentType,
      documentImage: images
    });

    // Save the new property document
    const savedPropertyDoc = await newPropertyDoc.save();

    res.status(201).json({ data: savedPropertyDoc });
  });
 } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Error Occurred: ${error}` });
  }
};

exports.updatePropertyDoc = async (req, res) => {
    try {
      const { propertyDocumentId } = req.params;
      const updatedPropertyDocumentData = req.body;
  
      // Find the existing property document by propertyId and update its data
      const updatedPropertyDocument = await PropertyDocument.findByIdAndUpdate(
        propertyDocumentId,
        updatedPropertyDocumentData,
        { new: true }
      );
  
      if (!updatedPropertyDocument) {
        return res.status(404).json({ error: "Property not found" });
      }
  
      res.status(200).json({ data: updatedPropertyDocument });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `Error Occurred: ${error}` });
    }
  };

