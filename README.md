# Run the Project Locally using Docker Compose

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (with WSL 2 integration if using Windows)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Steps to Run the Project

### 1. Clone the Repository

```sh
git clone https://github.com/0xMishra/taskify.git
cd taskify
```

### 2. Start the Application

Run the following command to build and start the services:

```sh
docker-compose up
```

This will start the following services:

- **MongoDB** (Database)
- **Backend** (NestJS API)
- **Frontend** (Next.js app)

### 3. Access the Application

- **Frontend:** `http://localhost:3000`
- **Backend API:** `http://localhost:3001`

### 4. Run Tests

#### Backend Tests

Add all necessary env variables in `.env` file inside backend directory ( refer `.env.example`)
To run backend tests, execute the following command:

```sh
cd backend
npm run test
```

### 5. Stop the Application

To stop and remove the containers, run:

```sh
docker-compose down
```

### 6. Cleanup Docker Resources (Optional)

If you want to remove all stopped containers, networks, and unused images, run:

```sh
docker system prune -a
```
