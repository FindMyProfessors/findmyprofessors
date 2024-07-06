# Stage 1: Build Stage
FROM node:20 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

RUN npx prisma generate

# Build the application
RUN npm run build

# Expose port 80
EXPOSE 8080

CMD [ "npm", "run", "start"]
