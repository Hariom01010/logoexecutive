const Joi = require("joi");
const { STATUS_CODES } = require("http");
const UserService = require("../../services/User");
const SubscriptionService = require("../../services/Subscription")

const generateKeyPayloadSchema = Joi.object().keys({
  key_description: Joi.string()
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
    const userService = new UserService();
    const subscriptionService = new SubscriptionService();

    const { key_description } = req.body;
    const { error } = generateKeyPayloadSchema.validate({ key_description });
    if (error) {
      return res.status(422).json({
        message: error.message,
        statusCode: 422,
        error: STATUS_CODES[422],
      });
    }

    const { userId } = req.userData;
    const user = await userService.getUser(userId);
    const subscription = await subscriptionService.getSubscription(user.subscription_id);
    if (user.keys.length >= subscription.key_limit) {
      return res.status(403).json({
        message: "Limit reached. Consider upgrading your plan",
        statusCode: 403,
        error: STATUS_CODES[403],
      });
    }

    const newKey = {
      key_description: req.body.key_description,
      subscription_id: subscription._id
    };
    const newUserKey = await userService.createNewUserKey(newKey, user);
    return res.status(200).json({
      statusCode: 200,
      data: newUserKey,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = generateKeyController;