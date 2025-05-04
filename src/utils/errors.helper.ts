import { FastifyReply } from 'fastify';
import { ERRORS } from '../constants/request';

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export function handleServerError(
  reply: FastifyReply,
  error: unknown,
): FastifyReply {
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({ message: error.message });
  }

  return reply
    .status(ERRORS.INTERNAL_SERVER_ERROR.statusCode)
    .send(ERRORS.INTERNAL_SERVER_ERROR.message);
}
