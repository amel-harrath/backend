import * as bcrypt from 'bcryptjs';
import { IUserCreateOrUpdateDto } from '../modules/user/user.schema';
import { AppError } from '../utils/errors.helper';
import { ERRORS } from '../constants/request';

export const compareHash = (value: string, hash: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(value, hash, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
export const genSalt = (saltRounds: number, value: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return reject(err);
      bcrypt.hash(value, salt, (err, hash) => {
        if (err) return reject(err);
        resolve(hash);
      });
    });
  });
};

export const validateUser = (user: IUserCreateOrUpdateDto): void => {
  const today = new Date();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
    throw new AppError(
      'Invalid Email format',
      ERRORS.INVALID_REQUEST.statusCode,
    );
  }

  const birth = new Date(user.birthDate);
  if (isNaN(birth.getTime())) {
    throw new AppError('Invalid Birthdate', ERRORS.INVALID_REQUEST.statusCode);
  } else if (birth > today) {
    throw new AppError(
      'Birthdate cannot be in the futur',
      ERRORS.INVALID_REQUEST.statusCode,
    );
  }
};
