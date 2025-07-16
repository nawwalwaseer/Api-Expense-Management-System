# Use official Node image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your app
COPY . .

# Expose the port your app runs on
EXPOSE 5000

# Run your app
CMD ["npm", "start"]
