#!/bin/sh

echo "⏳ Waiting for the database to be ready..."
npx wait-on tcp:db:5432

echo "✅ Running Prisma migrations..."
npm run migrate

echo "🌱 Running seed script..."
npm run seed

echo "🚀 Starting the backend..."
npm run start
