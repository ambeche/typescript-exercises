// error name will be used by the express ValidationErrorHandle middleware
const throwValidationError = (message: string, name = 'Error'): void  => {
  const ValidationError = new Error();
  ValidationError.name = name;
  ValidationError.message = message;
  throw ValidationError;
};

export { throwValidationError };
