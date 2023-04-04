const validationEmail = (email) => {
  const mailformat = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
  if (email.match(mailformat)) {
    return true;
  } else {
    return false;
  }
};

export default validationEmail;
