# About the project
This project is a simple task management application made using ReactJS.
For the backend, this is the [link](https://github.com/ckw28502/taskflare-expressjs)

# Requirement
- Node v18
- NPM v9

# Prequisites step
- copy .env.examples and paste it twice as .env and .env.docker
- fill the URI for .env with the URI to backend (default is http://localhost:5173)
- fill the URI for .env.docker with the URI to backend container (default is http://taskflare-expressjs-app-1:5173)

# Install libraries
```bash
npm install
```

# Running the project on local server
```bash
npm run dev
````
# Testing
```bash
npm run test
```
note: this will open a new terminal for running the application and a cypress window on chrome.

# Running on docker
You need to have docker installed and running on your machine
It also needs to be able run docker compose
```
docker compose up --detach
```

To stop the application
```
docker compose down --volumes
```
