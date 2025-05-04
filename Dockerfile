FROM node:20-alpine

WORKDIR /src

COPY package*.json ./
COPY ./prisma ./prisma

RUN npm install

COPY . .

COPY docker-entrypoint.sh .

RUN chmod +x docker-entrypoint.sh

EXPOSE 3000

CMD ["sh", "./docker-entrypoint.sh"]
