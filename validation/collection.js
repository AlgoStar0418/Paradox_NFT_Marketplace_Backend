const isEmpty = require("./is-empty");

module.exports = function validateCollectionInput(req) {
  let errors = {};

  if (isEmpty(req.body.logoImg)) {
    errors.logoImg = "Logo Image field is required.";
  }

  if (isEmpty(req.body.title)) {
    errors.title = "Title field is required.";
  }

  if (isEmpty(req.body.category)) {
    errors.category = "Category field is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
