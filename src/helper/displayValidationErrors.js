const displayValidationErrors = (errors, toasted) => {
  errors.forEach((error) => {
    toasted.global.defaultError({
      msg: error,
    });
  });
};
export default displayValidationErrors;
