const Joi = require("joi");
const { STATUS_CODES } = require("http");
const UserService = require("../../services/User");

const changeNameEmailSchema = Joi.object().keys({
  name: Joi.string()
    .trim()
    .required()
    .min(1)
    .max(20)
    .regex(/^[^!@#$%^&*(){}\[\]\\\.;'",.<>/?`~|0-9]*$/)
    .messages({
      "string.base": "First name must be string",
      "string.min": "First name cannot be empty",
      "string.max": "First name length must be 20 or fewer",
      "any.required": "First name is required",
      "string.pattern.base": "First name should only contain alphabets",
    }),
});

/**
 * This controller validates the request payload, verifies the existence of the user,
 * and updates the user's profile with the provided name.
 */
async function updateProfileController(req, res, next) {
  try {
    const userService = new UserService();
    const { name } = req.body;
    const { error } = changeNameEmailSchema.validate(req.body);
    if (error) {
      return res.status(422).json({
        statusCode: 422,
        message: error.message,
        error: STATUS_CODES[422],
      });
    }

    const { userId } = req.userData;
    const user = await userService.getUser(userId);
    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        error: STATUS_CODES[404],
        message: "User not found",
      });
    }

    const profileUpdatedSuccessfully = userService.updateUser(name, user._id);
    if (!profileUpdatedSuccessfully) {
      return res.status(500).json({
        statusCode: 500,
        message: "Failed to update profile",
        error: STATUS_CODES[500],
      });
    }

    return res.status(200).json({
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = updateProfileController;
