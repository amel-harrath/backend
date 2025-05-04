import { Prisma } from '@prisma/client';
import { ERRORS } from '../../constants/request';
import { AppError } from '../../utils/errors.helper';
import { compareHash, genSalt } from '../../utils/user.helper';
import { signToken } from '../../utils/auth.helper';
import { db } from '../../config/prisma';
import { IUserCreateOrUpdateDto, IUsersQueryDto } from './user.schema';

export const login = async (email: string, password: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      throw new AppError(
        ERRORS.USER_DOES_NOT_EXIST.message,
        ERRORS.USER_DOES_NOT_EXIST.statusCode,
      );
    }
    const checkPass = await compareHash(password, user.password);
    if (!checkPass) {
      throw new AppError(
        ERRORS.USER_CREDENTIALS_ERROR.message,
        ERRORS.USER_CREDENTIALS_ERROR.statusCode,
      );
    }
    const token = signToken(user.id, user.email);
    return {
      token: token,
      user: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        birthDate: user.birthDate,
      },
    };
  } catch (error) {
    throw error;
  }
};
export const createUser = async (data: IUserCreateOrUpdateDto) => {
  try {
    const user = await db.user.findUnique({ where: { email: data.email } });
    if (user) {
      throw new AppError(
        ERRORS.USER_EXISTS.message,
        ERRORS.USER_EXISTS.statusCode,
      );
    }
    const hashPass = await genSalt(10, data.password);

    const createdUser = await db.user.create({
      data: {
        email: data.email,
        password: hashPass,
        firstname: data.firstname,
        lastname: data.lastname,
        birthDate: new Date(data.birthDate),
      },
    });

    return createdUser;
  } catch (error) {
    throw error;
  }
};
export const getUsers = async (data: IUsersQueryDto) => {
  try {
    const { page, limit, sortBy, sortOrder, search } = data;
    const skip = (page - 1) * limit;

    const whereClause: Prisma.UserWhereInput | undefined = search
      ? {
          OR: [
            { firstname: { contains: search, mode: 'insensitive' } },
            { lastname: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
          ],
        }
      : undefined;

    const [users, total] = await Promise.all([
      db.user.findMany({
        where: whereClause,
        orderBy: {
          [sortBy]: sortOrder,
        },
        skip,
        take: limit,
      }),
      db.user.count({ where: whereClause }),
    ]);

    return {
      data: users,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    throw error;
  }
};
export const getUserById = async (id: number) => {
  try {
    const user = await db.user.findUnique({ where: { id } });
    if (!user) {
      throw new AppError(
        ERRORS.USER_DOES_NOT_EXIST.message,
        ERRORS.USER_DOES_NOT_EXIST.statusCode,
      );
    }
    return user;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id: number, data: IUserCreateOrUpdateDto) => {
  try {
    const user = await db.user.findUnique({ where: { id } });
    if (!user) {
      throw new AppError(
        ERRORS.USER_DOES_NOT_EXIST.message,
        ERRORS.USER_DOES_NOT_EXIST.statusCode,
      );
    }
    let hashPass = user.password;
    if (data.password) {
      hashPass = await genSalt(10, data.password);
    }
    const updatedUser = await db.user.update({
      where: { id },
      data: {
        email: data.email ?? user.email,
        password: hashPass,
        firstname: data.firstname ?? user.firstname,
        lastname: data.lastname ?? user.lastname,
        birthDate: data.birthDate ? new Date(data.birthDate) : user.birthDate,
      },
    });

    return updatedUser;
  } catch (error) {
    throw error;
  }
};
export const deleteUser = async (id: number) => {
  try {
    const user = await db.user.findUnique({ where: { id } });
    if (!user) {
      throw new AppError(
        ERRORS.USER_DOES_NOT_EXIST.message,
        ERRORS.USER_DOES_NOT_EXIST.statusCode,
      );
    }
    await db.user.delete({ where: { id } });
  } catch (error) {
    throw error;
  }
};
