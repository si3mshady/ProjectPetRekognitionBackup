# Stage 1: Build the React app
FROM node:latest as builder

WORKDIR /app

# Copy the rest of the application files
COPY public/ public/
COPY src/ src/
COPY package.json package.json
COPY package-lock.json package-lock.json


# Install dependencies
RUN npm install



# Build the React app
RUN npm run build

# Stage 2: Create the production image with Nginx
FROM nginx:alpine

# Copy the built React app from the previous stage
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# ENV REACT_APP_API_URL=http://thecloudshepherd.sreuniversity.org/upload

# The default command to start Nginx (it will run as a background process)
CMD ["nginx", "-g", "daemon off;"]

# docker build -t si3mshady/doggone-frontend:latest .
#  docker push si3mshady/doggone-frontend:latest
# docker run -p 888:80  si3mshady/doggone-frontend:latest 