class CustomErrorHandler extends Error {
  status: number;
  constructor(status: number, msg: string) {
    super(msg);
    this.status = status;
  }

  static alreadyExist(message: string) {
    return new CustomErrorHandler(409, message);
  }

  static wrongCredentials(message: string = 'Username or password is wrong!') {
    return new CustomErrorHandler(401, message);
  }

  static unAuthorized(message: string = 'Unauthorized') {
    return new CustomErrorHandler(401, message);
  }

  static notFound(message: string = '404 Not Found') {
    return new CustomErrorHandler(404, message);
  }

  static serverError(message: string = 'Internal server error') {
    return new CustomErrorHandler(500, message);
  }
}

export default CustomErrorHandler;
