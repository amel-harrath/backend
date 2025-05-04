import Joi from 'joi';

export interface IUserLoginDto {
  email: string;
  password: string;
}

export interface IUserCreateOrUpdateDto {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  birthDate: Date;
}

export interface IUsersQueryDto {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  birthDate: Joi.date().required(),
});

export const updateUserSchema = Joi.object({
  firstname: Joi.string().min(2).optional(),
  lastname: Joi.string().min(2).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(8).optional(),
  birthDate: Joi.date().optional(),
});
