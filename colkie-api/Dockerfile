FROM node:19-alpine

WORKDIR /usr/src/colkie-api
COPY package*.json ./
RUN npm install --force

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"] 