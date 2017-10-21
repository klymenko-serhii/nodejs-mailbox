const { validationResult } = require("express-validator/check");

module.exports = class BaseController {
  constructor() {
    this.validate = this.validate.bind(this);
    this.validator = this.validator.bind(this);
  }

  successResponse(res) {
    res.json({ success: true });
  }

  validate(key) {
    return [
      ...this.validationChain[key],
      this.validator
    ];
  }
    
  /** Run validations on request data. */
  validator(req, res, next) {
    try {
      // Run the validation chain
      validationResult(req).throw();
      next();
    } catch (err) {
      this.validatorErrorResponse(res, err);
    }
  }
  /** Set the validation error response. */
  validatorErrorResponse(res, err) {
    res.status(422).json(err.array());
  }
};
