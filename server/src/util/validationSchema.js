const validationSchema = (err) => {
  //console.log(err);
  let errors = {};

  // duplicate email error
  if (err.code === 11000) {
    errors.message = "Unable to create user, try again later";
    return errors;
  }

  // validation errors
  if (err.message.includes("validation failed")) {
    if (err?.errors?.user?.kind == "ObjectId") {
      errors.message = err.message;
      return errors;
    }
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties?.path] = properties.message;
    });
  }

  if (Object.keys(errors).length === 0) {
    errors.message = err.message;
  }

  return errors;
};

export default validationSchema;
