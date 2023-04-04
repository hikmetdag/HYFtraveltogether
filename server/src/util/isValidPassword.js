import validator from "validator";

const isValidPassword = (password) => {
  if (
    validator.isStrongPassword(password, {
      minLength: 6,
      minNumbers: 1,
      minSymbols: 0,
      minUppercase: 1,
    })
  ) {
    return true;
  } else {
    return false;
  }
};

export default isValidPassword;
