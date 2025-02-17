# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (to optimize build cache)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code into the container
COPY . .

# Expose the port your backend runs on (5001)
EXPOSE 5001

# Set environment variables (use actual values in production)
ENV PORT=5001

# Start the server
CMD ["npm", "run", "dev"]
