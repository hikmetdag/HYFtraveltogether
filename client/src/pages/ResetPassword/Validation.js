const Validation = (values) => {
  let errors = {};
  if (!values.email) {
    errors.email = "Email Required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Write valid email";
  }

  return errors;
};

export default Validation;
