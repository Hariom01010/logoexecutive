const ImageServices = require("../../services/Images");
const { STATUS_CODES } = require("http");
const Joi = require("joi");

const imageReuploadSchema = Joi.object().keys({
  id: Joi.string().trim().required().messages({
    "any.required": "Id is required",
  }),
});

/**
 * Manages re-uploading an image for admin users.
 * Validates input, uploads to S3, updates database.
 */
async function adminReUploadController(req, res, next) {
  try {
    const imageServices = new ImageServices();
    let { userId } = req.userData;
    let { id } = req.body;
    const file = req.file;
    if (!file) {
      return res.status(422).json({
        statusCode: 422,
        message: "Image file is required",
        error: STATUS_CODES[422],
      });
    }

    const { error } = imageReuploadSchema.validate({ id });
    if (error) {
      return res.status(422).json({
        statusCode: 422,
        message: error.details[0].message,
        error: STATUS_CODES[422],
      });
    }

    const exsitingImage = await imageServices.getImageById(id);
    const imageName = file.originalname;
    const Imagename = imageName.split(".")[0].toUpperCase();
    const Extension = imageName.split(".")[1].toLowerCase();
    const companyName = Imagename + "." + Extension;
    if (companyName !== exsitingImage.company_name) {
      return res.status(400).json({
        error: STATUS_CODES[400],
        statusCode: 400,
        message: "Image Name And Extension Must Be Same As Previous Image",
      });
    }

    const key = await imageServices.uploadToS3(file, companyName, Extension);
    if (!key) {
      res.status(500).json({
        error: STATUS_CODES[500],
        statusCode: 500,
        message: "Image Upload Failed, try again later",
      });
    }

    const imageData = await imageServices.updateImageById(id, {
      uploadedBy: userId,
      updatedAt: Date.now(),
    });
    if (!imageData) {
      res.status(500).json({
        error: STATUS_CODES[500],
        statusCode: 500,
        message: "Failed to update record",
      });
    }

    res.status(200).json({
      statusCode: 200,
      message: "Reupload successfully",
      data: imageData,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = adminReUploadController;