import { FastifyRequest, FastifyReply } from 'fastify';
import { ERRORS } from '../constants/request';
import { verifyToken } from '../utils/auth.helper';
import { db } from '../config/prisma';
import { handleServerError } from '../utils/errors.helper';

export const checkAuthorization = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  if (!request?.headers?.authorization)
    return reply
      .code(ERRORS.UNAUTHORIZED_ACCESS.statusCode)
      .send(ERRORS.UNAUTHORIZED_ACCESS.message);

  const token = request.headers.authorization.replace('Bearer ', '');
  if (!token) {
    return reply
      .code(ERRORS.UNAUTHORIZED_ACCESS.statusCode)
      .send(ERRORS.UNAUTHORIZED_ACCESS.message);
  }

  const decoded = verifyToken(token);
  if (!decoded?.sub?.id) {
    return reply
      .code(ERRORS.UNAUTHORIZED_ACCESS.statusCode)
      .send(ERRORS.UNAUTHORIZED_ACCESS.message);
  }

  try {
    const userData = await db.user.findUnique({
      where: { id: decoded.sub.id },
    });
    if (!userData) {
      return reply
        .code(ERRORS.UNAUTHORIZED_ACCESS.statusCode)
        .send(ERRORS.UNAUTHORIZED_ACCESS.message);
    }

    request['authUser'] = userData;
  } catch (error) {
    return handleServerError(reply, error);
  }
};
