# syntax=docker/dockerfile:1

FROM node:16

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]
COPY prisma ./prisma

RUN yarn
RUN yarn postinstall

COPY . .


EXPOSE 8080

CMD [ "yarn", "start" ]