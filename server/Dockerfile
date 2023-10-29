FROM node:latest


# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./
COPY package*.json ./
COPY serving.js serving.js

# Install application dependencies
RUN npm install

# Expose a port for the application (if needed)
EXPOSE 5000


ENV NODE_ACCESS_KEY=AKIAU4AW7XCWSEPKSJWT
ENV NODE_SECRET_ACCESS_KEY=tfMUbwADZwMRWxClvN81T1qwpCsAipVBbOC21Jhz

# Define the command to run your application
CMD [ "node", "serving.js" ]

# docker build -t si3mshady/doggone-backend:latest .

# docker run -p 888:5000  si3mshady/doggone-backend:latest 


#  docker push si3mshady/doggone-backend:latest