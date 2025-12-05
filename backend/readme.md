# Docker Full-Stack Project

This project demonstrates a **full-stack web application** with a Node.js frontend and a Flask backend, fully containerized using Docker and orchestrated using Docker Compose.

## Project Structure

```
docker-fullstack-project/
├── backend/          # Flask backend code + Dockerfile
├── frontend/         # Node.js frontend code + Dockerfile
├── docker-compose.yml
└── README.md
```

## Manual Docker Workflow

1. **Build Backend Image**
   Navigate to the backend folder and build the Docker image:

```bash
cd backend
docker build -t mybackend:v1 .
```

2. **Run Backend Container**
   Run the backend container and map port 5000:

```bash
docker run --name backend1 -p 5000:5000 mybackend:v1
```

Access the backend at `http://localhost:5000/process`.

3. **Create Docker Network** (for container-to-container communication):

```bash
docker network create mynet
```

4. **Run Backend in Custom Network**:

```bash
docker run -d --name backend1 --network mynet -p 5000:5000 mybackend:v1
```

5. **Build Frontend Image**:

```bash
cd ../frontend
docker build -t myfrontend:v1 .
```

6. **Run Frontend Container**:

```bash
docker run -d --name frontend1 --network mynet -p 3000:3000 -e BACKEND_URL=http://backend1:5000/process myfrontend:v1
```

Access the frontend at `http://localhost:3000`.

7. **Update / Rebuild Images**
   After code changes, build new versions:

```bash
docker build -t mybackend:v2 ./backend
docker build -t myfrontend:v2 ./frontend
```

Run new containers:

```bash
docker run -d --name backend2 --network mynet -p 5001:5000 mybackend:v2
docker run -d --name frontend2 --network mynet -p 3001:3000 -e BACKEND_URL=http://backend2:5000/process myfrontend:v2
```

After verifying new containers, remove old ones:

```bash
docker rm -f backend1 frontend1
```

## Useful Docker Commands

* List running containers: `docker ps`
* List all images: `docker images`
* Remove a container: `docker rm -f <container_name>`
* Remove an image: `docker rmi <image_name>`
* Follow container logs: `docker logs -f <container_name>`

## Docker Compose Workflow

Once manual containers work, Docker Compose automates building and running multiple containers:

```bash
docker-compose up --build
```

* Builds images from Dockerfiles
* Starts all containers in a shared network
* Maps ports automatically
* Handles environment variables and service dependencies

## Best Practices

* Always **tag images** (`v1`, `v2`) for version control.
* Use **Docker networks** to enable container-to-container communication.
* Keep old containers until new versions are verified.
* Use **environment variables** to configure URLs between containers.
* Use `docker logs` for debugging.





