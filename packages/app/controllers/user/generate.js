const Joi = require("joi");
const { STATUS_CODES } = require("http");
const UserService = require("../../services/User");
const KeyService = require("../../services/Keys");

const generateKeyPayloadSchema = Joi.object().keys({
    keyDescription: Joi.string()
      .trim()
      .required()
      .max(20)
      .regex(/^[a-zA-Z\s]*$/)
      .messages({
        "string.base": "Description must be a string",
        "any.required": "Description is required",
        "string.max": "Description must be 20 characters or fewer",
        "string.pattern.base":
          "Description must contain only alphabets and spaces",
      }),
  });
  
async function generateKeyController(req, res, next) {
  try {
    const { keyDescription } = req.body;
    const { error } = generateKeyPayloadSchema.validate({ keyDescription });
    if (error) {
      return res.status(422).json({
        message: error.message,
        statusCode: 422,
        error: STATUS_CODES[422],
      });
    }

    const { userId } = req.userData;
    const subscription = await UserService.getUserSubscriptionById(userId);
    const validKey = await KeyService.getUserKeysById(userId, subscription.keyLimit);
    if (!validKey) {
      return res.status(403).json({
        message: "Limit reached. Consider upgrading your plan",
        statusCode: 403,
        error: STATUS_CODES[403],
      });
    }

    const newKey = {
      user: userId,
      keyDescription: req.body.keyDescription,
    };
    const UserKey = await KeyService.createNewKey(newKey);
    return res.status(200).json({
      statusCode: 200,
      data: UserKey,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = generateKeyController;