const isEmpty = require("./is-empty");

module.exports = function validateNFTInput(req) {
  let errors = {};

  if (isEmpty(req.body.logoFile)) {
    errors.logoFile = "Logo File field is required.";
  }

  if (isEmpty(req.body.title)) {
    errors.title = "Title field is required.";
  }

  if (isEmpty(req.body.collectionid)) {
    errors.collectionid = "Collection field is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
