FROM node:20-alpine

WORKDIR /app

COPY package*.json .

COPY tsconfig*.json .

COPY vite.config.ts .

RUN npm install

COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev" ]