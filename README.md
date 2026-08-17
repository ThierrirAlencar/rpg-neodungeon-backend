# NeoDungeon Backend

A modern, scalable backend API for the NeoDungeon RPG token management platform built with **NestJS**, **TypeScript**, and **Prisma**.

[![Node.js](https://img.shields.io/badge/Node.js->=20.0.0-green?logo=node.js)](https://nodejs.org/)
[![npm](https://img.shields.io/badge/npm->=10.0.0-red?logo=npm)](https://www.npmjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./license.md)
[![NestJS](https://img.shields.io/badge/NestJS-11.0-red?logo=nestjs)](https://nestjs.com)

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Database](#database)
- [Caching Strategy](#caching-strategy)
- [Testing](#testing)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

NeoDungeon Backend is a comprehensive REST API that manages RPG character tokens, user authentication, and shared character profiles. It provides secure token management, multi-tier caching, and scalable infrastructure through Docker containerization.

### Key Features

- 🔐 **Secure Authentication** - JWT-based user authentication with token management
- 🎮 **Token Management** - Create, store, and manage RPG character tokens
- 🌐 **Social Sharing** - Public profiles and social features for character tokens
- 💾 **Storage** - MinIO-based object storage for token data and images
- ⚡ **Multi-tier Caching** - In-memory and Redis caching for optimal performance
- 📊 **API Documentation** - Auto-generated Swagger/OpenAPI documentation
- 🗄️ **Database** - PostgreSQL with Prisma ORM
- 🐳 **Docker Ready** - Complete Docker Compose setup for all services

## 🛠️ Tech Stack

### Core Framework
- **[NestJS](https://nestjs.com)** - Progressive Node.js framework for scalable server-side applications
- **[TypeScript](https://www.typescriptlang.org/)** - Typed superset of JavaScript

### Database & ORM
- **[PostgreSQL](https://www.postgresql.org/)** - Powerful, open-source relational database
- **[Prisma](https://www.prisma.io/)** - Next-generation ORM for Node.js and TypeScript

### Caching & Storage
- **[Redis](https://redis.io/)** - In-memory data structure store for caching
- **[MinIO](https://min.io/)** - S3-compatible object storage
- **[Keyv](https://keyv.js.org/)** - Simple key-value storage abstraction

### Development Tools
- **[ESLint](https://eslint.org/)** - JavaScript linting utility
- **[Prettier](https://prettier.io/)** - Code formatter
- **[Jest](https://jestjs.io/)** - JavaScript testing framework
- **[Vitest](https://vitest.dev/)** - Unit testing framework

### Documentation & Validation
- **[Swagger/OpenAPI](https://swagger.io/)** - API documentation
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[Multer](https://github.com/expressjs/multer)** - Middleware for file uploads

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 20.0.0
- **npm** >= 10.0.0
- **Docker** & **Docker Compose** (for containerized services)
- **Git**

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/neodungeon-backend.git
cd neodungeon-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Generate Prisma Client

```bash
npx prisma generate
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
PG_DB_USER=postgres
PG_DB_PASSWORD=your_secure_password
PG_DB_NAME=neodungeon
PG_DB_PORT=5432
DATABASE_URL="postgresql://${PG_DB_USER}:${PG_DB_PASSWORD}@localhost:${PG_DB_PORT}/${PG_DB_NAME}?schema=public"

# Server Configuration
HOST=localhost
PORT=3000

# MinIO Configuration
MINIO_ROOT_USER=minioadmin
MINIO_ROOT_PASSWORD=minioadmin

# Redis Configuration
REDIS_URL=redis://localhost:6379

# JWT Configuration
JWT_SECRET=your_secret_key_here
JWT_EXPIRATION=24h
```

### Docker Services Setup

Start all required services (PostgreSQL, Redis, MinIO) using Docker Compose:

```bash
docker-compose -f docker/docker-compose.yaml up -d
```

This will start:
- **PostgreSQL** on port 5432
- **Redis** on port 6379
- **MinIO** on port 9000

## 🏃 Quick Start

### Development Mode

```bash
npm run start:dev
```

The server will start on `http://localhost:3000` with hot-reload enabled.

### Access API Documentation

Once the server is running, open your browser and navigate to:

```
http://localhost:3000/docs
```

This provides interactive Swagger UI documentation where you can test all API endpoints.

### Production Build

```bash
npm run build
npm run start:prod
```

## 📁 Project Structure

```
src/
├── application/           # Application services layer
│   ├── microservices/    # Microservice configuration (Redis)
│   └── services/         # Business logic services
│       ├── auth/         # Authentication service
│       ├── prisma/       # Database service
│       ├── redis/        # Cache service
│       └── storage/      # Object storage service
├── config/               # Configuration management
├── domain/               # Domain layer (business entities)
│   ├── Errors/          # Custom error definitions
│   ├── interfaces/      # Business interfaces
│   ├── repository/      # Data access patterns
│   └── schemas/         # Validation schemas
├── infra/               # Infrastructure layer
│   ├── auth/            # Authentication controller
│   └── dto/             # Data transfer objects
├── lib/                 # Shared utilities
│   ├── env/             # Environment configuration
│   └── swagger/         # Swagger documentation
├── modules/             # NestJS modules
│   ├── auth/            # Auth module
│   ├── prisma/          # Database module
│   ├── redis/           # Cache module
│   ├── repository/      # Repository module
│   └── storage/         # Storage module
├── templates/           # Email and message templates
│   ├── html/            # HTML email templates
│   └── json/            # JSON templates
├── app.module.ts        # Main application module
└── main.ts             # Application entry point

prisma/
├── schema.prisma        # Database schema
├── migrations/          # Database migrations
└── generated/           # Generated Prisma client

docker/
└── docker-compose.yaml  # Docker services configuration

test/
├── app.e2e-spec.ts     # End-to-end tests
└── jest-e2e.json       # Jest configuration for E2E tests
```

## 📚 API Documentation

### Swagger UI

The API documentation is automatically generated using Swagger/OpenAPI and available at:

```
http://localhost:3000/docs
```

### OpenAPI JSON Schema

Access the raw OpenAPI schema at:

```
http://localhost:3000/swagger/json
```

## 🗄️ Database

### Schema Overview

The database includes the following main entities:

- **Users** - User accounts with authentication
- **Auth Tokens** - Authentication and verification tokens
- **RPG Tokens** - Character sheet/token data
- **RPG Token Social** - Social profiles and public sharing settings
- **RPG Token Social Image** - Images associated with tokens

### Running Migrations

```bash
# Create and run pending migrations
npx prisma migrate dev

# Deploy migrations to production database
npx prisma migrate deploy

# View migration status
npx prisma migrate status
```

### Prisma Studio

Explore your database visually:

```bash
npx prisma studio
```

Opens an interactive database browser at `http://localhost:5555`

## ⚡ Caching Strategy

The application implements a **multi-tier caching strategy**:

### Tier 1: In-Memory Cache
- **Store**: Keyv with CacheableMemory
- **TTL**: 60 seconds
- **LRU Size**: 5000 entries
- **Use Case**: Fast access to frequently requested data

### Tier 2: Redis Cache
- **URL**: `redis://localhost:6379`
- **Use Case**: Distributed cache across multiple instances
- **Benefits**: Persistent across server restarts, shared across instances

Both tiers are initialized in the `CacheModule` and available throughout the application.

## 🧪 Testing

### Unit Tests

```bash
npm run test
```

Watch mode for development:

```bash
npm run test:watch
```

Coverage report:

```bash
npm run test:cov
```

### End-to-End Tests

```bash
npm run test:e2e
```

Debug mode:

```bash
npm run test:debug
```

## 📜 Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Build the application for production |
| `npm run start` | Start the application |
| `npm run start:dev` | Start with hot-reload (development) |
| `npm run start:debug` | Start with debugger attached |
| `npm run start:prod` | Start production build |
| `npm run lint` | Run ESLint and fix issues |
| `npm run format` | Format code with Prettier |
| `npm run test` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:cov` | Run tests with coverage report |
| `npm run test:debug` | Debug tests |
| `npm run test:e2e` | Run end-to-end tests |

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards

- Follow the existing code style
- Run `npm run lint` before committing
- Ensure tests pass: `npm run test`
- Update documentation if needed

### Development Workflow

1. Start development environment:
   ```bash
   docker-compose -f docker/docker-compose.yaml up -d
   npm install
   npx prisma migrate dev
   npm run start:dev
   ```

2. Make your changes and test locally

3. Commit and push to your feature branch

4. Submit a pull request with a clear description

## 📝 License

This project is licensed under the MIT License. See the [license.md](./license.md) file for details.

---

## 📞 Support & Contact

- **Team Email**: contact@neodungeon.com
- **Issue Tracker**: [GitHub Issues](https://github.com/yourusername/neodungeon-backend/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/neodungeon-backend/discussions)

## 🔗 Related Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
- [Redis Documentation](https://redis.io/documentation)
- [Docker Documentation](https://docs.docker.com)

---

**Last Updated**: August 2026 | **Version**: 1.0.0
