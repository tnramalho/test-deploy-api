#!/bin/bash

# Create a user
echo "Creating a user..."
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe"}'

echo -e "\n\n"

# Get all users
echo "Getting all users..."
curl http://localhost:3000/users 