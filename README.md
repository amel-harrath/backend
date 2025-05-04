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

## 🧱 Future Enhancements

1. **Implement Role-Based Access Control (RBAC)**:  
   In the future, we can add roles to the users (e.g., Admin, User, Moderator) and manage access rights based on these roles.

2. **User Permissions Management**:  
   Along with roles, we can consider implementing user permissions to fine-tune which actions a user can perform (e.g., view only, create, update, delete). This would be helpful to create a more robust system that controls access to different parts of the application.

3. **Session Management**:  
   Currently, the app relies on JWT tokens for authentication. We can consider implementing features like token refresh or session expiration handling for better security and usability.

4. **Extend API**:  
   Future improvements could involve adding more CRUD operations on other resources or integrating external services into the application (e.g., email notifications, file uploads, etc.).

5. **Testing**:  
   Add unit and integration tests using libraries like [Jest](https://jestjs.io/). This will ensure that the app is robust and maintains high quality through future updates.
