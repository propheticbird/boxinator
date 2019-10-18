# Boxinator 

A box delivery service done as a test assignment.

# Build

Build backend app: 

```bash
cd backend
./gradlew clean bootJar
```

Use docker compose to setup the service with one command:

````bash
docker compose build
docker compose up
````

Webapp will be available at the [localhost:8080]() address.

# Test

## Frontend

Navigate to `/frontend` directory:

````bash 
npm test
````

## Backend

Navigate to `/backend` directory:

````bash 
./gradlew test
````


