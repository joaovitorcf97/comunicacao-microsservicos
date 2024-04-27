class AccessTokenException extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
    this.name = this.constructor.name;
    Error.captureStackTrace(this.constructor);
  }
}

export default AccessTokenException;
