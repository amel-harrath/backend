export const STANDARD = {
  OK: {
    message: 'OK',
    statusCode: 200,
  },
  CREATED: {
    message: 'Created',
    statusCode: 201,
  },
  ACCEPTED: {
    message: 'Accepted',
    statusCode: 202,
  },
  NO_CONTENT: {
    message: 'No Content',
    statusCode: 204,
  },
  RESET_CONTENT: {
    message: 'Reset Content',
    statusCode: 205,
  },
  PARTIAL_CONTENT: {
    message: 'Partial Content',
    statusCode: 206,
  },
} as const;

export const ERRORS = {
  INVALID_TOKEN: {
    message: 'Token is invalid.',
    statusCode: 401,
  },
  USER_EXISTS: {
    message: 'User already exists',
    statusCode: 409,
  },
  USER_DOES_NOT_EXIST: {
    message: 'User does not exists.',
    statusCode: 404,
  },
  USER_CREDENTIALS_ERROR: {
    message: 'Invalid credential',
    statusCode: 401,
  },
  TOKEN_ERROR: {
    message: 'Invalid Token',
    statusCode: 401,
  },
  INVALID_REQUEST: {
    message: 'Invalid Token',
    statusCode: 400,
  },
  INTERNAL_SERVER_ERROR: {
    message: 'Internal Server Error',
    statusCode: 500,
  },
  UNAUTHORIZED_ACCESS: {
    message: 'Unauthorized access',
    statusCode: 401,
  },
} as const;
