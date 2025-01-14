# Stage 1: Build
FROM node:18 AS builder

# Set working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

EXPOSE 3030

CMD ["npm", "run", "start:dev"]
