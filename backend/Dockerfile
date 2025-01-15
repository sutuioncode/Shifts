# Stage 1: Build
FROM node:18 AS builder

# Set working directory inside the container
WORKDIR /home/app/

# Bundle app source
COPY . /home/app/
RUN npm install

EXPOSE 3030

CMD ["npm", "run", "start:dev"]
