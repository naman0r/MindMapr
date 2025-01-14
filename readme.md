# mindmapr

APIs to:
Create a new mind map
Fetch all mind maps
Fetch a specific mind map by ID
Update a mind map
Delete a mind map

MongoDB:

- a document based database
- gets rid of a lot of inefficiencies that come with traditional databses (eg: sql)
  s

# file structure:

      mindmapr
      ├── backend
      │   ├── models
      │   │   └── MindMap.js
      │   ├── routes
      │   │   └── mindmapRoutes.js
      │   ├── server.js
      │   └── .env
      └── frontend

# Installed Dependencies:

npm init -y
npm install express mongoose cors dotenv body-parser nodemon

why?

- express: To set up the server and create routes.
- mongoose: To interact with MongoDB.
- cors: To allow cross-origin requests (important for frontend-backend communication).
- dotenv To load environment variables from a .env file.
- nodemon Automatically restarts the server when files change.

# what i've done so far:

1. File Structure Created the backend folder structure.
2. Installed Dependencies Installed Express, Mongoose, CORS, dotenv, etc.
3. MongoDB Setup Connected the backend to a MongoDB Atlas cluster.
4. Created server.js Set up the main server file.
5. Created MindMap.js Defined the Mongoose schema for mind maps.
6. Created Routes Defined GET and POST routes in mindmapRoutes.js.
7. Middleware Added express.json() to parse JSON request bodies.
8. Tested API Endpoints Tested GET and POST requests with Postman.
9. Verified Functionality Confirmed that the API endpoints work.

# CRUD commands using Postman

![alt text](image.png)
