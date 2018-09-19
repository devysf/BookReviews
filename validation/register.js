const Validator = require("validator");
const isempty = require("lodash.isempty");

module.exports = function registerValidation(data) {
  let errors = {};

  //We control that register form inputs are not null or undefined if they are then assign it to string , because Validator library only works with string
  data.name = !isempty(data.name) ? data.name : "";
  data.email = !isempty(data.email) ? data.email : "";
  data.password = !isempty(data.password) ? data.password : "";
  data.password2 = !isempty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password field is required";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isempty(errors)
  };
};
