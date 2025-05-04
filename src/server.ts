import fastify from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import cors from '@fastify/cors';
import { userRoutes } from './modules/user/user.router';

const PORT: number = parseInt(process.env.PORT || '3000', 10);
const host: string = process.env.API_HOST || '0.0.0.0';

// Start the Fastify server
const start = async (): Promise<void> => {
  try {
    const server = await fastify({ logger: true });
    await server.register(swagger, {
      swagger: {
        info: {
          title: 'User Management API',
          description: 'API to manage users',
          version: '1.0.0',
        },
        host: process.env.HOST || 'localhost:3000',
        schemes: ['http', 'https'],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [
          {
            name: 'user',
            description: 'CRUD operations for users management',
          },
        ],
        securityDefinitions: {
          BearerAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
            description: 'JWT Authorization header using the Bearer schema',
          },
        },
        security: [
          {
            BearerAuth: [],
          },
        ],
      },
    });

    await server.register(swaggerUI, {
      routePrefix: '/docs',
      uiConfig: {
        docExpansion: 'list',
        deepLinking: false,
      },
    });

    server.register(cors, {
      origin: 'http://localhost:5173',
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    });
    server.register(userRoutes, { prefix: '/api' });

    server.setErrorHandler((error, _request, reply) => {
      server.log.error(error);
      reply.status(500).send({ error: 'Something went wrong' });
    });

    server.get('/', (request, reply) => {
      reply.status(200).send({ message: 'Hello to User Management API V1!' });
    });
    server.listen({ port: PORT, host: host }, (err, address) => {
      if (err) {
        server.log.error(err);
        process.exit(1);
      }
      server.log.info(`Server listening at ${address}`);
      server.swagger();
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
