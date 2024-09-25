FROM node:20-alpine

WORKDIR /server

COPY package*.json .

COPY tsconfig.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]