FROM node:18-slim

WORKDIR /app

COPY package.json . 
COPY yarn.lock .

RUN corepack enable
RUN yarn set version 4.3.1

COPY . .
RUN YARN_CHECKSUM_BEHAVIOR=reset
RUN yarn

RUN yarn build

EXPOSE 3050

VOLUME [ "~/kudog-backend/" ]

CMD ["yarn", "prod"]
