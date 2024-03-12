# Use an official Node.js image as a base
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project directory to the working directory in the container
COPY . .

# Build the React application
RUN npm run build

# Install serve
RUN npm install -g serve

# Expose port 4173 to the outside world
EXPOSE 4173

# Serve the application
CMD ["serve", "-s", "dist", "-l", "4173"]
