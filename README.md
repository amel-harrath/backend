# User Management Backend API

A backend REST API built with **Fastify** (TypeScript), **Prisma**, and **PostgreSQL**, designed to be containerized with **Docker**. This service handles authentication, user management, and serves a Swagger-based API documentation.

## 📦 Stack

- [Fastify](https://fastify.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker + Docker Compose](https://docs.docker.com/compose/)
- [Swagger](https://swagger.io/)
- [JWT Authentication](https://jwt.io/)

---

## 🛠️ Getting Started

### 1. Clone the project

```bash
git clone git@github.com:amel-harrath/backend.git
cd backend
```

### 2. Setup Environment

Create a .env file:

```
DATABASE_URL=
PORT=
NODE_ENV=
APP_JWT_SECRET=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
HOST=
```

### 3. Start with Docker

```bash
docker-compose up --build
```

## 🧪 Running Locally (without Docker)

### 1. Install dependencies

```bash
npm install
```

### 2. Generate Prisma client

```bash
npm run db:gen
```

### 3. Run database migrations

```bash
npm run migrate:dev
```

### 4. Seed the database

```bash
npm run seed
```

### 5. Start the dev server

```bash
npm run dev
```

## 📚 API Documentation

Swagger UI is available at 👉 [Swigger API Docs](http://localhost:3000/docs)

## 🚀 Scripts

| Command               | Description                     |
| --------------------- | ------------------------------- |
| `npm run dev`         | Start dev server with nodemon   |
| `npm run start`       | Build and start the server      |
| `npm run build`       | Compile TypeScript to JS        |
| `npm run seed`        | Seed the database               |
| `npm run migrate`     | Deploy latest Prisma migrations |
| `npm run migrate:dev` | Run database migrations         |
| `npm run db:gen`      | Generate the prisma client      |
| `npm run lint`        | Lint code with ESLint           |
| `npm run lint:fix`    | Lint + auto-fix                 |
| `npm run format`      | Format code with Prettier       |

## 🐳 Docker

- App: http://localhost:3000

- DB: exposed on port 5432 locally

### Build and run locally

```bash
docker-compose up --build
```
