# Stage 1: Build
FROM node:18 AS builder

# Set working directory inside the container
WORKDIR /app

# Bundle app source
COPY . .
RUN npm install

EXPOSE 3030

CMD ["npm", "run", "start:dev"]
