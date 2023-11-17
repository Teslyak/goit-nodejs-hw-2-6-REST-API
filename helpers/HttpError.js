export const HttpError = (status, message) => {
  console.log(status);
  const error = new Error(message);
  error.status = status;
  return error;
};
