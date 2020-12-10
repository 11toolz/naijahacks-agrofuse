const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = (data) => {
  let errors = {};

  data.name = isEmpty(data.name) ? "" : data.name;

  if (!Validator.isLength(data.name, { min: 2, max: 30 }))
    errors.name = "Tool name must be between 2 and 30 characters";

  if (Validator.isEmpty(data.name)) errors.name = "Name field can not be empty";

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
