FROM node:18
WORKDIR /usr/src
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "app.js"]