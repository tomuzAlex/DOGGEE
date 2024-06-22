const validateFormEmpty = (value: string) => {
  if (!value) {
    return 'field required';
  }
  return null;
};
 const validateFormUsername = (username: string) => {
  return validateFormEmpty(username);
};
 const loginFormValidate = {
  username: validateFormUsername,
};
const validateLoginForm = (name: 'username', value: string) => {
  return loginFormValidate[name](value);
};
