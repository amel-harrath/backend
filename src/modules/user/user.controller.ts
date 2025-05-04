import { FastifyRequest, FastifyReply } from 'fastify';
import * as UserService from './user.service';
import {
  IUserLoginDto,
  IUserCreateOrUpdateDto,
  IUsersQueryDto,
} from './user.schema';
import { STANDARD } from '../../constants/request';
import { handleServerError } from '../../utils/errors.helper';

export async function loginHandler(
  request: FastifyRequest<{
    Body: IUserLoginDto;
  }>,
  reply: FastifyReply,
): Promise<FastifyReply> {
  try {
    const { email, password } = request.body;
    const { token, user } = await UserService.login(email, password);
    return reply.code(STANDARD.OK.statusCode).send({
      token: token,
      user: user,
    });
  } catch (error) {
    return handleServerError(reply, error);
  }
}

export async function createUserHandler(
  request: FastifyRequest<{
    Body: IUserCreateOrUpdateDto;
  }>,
  reply: FastifyReply,
): Promise<FastifyReply> {
  try {
    const { firstname, lastname, email, password, birthDate } = request.body;

    const createdUser = await UserService.createUser({
      firstname,
      lastname,
      email,
      password,
      birthDate,
    });

    return reply.code(STANDARD.CREATED.statusCode).send(createdUser);
  } catch (error) {
    return handleServerError(reply, error);
  }
}

export async function getUsersListHandler(
  request: FastifyRequest<{ Querystring: IUsersQueryDto }>,
  reply: FastifyReply,
): Promise<FastifyReply> {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      search = '',
    } = request.query;
    const data = await UserService.getUsers({
      page: page,
      limit: limit,
      sortBy,
      sortOrder,
      search,
    });
    return reply.status(STANDARD.OK.statusCode).send(data);
  } catch (error) {
    return handleServerError(reply, error);
  }
}

export async function getUserHandler(
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply,
): Promise<FastifyReply> {
  try {
    const { id } = request.params;
    const user = await UserService.getUserById(id);
    return reply.code(STANDARD.OK.statusCode).send(user);
  } catch (error) {
    return handleServerError(reply, error);
  }
}

export async function updateUserHandler(
  request: FastifyRequest<{
    Params: { id: number };
    Body: IUserCreateOrUpdateDto;
  }>,
  reply: FastifyReply,
): Promise<FastifyReply> {
  try {
    const { id } = request.params;
    const { firstname, lastname, email, password, birthDate } = request.body;

    const user = await UserService.updateUser(id, {
      firstname,
      lastname,
      email,
      password,
      birthDate,
    });
    return reply.code(STANDARD.OK.statusCode).send(user);
  } catch (error) {
    return handleServerError(reply, error);
  }
}

export async function deleteUserHandler(
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply,
): Promise<FastifyReply> {
  try {
    const { id } = request.params;
    await UserService.deleteUser(id);
    return reply.code(STANDARD.NO_CONTENT.statusCode).send();
  } catch (error) {
    return handleServerError(reply, error);
  }
}
