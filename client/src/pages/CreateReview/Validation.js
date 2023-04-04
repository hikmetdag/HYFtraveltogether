const Validation = (values) => {
  let errors = {};
  if (!values.visitedPlace) {
    errors.visitedPlace = "Visited Place Required";
  }
  if (!values.category) {
    errors.category = "Category Required";
  }
  if (!values.title) {
    errors.title = "Title Required";
  }
  if (!values.category) {
    errors.category = "Category Required";
  }
  if (values.description.length === 0) {
    errors.description = "Description Required";
  }

  return errors;
};

export default Validation;
