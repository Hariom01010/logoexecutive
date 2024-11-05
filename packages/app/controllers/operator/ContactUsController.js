
const Joi = require("joi");
const { STATUS_CODES } = require("http");
const ContactUsService = require("../../services/ContactUsService");
const { isValidObjectId } = require("mongoose");

// Define the payload schema for validating 'revert to customer' form inputs
const revertToCustomerPayloadSchema = Joi.object().keys({
  id: Joi.string()
    .custom((value, helpers) => {
      // Custom validation to check if the provided ID is a valid MongoDB ObjectId
      if (!isValidObjectId(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .required()
    .messages({
      "any.invalid": "Key ID must be a valid MongoDB ObjectId",
      "any.required": "Key ID is required",
    }),
  reply: Joi.string()
    .trim()
    .required()
    .min(20)
    .max(500)
    .regex(/^[^!@#$%^&*(){}\[\]\\\.;'",.<>/?`~|0-9]*$/)
    .messages({
      "string.base": "Reply must be a string",
      "string.min": "Reply should be at least 20 characters",
      "string.max": "Reply must be 500 or fewer characters",
      "any.required": "Reply is required",
      "string.pattern.base": "Reply should only contain alphabets",
    }),
});

// Controller function to handle the revert-to-customer operation
async function revertToCustomerController(req, res, next) {
  const contactUsService = new ContactUsService(); // Initialize service to interact with form data
  try {
    // Validate the request payload using the defined schema
    const { error, value } = revertToCustomerPayloadSchema.validate(req.body);
    if (error) {
      // If validation fails, return a 422 error response with a validation error message
      return res.status(422).json({
        error: STATUS_CODES[422],
        message: error.message,
        statusCode: 422,
      });
    }

    const { id, reply } = value;
    const { userId } = req.userData; // Extract user ID from request metadata
    // Update the form entry with the provided reply, ID, and user ID
    const revertForm = await contactUsService.updateForm(id, reply, userId);
    if (revertForm?.alreadyReplied) {
      // If a response was already sent for this form, return a 409 conflict error
      return res.status(409).json({
        statusCode: 409,
        error: STATUS_CODES[409],
        message: "Already sent the response for this query!",
      });
    }
    // If successful, send a 200 status response with the updated form data
    return res.status(200).json({
      statusCode: 200,
      message: "Form updated successfully",
      data: revertForm,
    });
  } catch (error) {
    // Pass any server errors to the next middleware
    next(error);
  }
}

module.exports = revertToCustomerController;
