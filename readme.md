# MindMapr: A modern, AI-powered Study Tool. 
- Demo: [Link](https://www.youtube.com/watch?v=SWPsYICRIOQ), please check it out!
- Tech Stack: Node.js, Express, React.js, Firebase (auth), MongoDB (Atlas clusters), React Router Dom, React-Flow-Renderer, and Dagree-trees.
- Blurb: this is a really cool full-stack web app that takes a set of notes from the user and turns it into beautiful visualized notes, which are split up into understandable bites
- ![image](https://github.com/user-attachments/assets/c2abe96f-07ef-40c6-a05c-d0e257456bec)

- Login Functionalities using google (Firebase), backend Authorization, and Authentication.
- if you enjoyed seeing this work, check out some more of my work at [my personal website](https://namanrusia.com/), or my [LinkedIn](https://www.linkedin.com/in/namanrusia/), or email me at naman.rusia14@gmail.com! I am looking for interships and freelance development opportunities, and I would be extremely interested!



## developers, clone!
- if you would like to make this better, please clone this repository, and make .env files in the frontend and backend folders
- copy the .env.template template files into both the .env files, and fill out the values. You will have to create a MongoDB Atlas Cluster to obtain a Mongo URI, and you will need to create an API access key on OpenAI playground.





### MongoDB (what it is and why use it instead of sql or sqllite):

- a document based database
- gets rid of a lot of inefficiencies that come with traditional databses (eg: sql)

# Installed Dependencies:

npm init -y
npm install express mongoose cors dotenv body-parser nodemon framer-motion primereact quill firebase

why?

- express: To set up the server and create routes.
- mongoose: To interact with MongoDB.
- cors: To allow cross-origin requests (important for frontend-backend communication).
- dotenv To load environment variables from a .env file.
- nodemon Automatically restarts the server when files change.
- framer motion for cool visual effects in the /home page

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

# backend setup:

technologies used:

- Node.js
- Express.js
- MongoDB (via mongoose)
- openAI API

# server setup:

- created an Express server in server.js
- Configured middleware:
  - express.json() to parse JSON payloads.
  - cors() to handle cross-origin requests.
- Connected to a MongoDB database using mongoose with the connection string stored in a .env file.

# CRUD operations:

1. api/mindmaps : GET, FETCH all prev mindmaps from the database
2. "api/mindmaps/:id" : GET, fetching a specific mindmap from it's id
3. "api/mindmaps" , POST create and save a new mindmap to MongoDB
4. "/api/mindmaps/:id" : PUT, update an existing mindmap
5. /api/mindmap/:id : DELETE deletes a specific midmap if you have the id

# OpenAI API integration:

- using the GPT-4 model
- built a POST /api/mindmaps/generate route
- API accepts notes in the request body and generates nodes and edges usin the llm model
- ensures that generated data conforms to the expected schema:
  - nodes (with id and label attributes)
  - edges (with source and target attributes)

# Database integration:

- mongoDB schema (defined in MindMap.js)

- example schema:
  {
  "title": "Mind Map Example",
  "nodes": [
  { "id": "1", "label": "Root Node" },
  { "id": "2", "label": "Child Node" }
  ],
  "edges": [
  { "source": "1", "target": "2" }
  ],
  "createdAt": "2025-01-15T22:11:08.226Z"
  }

# Frontend Setup:

- technologies used:
  - React.js
  - React Router dom
  - vite

# Next steps:

- Visualization:
  - figureout a library to use (ideas currently are react-flow-renderer)

# **_PROGRESS_**:

- [x] Containerize Backend [done]
- [ ] make pricing page (just for fun)
- [ ] WORK ON INTEGRATING WITH REACT-FLOW-RENDERER
- [ ] Figure out hosting
- [ ] import font from (google fonts)[fonts.google.com]
- [ ] Theme switching between dark and light mode.
- [ ] Work on a small logo icon
- [ ] Pre built templates? eg project planning, study notes, brainstorming, etc.
- [ ] LOGIN WITH FIREBASE!!!! COMPLETE IMPLEMENTATION
- [ ] Look into Next.js for SEO and if it will be easy to implement (i heard its easy to implement on top of react but idk yet)
- [ ] Make the UI AWESOME!!!!!!! -[ ] Once logged in, introduce progress tracking and badges.
