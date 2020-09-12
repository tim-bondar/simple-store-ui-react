## Project info

This is a simple application with router, authentication (JWT) and semantic UI controls developed only for example.

## How to use

### Start DB image
Run `docker run -p 5432:5432 --name simple-store-db -e POSTGRES_PASSWORD=123asdQ! -d postgres`

### Start API image
- Download API project sources [Simple Store API](https://github.com/tim-bondar/simple-store-api-csharp)
- Run to build `docker build -t simple-store-api .`
- Run to start `docker run -d -p 8080:80 --link simple-store-db:simple-store-db --name simple-store-api simple-store-api`

### Start UI locally
Run `npm start` in the terminal and navigate to [http://localhost:3000](http://localhost:3000)

### Start UI as docker image
- Run to build `docker build -t simple-store-ui .`
- Run to start `docker run -d -p 9080:80 --name simple-store-ui simple-store-ui`
- Navigate [http://localhost:9080](http://localhost:9080)

### Credentials
- Default user: **user:user**
- Default Admin: **admin:admin**

