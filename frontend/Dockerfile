FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
# Start the application using Vite's development server
CMD ["npm", "run", "dev"]