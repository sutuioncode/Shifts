# Employee Shift Management Web App

## Overview
This is a **Node.js** web application written in **TypeScript** that manages employee shifts. The app allows users to create shifts and view them in a calendar. It consists of:

- **Backend**: [NestJS](https://nestjs.com/) (with Prisma ORM)
- **Frontend**: [Vue.js 3](https://vuejs.org/)
- **Database**: PostgreSQL
- **Hosting**: Docker
- **API Documentation**: The API documentation is created using **Bruno** and can be found [here](https://github.com/sutuioncode/shifts/tree/main/backend/.bruno-api).

## Features
- Create employee shifts
- View shifts on a calendar
- API endpoints to manage and retrieve shifts

## Tech Stack
- **Backend**: NestJS (TypeScript, Prisma ORM, PostgreSQL)
- **Frontend**: Vue.js 3
- **Database**: PostgreSQL
- **Containerization**: Docker

## Installation
### Prerequisites
Make sure you have the following installed:
- **Docker & Docker Compose**

### Setup
1. **Clone the repository**:
   ```sh
   git clone https://github.com/sutuioncode/shifts.git
   cd shifts
   ```
2. **Configure environment variables**
   - Create a `.env` file inside the `rootdir/backend` folder and set up your database connection:
     ```env
     DATABASE_URL=postgresql://postgres:postgres@database:5432/shifts
     ```
   - Create a `.env` file inside the `rootdir/frontend` folder:
     ```env
     VITE_API_URL=http://localhost:3000
     ```
3. **Run the application**:
   - Build the application
   ```sh
   docker compose up -- build
   ```
   - Start the application at `http:\\localhost:8080`

## Deployment
TBA
## License
MIT License
