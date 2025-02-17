# MindMapr backend README file

## _docker details: _

- containerized the backend. to run backend, run:

docker start mindmapr-backend

#### to rebuild after making major changes:

1. docker rm mindmapr-backend
2. docker build -t mindmapr-backend .
3. docker run -p 5001:5001 --env-file .env --name mindmapr-backend mindmapr-backend

this should take care of it. then you can run docker start mindmapr-backend.

## running the backend:

docker start -a mindmapr-backend [attatches to terminal]

npm run dev [you dont always need to run a docker container, the backend runs if you just run npm run dev on your laptop. ]
