class CustomError extends Error {
  status;
  errors;
  constructor(message, status, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
  static BadRequest(message, status = 400) {
    return new CustomError(message, status);
  }
  static Unauthorized() {
    return new CustomError('unauthorized', 401);
  }
}

export { CustomError };
