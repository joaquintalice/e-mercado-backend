FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm ci

RUN npx prisma generate

RUN npm run build

EXPOSE 4000

USER root

CMD npm run start:prod:migrate