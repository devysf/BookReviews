const Validator = require("validator");
const isempty = require("lodash.isempty");

module.exports = function loginValidation(data) {
  let errors = {};

  //We control that register form inputs are not null or undefined if they are then assign it to string , because Validator library only works with string
  data.email = !isempty(data.email) ? data.email : "";
  data.password = !isempty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isempty(errors)
  };
};
