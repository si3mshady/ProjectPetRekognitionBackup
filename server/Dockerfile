FROM node:latest


# ENV NODE_ACCESS_KEY=value
# ENV NODE_SECRET_ACCESS_KEY=value
# ENV MY_ENV_VARIABLE=value


# Use an official Node.js runtime as the base image


# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./
COPY package*.json ./
COPY serving.js serving.js

# Install application dependencies
RUN npm install

# Bundle the source code into the container
COPY . .

# Expose a port for the application (if needed)
EXPOSE 3000

# Define the command to run your application
CMD [ "npm", "start" ]
