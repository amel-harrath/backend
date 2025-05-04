import { FastifyInstance } from 'fastify';
import {
  createUserHandler,
  getUsersListHandler,
  getUserHandler,
  updateUserHandler,
  deleteUserHandler,
  loginHandler,
} from './user.controller';

import { createUserSchema, loginSchema, updateUserSchema } from './user.schema';
import { validateSchema } from '../../middlewares/validate';
import { checkAuthorization } from '../../middlewares/authorize';

export async function userRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.post(
    '/login',
    {
      schema: {
        body: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string' },
          },
        },
        response: {
          200: {
            description: 'User logged in',
            type: 'object',
            properties: {
              user: {
                id: { type: 'number' },
                firstname: { type: 'string' },
                lastname: { type: 'string' },
                email: { type: 'string' },
                birthDate: { type: 'string', format: 'date' },
              },
              token: { type: 'string' },
            },
          },
          401: {
            description: 'User login Error',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
      preValidation: validateSchema(loginSchema),
    },
    loginHandler,
  );

  fastify.get(
    '/users',
    {
      schema: {
        security: [
          {
            BearerAuth: [],
          },
        ],
        querystring: {
          type: 'object',
          properties: {
            page: { type: 'integer', minimum: 1, default: 1 },
            limit: { type: 'integer', minimum: 1, maximum: 100, default: 10 },
            sortBy: {
              type: 'string',
              enum: ['id', 'updatedAt', 'createdAt', 'email', 'birthDate'],
              default: 'id',
            },
            sortOrder: {
              type: 'string',
              enum: ['asc', 'desc'],
              default: 'asc',
            },
            search: { type: 'string' },
          },
        },
        response: {
          200: {
            description: 'Users list',
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'number' },
                    firstname: { type: 'string' },
                    lastname: { type: 'string' },
                    email: { type: 'string' },
                    birthDate: { type: 'string', format: 'date' },
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time' },
                  },
                },
              },
              page: { type: 'number' },
              total: { type: 'number' },
              limit: { type: 'number' },
              totalPages: { type: 'number' },
            },
          },
          404: {
            description: 'Users not found',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
      preHandler: checkAuthorization,
    },
    getUsersListHandler,
  );

  fastify.get(
    '/users/:id',
    {
      schema: {
        security: [
          {
            BearerAuth: [],
          },
        ],
        params: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
          },
          required: ['id'],
        },
        response: {
          200: {
            description: 'User found',
            type: 'object',
            properties: {
              id: { type: 'number' },
              firstname: { type: 'string' },
              lastname: { type: 'string' },
              email: { type: 'string' },
              birthDate: { type: 'string', format: 'date' },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
            },
          },
          404: {
            description: 'User not found',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
      preHandler: checkAuthorization,
    },
    getUserHandler,
  );

  fastify.post(
    '/users',
    {
      schema: {
        security: [
          {
            BearerAuth: [],
          },
        ],
        body: {
          type: 'object',
          required: ['firstname', 'lastname', 'email', 'password', 'birthDate'],
          properties: {
            firstname: { type: 'string' },
            lastname: { type: 'string' },
            email: { type: 'string', format: 'email' },
            password: { type: 'string' },
            birthDate: { type: 'string', format: 'date' },
          },
        },
        response: {
          201: {
            description: 'User created',
            type: 'object',
            properties: {
              id: { type: 'number' },
              firstname: { type: 'string' },
              lastname: { type: 'string' },
              email: { type: 'string', format: 'email' },
              birthDate: { type: 'string', format: 'date' },
            },
          },
          409: {
            description: 'User creation error',
            type: 'object',
            properties: {
              statusCode: { type: 'number' },
              message: { type: 'string' },
            },
          },
        },
      },
      preValidation: validateSchema(createUserSchema),
      preHandler: checkAuthorization,
    },
    createUserHandler,
  );

  fastify.put(
    '/users/:id',
    {
      schema: {
        security: [
          {
            BearerAuth: [],
          },
        ],
        params: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
          },
          required: ['id'],
        },
        body: {
          type: 'object',
          properties: {
            firstname: { type: 'string' },
            lastname: { type: 'string' },
            email: { type: 'string', format: 'email' },
            password: { type: 'string' },
            birthDate: { type: 'string', format: 'date' },
          },
        },
        response: {
          200: {
            description: 'User udpated',
            type: 'object',
            properties: {
              id: { type: 'number' },
              firstname: { type: 'string' },
              lastname: { type: 'string' },
              email: { type: 'string' },
              birthDate: { type: 'string', format: 'date' },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
            },
          },
          404: {
            description: 'User not found',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
      preValidation: validateSchema(updateUserSchema),
      preHandler: checkAuthorization,
    },
    updateUserHandler,
  );

  fastify.delete(
    '/users/:id',
    {
      schema: {
        security: [
          {
            BearerAuth: [],
          },
        ],
        params: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
          },
          required: ['id'],
        },
        response: {
          204: {
            description: 'User deleted',
            type: 'null',
          },
          404: {
            description: 'User not found',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
      preHandler: checkAuthorization,
    },
    deleteUserHandler,
  );
}
