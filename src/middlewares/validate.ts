import { FastifyRequest, FastifyReply } from 'fastify';
import { ObjectSchema } from 'joi';
import { ERRORS } from '../constants/request';

export const validateSchema = (schema: ObjectSchema) => {
  return async function (
    req: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    const { error } = schema.validate(req.body);
    if (error) {
      return reply
        .status(ERRORS.INVALID_REQUEST.statusCode)
        .send({ error: error.details });
    }
  };
};
