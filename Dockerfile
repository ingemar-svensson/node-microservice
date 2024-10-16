# Use Node.js LTS version
FROM node:16

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app source code
COPY . .

# Generate TypeScript definitions from proto files
RUN npm run generate:proto

# Build the TypeScript code
RUN npm run build

# Expose ports
EXPOSE 8080 50051

# Start the application
CMD ["node", "dist/index.js"]
