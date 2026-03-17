# Use Node 24 Alpine for a lightweight image
FROM node:24-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port 3000
EXPOSE 3000

# Start Vite in development mode
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]
