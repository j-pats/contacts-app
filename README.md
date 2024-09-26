# React Contacts App

## Docker Compose Install Instructions
Copy the following code to a file called `docker-compose.yml`

```
services:
  web:
    image: jessetpats/contacts-app-server
    ports:
      - 5173:5173
  server:
    image: jessetpats/contacts-app-web
    ports:
      - 3000:3000
```
Then run the below command to start the services

`docker-compose up`

Connect to the following to run the app: [http://localhost:5173](http://localhost:5173)

## Docker Compose Build Instructions

`git clone` this repository to a folder of your choosing.

`cd` into contacts-app top level folder, where the included `docker-compose.yml` file is located

Run the command: `docker-compose build` to build the docker services

Run the command `docker-compose up` to run

Connect to the following to run the app: [http://localhost:5173](http://localhost:5173)

